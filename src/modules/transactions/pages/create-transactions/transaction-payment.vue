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
      <button
        ref="pay"
        class="btn btn-primary btn-md"
        @click="togglePaymentOptionModal"
      >Make Payment</button>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_payment_option_modal">
        <PaymentsModal
          :paymentDetails="getTransactionAmount"
          @closeTriggered="togglePaymentOptionModal"
          @initiateWireTransfer="closePaymentOpenWire"
          @initiateFWBizPayment="closePaymentOpenFWBiz"
          @initiateCardPayment="initiateCardPayment"
          @initiateWalletTransfer="toggleWalletTransferModal"
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

      <transition name="fade" v-if="show_failed_wallet_transfer">
        <FailedWalletTransferModal
          @closeTriggered="toggleWalletTransfer"
          @goBackPaymentSelection="closeWalletTransferOpenPayment"
          :message="message"
        />
      </transition>

      <transition name="fade" v-if="show_wallet_transfer_modal">
        <WalletTransferModal
          @closeTriggered="toggleWalletTransferModal"
          @goBackOptionSelection="toggleWalletTransferModal"
          @transfer="transferFromWallet"
          :currency="getCurrency"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import paymentHelper from "@/modules/transactions/mixins/payment-mixins";

export default {
  name: "TrasactionPayment",

  mixins: [paymentHelper],

  metaInfo: {
    title: "Transaction Payment",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/sum-total-display-card"
      ),
  },

  computed: {
    ...mapGetters({
      getTransactionSetup: "transactions/getTransactionSetup",
      getTransactionAmount: "transactions/getTransactionAmount",
    }),
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
