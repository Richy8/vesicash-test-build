<template>
  <div class="fund-payment">
    <div class="row">
      <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
        <!-- PAYMENT TITLE -->
        <div class="payment-title mgb-32">
          You are making payment for
          <span>“{{ getTransactionSetup.name }}”.</span>
        </div>

        <!-- PAYMENT DESCRIPTION -->
        <div class="payment-description mgb-32">
          Your payment will be held in Escrow and you can monitor the status on
          your dashboard
        </div>

        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-40">
          <SumTotalDisplayCard
            total_text="Total amount to pay"
            :total_value="`${getCurrencySign} ${$money.addComma(
              getTransactionAmount.total_fee
            )}`"
          />
        </div>
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button ref="pay" class="btn btn-primary btn-md" @click="togglePaymentModal">Make Payment</button>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_payment_modal">
        <PaymentsModal
          :paymentDetails="getTransactionAmount"
          @closeTriggered="togglePaymentModal"
          @initiateWireTransfer="closePaymentOpenWire"
          @initiateFWBizPayment="closePaymentOpenFWBiz"
          @initiateCardPayment="initiateCardPayment"
        />
      </transition>

      <transition name="fade" v-if="show_wire_transfer_modal">
        <WireTransferModal
          :paymentDetails="getTransactionAmount"
          @closeTriggered="toggleWireTransferModal"
          @goBackPaymentSelection="closeWTPaymentOpenPayment"
          @paid="closeWireAndOpenSuccess"
        />
      </transition>

      <transition name="fade" v-if="show_naira_transfer_modal">
        <WalletDetailsModal
          @closeTriggered="toggleNairaTransferModal"
          @goBackWalletSelection="closeNairaPaymentOpenPayment"
          @walletFunded="closeFundDetailsAndOpenSuccess"
        />
      </transition>

      <transition name="fade" v-if="show_fw_biz_modal">
        <FWBizModal
          @closeTriggered="toggleFWBizModal"
          @goBackPaymentSelection="closeFWBizOpenPayment"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { VESICASH_APP_URL } from "@/utilities/constant";

export default {
  name: "FundPayment",

  components: {
    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/sum-total-display-card"
      ),

    PaymentsModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/payments-modal"
      ),

    WireTransferModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/wt-payment-modal"
      ),

    WalletDetailsModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/dashboard/modals/wallet-modals/wallet-details-modal"
      ),

    FWBizModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/fw-business-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getTransactionSetup: "transactions/getTransactionSetup",
      getTransactionAmount: "transactions/getTransactionAmount",
    }),

    getCurrencySign() {
      return this.$money.getSign(this.getTransactionAmount.currency.slug);
    },

    getCurrency() {
      const currency = this.getTransactionAmount.currency.slug;
      if (currency === "naira") return "NGN";
      if (currency === "dollar") return "USD";
      if (currency === "pound") return "GBP";
      return "NGN";
    },

    getCardPaymentDetails() {
      return {
        currency: this.getCurrency,
        transaction_id: this.$route.query.transaction_id,
        payment_gateway: "rave",
        success_page: `${VESICASH_APP_URL}/transaction/payment-successful?type=${this.$route.query.type}&party=${this.$route.query.party}&transaction_id=${this.$route.query.transaction_id}&name=${this.$route.query.name}&parties=${this.$route.query.parties}&fee=${this.getCurrency}${this.$route.query.fee}`,
      };
    },
  },

  data: () => ({
    show_payment_modal: false,
    show_wire_transfer_modal: false,
    show_naira_transfer_modal: false,
    show_fw_biz_modal: false,
    VESICASH_APP_URL: "https://sandbox.vesicash.com",
  }),

  methods: {
    ...mapActions({ startCardPayment: "transactions/startCardPayment" }),

    togglePaymentModal() {
      this.show_payment_modal = !this.show_payment_modal;
    },

    toggleWireTransferModal() {
      this.show_wire_transfer_modal = !this.show_wire_transfer_modal;
    },

    toggleNairaTransferModal() {
      this.show_naira_transfer_modal = !this.show_naira_transfer_modal;
    },

    toggleFWBizModal() {
      this.show_fw_biz_modal = !this.show_fw_biz_modal;
    },

    closePaymentOpenWire(currency) {
      this.show_payment_modal = false;
      currency === "naira"
        ? this.toggleNairaTransferModal()
        : this.toggleWireTransferModal();
    },

    closePaymentOpenFWBiz() {
      this.show_payment_modal = false;
      this.toggleFWBizModal();
    },

    closeFWBizOpenPayment() {
      this.toggleFWBizModal();
      this.togglePaymentModal();
    },

    closeNairaPaymentOpenPayment() {
      this.toggleNairaTransferModal();
      this.togglePaymentModal();
    },

    closeWTPaymentOpenPayment() {
      this.toggleWireTransferModal();
      this.togglePaymentModal();
    },

    closeFundDetailsAndOpenSuccess(reference_id) {
      this.show_fund_wallet_info_modal = false;
      this.$router.push({
        name: "SuccessfulWalletFund",
        query: { currency: "NGN", reference_id },
      });
    },

    closeWireAndOpenSuccess() {
      this.show_wire_transfer_modal = false;

      this.$router.push({
        name: "SuccessfulWalletFund",
        query: { currency: "NGN" },
      });
    },

    async initiateCardPayment() {
      this.togglePaymentModal();
      this.handleClick("pay", "Initiating card payment...");
      this.togglePageLoader("Initiating card payment");

      try {
        const response = await this.startCardPayment(
          this.getCardPaymentDetails
        );

        this.togglePageLoader("");

        console.log("RESPONSE STARTING CARD PAYMENT", response);
        if (response?.code === 200) location.href = response?.data?.link;
        else
          this.pushToast(
            response?.message || "Failed to initiate card payment",
            "error"
          );

        this.handleClick("pay", "Make Payment", false);
      } catch (err) {
        console.log("ERROR STARTING CARD PAYMENT", err);

        this.handleClick("pay", "Make Payment", false);

        this.pushToast("Failed to initiate card payment", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-payment {
  .payment-title,
  .payment-description {
    @include generate-font-type("h7");
    @include font-height(18.5, 30);

    @include breakpoint-down(md) {
      @include font-height(17.5, 28);
    }

    @include breakpoint-down(sm) {
      @include font-height(15.25, 28);
    }

    span {
      font-weight: 700;
    }
  }

  .action-row {
    padding-bottom: toRem(55);

    .btn {
      padding: toRem(9.5) toRem(24);
      width: toRem(260);

      @include breakpoint-down(xs) {
        width: 100%;
      }
    }
  }
}
</style>
