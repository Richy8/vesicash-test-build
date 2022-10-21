<template>
  <div class="fund-payment">
    <div class="row">
      <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
        <!-- PAYMENT TITLE -->
        <div class="payment-title mgb-32">
          You are making payment for
          <span>“Web app landing pages”.</span>
        </div>

        <!-- PAYMENT DESCRIPTION -->
        <div class="payment-description mgb-32">
          Your payment will be held in Escrow and you can monitor the status on
          your dashboard.
        </div>

        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-40">
          <SumTotalDisplayCard
            total_text="Total amount to pay"
            total_value="$35,500"
          />
        </div>
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="togglePaymentModal">
        Make Payment
      </button>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_payment_modal">
        <MakePaymentModal
          @closeTriggered="togglePaymentModal"
          @initiateWireTransfer="closePaymentOpenWire"
        />
      </transition>

      <transition name="fade" v-if="show_wire_transfer_modal">
        <WireTransferModal @closeTriggered="toggleWireTransferModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "FundPayment",

  components: {
    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/sum-total-display-card"
      ),

    MakePaymentModal: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/modals/make-payment-modal"
      ),

    WireTransferModal: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/modals/wire-transfer-modal"
      ),
  },

  data: () => ({
    show_payment_modal: false,
    show_wire_transfer_modal: false,
  }),

  methods: {
    togglePaymentModal() {
      this.show_payment_modal = !this.show_payment_modal;
    },

    toggleWireTransferModal() {
      this.show_wire_transfer_modal = !this.show_wire_transfer_modal;
    },

    closePaymentOpenWire() {
      this.show_payment_modal = false;
      this.toggleWireTransferModal();
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
