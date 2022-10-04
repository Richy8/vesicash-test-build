<template>
  <div class="fund-payout-rules">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Add payout rules
    </div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      Add payout rules for your users
    </div>

    <!-- PAYOUT CARDS -->
    <div class="wrapper row">
      <div class="col-xl-8">
        <PayoutCard />
      </div>
    </div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      Add payout rules for your users
    </div>

    <div class="wrapper row mgb-32">
      <div class="col-xl-8">
        <div class="row">
          <div class="col-12 col-sm-6 dispute-wrapper">
            <DisputeCard label_id="disputeCard1" />
          </div>

          <div class="col-12 col-sm-6 dispute-wrapper">
            <DisputeCard label_id="disputeCard2" />
          </div>
        </div>
      </div>
    </div>

    <!-- SUMMATION TOTAL -->
    <div class="wrapper mgb-40">
      <div class="col-xl-8">
        <SummationCard />
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="nextProgressFlow">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FundPayoutRules",

  components: {
    PayoutCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/payout-card"
      ),

    DisputeCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/dispute-card"
      ),

    SummationCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/summation-card"
      ),
  },

  methods: {
    nextProgressFlow() {
      this.$router.push({ name: "VesicashConfirmPayoutRules" });
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-payout-rules {
  .disbursement-title {
    @include breakpoint-down(xl) {
      @include generate-font-type("h5");
    }
  }

  .dispute-wrapper {
    @include breakpoint-down(sm) {
      &:first-of-type {
        margin-bottom: toRem(20);
      }
    }
  }

  .action-row {
    padding-bottom: toRem(55);

    .btn {
      padding: toRem(9) toRem(24);
      width: toRem(260);

      @include breakpoint-down(xs) {
        width: 100%;
      }
    }
  }
}
</style>