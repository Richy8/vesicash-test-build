import { mapActions, mapGetters } from "vuex";
import { VESICASH_APP_URL } from "@/utilities/constant";
import { CURRENCY_CODE } from "@/modules/transactions/constants";

const paymentHelper = {
  components: {
    PaymentsModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/payments-modal"
      ),

    WalletTransferModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/dashboard/modals/wallet-modals/wallet-transfer-modal"
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
        let { title, recipients, members, totalAmount } = this.getTransaction;

        const seller = members.find((item) => item.role === "seller");

        let invited_party =
          JSON.parse(recipients).length > 1 ? "All" : seller?.email;

        return `${VESICASH_APP_URL}/transaction/payment-successful?type=${type}&party=${party}&transaction_id=${transaction_id}&name=${title}&parties=${invited_party}&fee=${
          this.getCurrency
        }${this.transfer_amount || totalAmount}&redirect=${location.href}`;
      }

      // PAYMENT PAGE SUCCESS PAGE SETUP
      else {
        let { transaction_id, name, parties, fee } = this.$route.query;

        return `${VESICASH_APP_URL}/transaction/payment-successful?type=${type}&party=${party}&transaction_id=${transaction_id}&name=${name}&parties=${parties}&fee=${
          this.getCurrency
        }${this.transfer_amount || fee}`;
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
        amount:
          this.transfer_amount ||
          this.$route?.query?.fee ||
          this.getTransaction.totalAmount,
        final_amount:
          this.transfer_amount ||
          this.$route?.query?.fee ||
          this.getTransaction.totalAmount,
        sender_currency: this.getCurrency,
        recipient_currency: `ESCROW_${this.getCurrency}`,
        transaction_id:
          this.$route?.query?.transaction_id ?? this.$route?.params?.id,
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
      show_wallet_transfer_modal: false,

      transfer_amount: "",
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

    toggleWalletTransferModal() {
      this.transfer_amount = "";
      this.togglePaymentOptionModal();
      this.show_wallet_transfer_modal = !this.show_wallet_transfer_modal;
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
      this.show_failed_wallet_transfer = false;
      this.show_payment_option_modal = true;
      // this.togglePaymentOptionModal();
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
      if (this.$route.name === "TransactionDetails")
        this.show_payment_modal = false;
      this.showPageLoader("Initiating card payment");

      try {
        const response = await this.startCardPayment(
          this.getCardPaymentDetails
        );

        this.hidePageLoader();

        if (response?.code === 200) location.href = response?.data?.link;
        else
          this.pushToast(
            response?.message || "Failed to initiate card payment",
            "error"
          );

        // this.handleClick("pay", "Make Payment", false);
      } catch (err) {
        this.hidePageLoader();

        console.log("ERROR STARTING CARD PAYMENT", err);

        // this.handleClick("pay", "Make Payment", false);

        this.pushToast("Failed to initiate card payment", "error");
      }
    },

    async initiateWalletTransfer() {
      try {
        this.show_payment_option_modal = false;

        this.showPageLoader("Processing transfer to escrow wallet");

        const response = await this.walletToWalletTransfer(
          this.getWalletTransferDetails
        );

        this.hidePageLoader();

        if (response.code === 200) {
          location.href = this.getSuccessPageRoute;
        } else {
          this.transfer_amount = "";
          this.message = response?.message?.includes("Insufficient")
            ? "You do not have enough funds in your wallet to pay for this transaction."
            : response.message;
          this.show_failed_wallet_transfer = true;
        }
      } catch (err) {
        this.transfer_amount = "";
        this.show_failed_wallet_transfer = true;
        this.message = "Failed to transfer money";
        console.log("FAILED TO TRANSFER MONEY", err);
        this.hidePageLoader();
      }
    },

    transferFromWallet(amount) {
      this.show_payment_option_modal = false;
      this.show_wallet_transfer_modal = false;
      this.transfer_amount = amount;
      if (this.$route.name === "TransactionDetails")
        this.show_payment_modal = false;
      this.initiateWalletTransfer();
    },
  },
};

export default paymentHelper;
