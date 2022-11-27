import { mapActions, mapGetters } from "vuex";
import { VESICASH_APP_URL } from "@/utilities/constant";
import { CURRENCY_CODE } from "@/modules/transactions/constants";

const paymentHelper = {
  components: {
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
      getTransactionAmount: "transactions/getTransactionAmount",
    }),

    getCurrencySign() {
      return this.$money.getSign(
        this.getTransactionAmount?.currency?.slug ??
          this.getTransaction?.currency ??
          "NGN"
      );
    },

    getCurrency() {
      const currency =
        this.getTransactionAmount?.currency?.slug ??
        this.getTransaction?.currency ??
        "naira";

      return CURRENCY_CODE[currency];
    },

    getSuccessPageRoute() {
      let { type, party } = this.$route?.query;

      // TRANSACTION DETAILS PAGE SUCCESS PAGE SETUP
      if (this.$route.name === "TransactionDetails") {
        let transaction_id = this.$route.params?.id;
        let { title, parties, totalAmount } = this.getTransaction;

        let invited_party = parties.length > 2 ? "All" : parties?.at(-1).email;

        return `${VESICASH_APP_URL}/transaction/payment-successful?type=${type}&party=${party}&transaction_id=${transaction_id}&name=${title}&parties=${invited_party}&fee=${this.getCurrency}${totalAmount}`;
      }

      // PAYMENT PAGE SUCCESS PAGE SETUP
      else {
        let { transaction_id, name, parties, fee } = this.$route.query;

        return `${VESICASH_APP_URL}/transaction/payment-successful?type=${type}&party=${party}&transaction_id=${transaction_id}&name=${name}&parties=${parties}&fee=${this.getCurrency}${fee}`;
      }
    },

    getCardPaymentDetails() {
      return {
        currency: this.getCurrency,
        transaction_id:
          this.$route?.query?.transaction_id ?? this.$route?.params?.id,
        payment_gateway: "rave",
        success_page: this.getSuccessPageRoute,
      };
    },
  },

  data() {
    return {
      show_payment_option_modal: false,
      show_wire_transfer_modal: false,
      show_naira_transfer_modal: false,
      show_fw_biz_modal: false,
    };
  },

  methods: {
    ...mapActions({ startCardPayment: "transactions/startCardPayment" }),

    togglePaymentOptionModal() {
      this.show_payment_option_modal = !this.show_payment_option_modal;
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
      this.show_payment_option_modal = false;
      currency === "naira"
        ? this.toggleNairaTransferModal()
        : this.toggleWireTransferModal();
    },

    closePaymentOpenFWBiz() {
      this.show_payment_option_modal = false;
      this.toggleFWBizModal();
    },

    closeFWBizOpenPayment() {
      this.toggleFWBizModal();
      this.togglePaymentOptionModal();
    },

    closeNairaPaymentOpenPayment() {
      this.toggleNairaTransferModal();
      this.togglePaymentOptionModal();
    },

    closeWTPaymentOpenPayment() {
      this.toggleWireTransferModal();
      this.togglePaymentOptionModal();
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
      this.togglePaymentOptionModal();
      // this.handleClick("pay", "Initiating card payment...");
      this.togglePageLoader("Initiating card payment");

      try {
        const response = await this.startCardPayment(
          this.getCardPaymentDetails
        );

        this.togglePageLoader();

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

        // this.handleClick("pay", "Make Payment", false);

        this.pushToast("Failed to initiate card payment", "error");
      }
    },
  },
};

export default paymentHelper;
