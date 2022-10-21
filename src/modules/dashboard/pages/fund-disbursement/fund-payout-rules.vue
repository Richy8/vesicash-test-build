<template>
  <div class="fund-payout-rules">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Add payout rules
    </div>

    <div class="instruction-wrapper col-xl-8 mgb-12">
      <!-- INSTRUCTION TEXT -->
      <div class="instruction-text grey-900 primary-2-text mgr-5">
        Provide details for the Payout
      </div>

      <button class="btn btn-secondary btn-md">
        <div class="icon icon-plus"></div>
        <div class="text">Add new milestone</div>
      </button>
    </div>

    <!-- PAYOUT CARDS -->
    <div class="wrapper row">
      <div class="col-xl-8">
        <PayoutCard />
      </div>
    </div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      How May Any Dispute Be Handled?
    </div>

    <div class="wrapper row mgb-32">
      <div class="col-xl-8">
        <div class="row">
          <div class="col-12 col-sm-6 dispute-wrapper">
            <RadioSelectCard
              card_name="dispute"
              label_id="disputeCard1"
              label_text="Handled by the platform"
              tooltip_text=" Information to be passed to the audience"
            />
          </div>

          <div class="col-12 col-sm-6 dispute-wrapper">
            <RadioSelectCard
              card_name="dispute"
              label_id="disputeCard2"
              label_text="Arbitration"
              tooltip_text=" Information to be passed to the audience"
            />
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

    RadioSelectCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/radio-select-card"
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

  .instruction-wrapper {
    @include flex-row-between-wrap;

    .btn {
      padding: toRem(8) toRem(24) toRem(8) toRem(18);

      @include breakpoint-down(xs) {
        margin-top: toRem(10);
      }

      .icon {
        font-size: toRem(14.25);
        margin-right: toRem(4);
      }
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
