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

    FailedWalletTransferModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/failed-wallet-transfer-modal"
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

    getWalletTransferDetails() {
      return {
        sender_account_id: this.getAccountId,
        recipient_account_id: this.getAccountId,
        amount: this.$route?.query?.fee || this.getTransaction.totalAmount,
        sender_currency: this.getCurrency,
        recipient_currency: `ESCROW_${this.getCurrency}`,
      };
    },
  },

  data() {
    return {
      show_payment_option_modal: false,
      show_wire_transfer_modal: false,
      show_naira_transfer_modal: false,
      show_fw_biz_modal: false,
      show_failed_wallet_transfer: false,
      message: "",
    };
  },

  methods: {
    ...mapActions({
      startCardPayment: "transactions/startCardPayment",
      walletToWalletTransfer: "transactions/walletToWalletTransfer",
    }),

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

    toggleWalletTransfer() {
      this.show_failed_wallet_transfer = !this.show_failed_wallet_transfer;
    },

    closeWalletTransferOpenPayment() {
      this.toggleWalletTransfer();
      this.togglePaymentOptionModal();
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

    async initiateWalletTransfer() {
      try {
        this.togglePaymentOptionModal();

        this.togglePageLoader("Processing transfer to escrow wallet");

        const response = await this.walletToWalletTransfer(
          this.getWalletTransferDetails
        );
        this.togglePageLoader("");

        // console.log("TRANSFER RESPONSE", response);
        if (response.code === 200) {
          this.pushToast(
            response.message || "Payment was successful",
            "success"
          );

          setTimeout(() => {
            this.$router.push({ name: "VesicashDashboard" });
          }, 2000);
        } else {
          this.message = response.message.includes("insufficient")
            ? "You do not have enough funds in your wallet to pay for this transaction."
            : response.message;
          this.show_failed_wallet_transfer = true;
        }
      } catch (err) {
        this.show_failed_wallet_transfer = true;
        this.message = "Failed to transfer money";
        console.log("FAILED TO TRANSFER MONEY", err);
        this.togglePageLoader("");
      }
    },
  },
};

export default paymentHelper;
