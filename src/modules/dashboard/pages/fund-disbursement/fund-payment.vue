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
          Your payment will be added to your escrow acccount on the dashboard
          until the order is fulfiled by the parties and the transaction is paid
        </div>

        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-40">
          <SumTotalDisplayCard />
        </div>
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md">Make Payment</button>
    </div>
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
      @include font-height(16.25, 28);
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