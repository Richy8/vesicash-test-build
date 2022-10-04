<template>
  <div class="fund-details">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Add disbursement details
    </div>

    <!-- TRANSACTION NAME -->
    <div class="row mgb-10">
      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
        <div class="form-group">
          <div class="form-label" for="transactionName">Transaction name</div>
          <input
            type="text"
            id="transactionName"
            class="form-control"
            placeholder="Enter your transaction name"
          />
        </div>
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div class="disbursement-type-title grey-900 primary-1-text mgb-10">
      Select disbursment type
    </div>

    <!-- DISBURSEMENT TYPE SELECTIONS -->
    <div class="disbursement-type-selections row">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in disbursement_types"
        :key="index"
      >
        <FundDisburseTypeCard :details="fund" :index="index" />
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div class="disbursement-type-title grey-900 primary-1-text mgb-10">
      How many people are transacting
    </div>

    <!-- TRANSACTING PARTY SELECTIONS -->
    <div class="disbursement-type-selections row">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in transacting_types"
        :key="index"
      >
        <FundDisburseTypeCard :key="index" :details="fund" :index="index" />
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
  name: "FundDetails",

  components: {
    FundDisburseTypeCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/fund-disburse-type-card"
      ),
  },

  data: () => ({
    disbursement_types: [
      {
        title: "One off disbursement type",
        description:
          "Suitable for people that want to do one off payment to people ",
        selected: true,
      },
      {
        title: "Milestone disbursment type",
        description:
          "Suitable for people that want to disburse in milestones until their    money is complete",
        selected: false,
      },
    ],

    transacting_types: [
      {
        title: "Two parties",
        description:
          "Suitable for transaction between buyer and seller only to make transactions possible ",
        selected: true,
      },
      {
        title: "Multiple parties",
        description:
          "Suitable for people that want to have several middle mans in their trabsaction for transparency sakes",
        selected: false,
      },
    ],
  }),

  methods: {
    nextProgressFlow() {
      this.$router.push({ name: "VesicashBeneficiaries" });
    },
  },
};
</script>

<style lang="scss" scoped>
.disbursement-title {
  @include breakpoint-down(xl) {
    @include generate-font-type("h5");
  }
}

.disbursement-type-selections {
  @include flex-row-start-wrap;
  align-items: flex-start;

  .col-4 {
    margin-right: toRem(20);

    @include breakpoint-down(lg) {
      margin-right: 0;
    }

    @include breakpoint-down(md) {
      margin-right: 0;
    }

    &:last-of-type {
      margin-right: 0;
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
</style>