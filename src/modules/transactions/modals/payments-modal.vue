<template>
  <ModalCover
    class="wallet-select-modal"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Make your payment</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb--10">
        <PayTypeCard
          v-for="(data, index) in payment_options"
          :key="index"
          :payment="data"
          @payTypeClicked="handleModalClick(index)"
        />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgb--40"></div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";

export default {
  name: "MakePaymentModal",

  components: {
    ModalCover,
    PayTypeCard: () =>
      import(
        /* webpackChunkName: 'modal-comps-module' */ "@/modules/dashboard/components/modal-comps/pay-type-card"
      ),
  },

  data: () => ({
    payment_options: [
      {
        id: 1,
        icon: "CreditCardIcon",
        title: "Pay with card",
        description: "Supports all Naira denominated debit and credit cards.",
        action_type: "modal",
        action: "SuccessfulPayment",
      },
      {
        id: 2,
        icon: "ArrowRightIcon",
        title: "Pay with wire transfer",
        description: "Make a payment via wire transfer option.",
        action_type: "modal",
        action: "toggleWireTransferModal",
      },
      {
        id: 3,
        icon: "BusinessIcon",
        title: "Pay With flutterwave business account",
        description: "Make a transfer from your flutterwave business account.",
        action_type: "modal",
        action: "toggleFWBizModal",
      },
    ],
  }),

  methods: {
    handleModalClick(index) {
      if (index === 1) this.toggleWireTransferModal();
      if (index === 2) this.toggleFWBizModal();
      this.$emit("initiateCardPayment");
    },

    toggleWireTransferModal() {
      this.$emit("initiateWireTransfer");
    },

    toggleFWBizModal() {
      this.$emit("initiateFWBizPayment");
    },
  },
};
</script>

