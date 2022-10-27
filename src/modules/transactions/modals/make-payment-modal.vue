<template>
  <ModalCover @closeModal="$emit('closeTriggered')">
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Make your payments</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <PayTypeCard
          v-for="(data, index) in payment_options"
          :key="index"
          :payment="data"
          @payTypeClicked="toggleWireTransferModal"
        />
      </div>
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
        action_type: "route",
        action: "SuccessfulPayment",
      },
      {
        id: 2,
        icon: "ArrowRightIcon",
        title: "Pay with bank transfer",
        description: "Make a transfer to the designated account",
        action_type: "modal",
        action: "toggleWireTransferModal",
      },
      {
        id: 3,
        icon: "BusinessIcon",
        title: "Pay With Flutterwave Business Account",
        description: "Make a transfer from your Flutterwave Business Account.",
        action_type: "route",
        action: "SuccessfulPayment",
      },
    ],
  }),

  methods: {
    toggleWireTransferModal() {
      this.$emit("initiateWireTransfer");
    },
  },
};
</script>

<style></style>
