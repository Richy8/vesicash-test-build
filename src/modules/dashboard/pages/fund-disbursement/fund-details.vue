<template>
  <div class="fund-details">
    <div class="disbursement-title h4-text grey-900 mgb-32">Add Payment Details</div>

    <!-- TRANSACTION NAME -->
    <div class="row mgb-10">
      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
        <div class="form-group">
          <div class="form-label" for="transactionName">Payment name</div>
          <input
            type="text"
            id="transactionName"
            class="form-control"
            placeholder="Please give this payment a name"
          />
        </div>
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div
      class="disbursement-type-title grey-900 primary-1-text mgb-10"
    >How will this payment be disbursed?</div>

    <!-- DISBURSEMENT TYPE SELECTIONS -->
    <div class="disbursement-type-selections row mgb-12">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in disbursement_types"
        :key="index"
      >
        <FundDisburseTypeCard
          :details="fund"
          :index="index"
          @updateSelection="updateUserSelection"
        />
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div
      class="disbursement-type-title grey-900 primary-1-text mgb-10"
    >How many people are transacting?</div>

    <!-- TRANSACTING PARTY SELECTIONS -->
    <div class="disbursement-type-selections row mgb-8">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in transacting_types"
        :key="index"
      >
        <FundDisburseTypeCard
          :key="index"
          :details="fund"
          :index="index"
          @updateSelection="updateUserSelection"
        />
      </div>
    </div>

    <!-- DISPUTE POLICY -->
    <div
      class="disbursement-type-title grey-900 primary-1-text mgb-10"
    >Attach a contract or document (Optional)</div>

    <div class="col-12 col-lg-10 col-xl-8 mgb-40">
      <ContractUploadCard />
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="nextProgressFlow">Continue</button>
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
    ContractUploadCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/contract-upload-card"
      ),
  },

  data: () => ({
    disbursement_types: [
      {
        title: "One off disbursement",
        description: "Your payment will be released in a single disbursement.",
        type: "disbursement",
        selected: false,
      },
      {
        title: "In Milestones",
        description:
          "Your payment will be released in multiple disbursements according to the agreed milestones.",
        type: "disbursement",
        selected: false,
      },
    ],

    transacting_types: [
      {
        title: "Two parties",
        description: "A transaction involving just two parties/entities.",
        type: "transactions",
        selected: false,
      },
      {
        title: "Multiple parties",
        description:
          "Provides involvement for a minimum of 3 parties. Set commissions and levels of control and access.",
        type: "transactions",
        selected: false,
      },
    ],
  }),

  methods: {
    nextProgressFlow() {
      this.$router.push({ name: "VesicashBeneficiaries" });
    },

    updateUserSelection(data) {
      if (data.type === "disbursement") {
        this.disbursement_types.map((item) => (item.selected = false));
        this.disbursement_types[data.index].selected = true;
      } else {
        this.transacting_types.map((item) => (item.selected = false));
        this.transacting_types[data.index].selected = true;
      }
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

.disbursement-type-title {
  @include breakpoint-down(xs) {
    font-size: toRem(15.75);
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
