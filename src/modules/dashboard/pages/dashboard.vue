<template>
  <div class="dashboard-view">
    <!-- WELCOME MESSAGE -->
    <div class="welcome-message mgb-20 h5-text grey-900">Welcome Olabisi</div>

    <!-- METRICS SECTION -->
    <div class="metrics-section mgb-40">
      <!-- NAIRA DOLLAR SECTION -->
      <NairaDollarMetricCard />

      <!-- ESCROW SECTION -->
      <EscrowMetricCard />

      <!-- DISBURSE MONEY BUTTON -->
      <router-link
        :to="{ name: 'VesicashFundDetails' }"
        class="btn btn-primary btn-lg"
        >Disburse Money</router-link
      >
    </div>

    <!-- DISBURSEMENT SECTION -->
    <template>
      <div class="section-title mgb-18 h5-text grey-900">Disbursements</div>

      <!-- DISBURSEMENT TABLE DATA -->
      <div class="disbursement-table-wrapper">
        <DisbursementTable />
      </div>
    </template>

    <!-- TRANSACTION SECTION -->
    <template>
      <div class="section-title mgb-8 h5-text grey-900">Transactions</div>

      <!-- DASHBOARD TRANSACTIONS -->
      <div class="wrapper pdb-30">
        <DashboardTransactions />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  metaInfo: {
    title: "Dashboard",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    NairaDollarMetricCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/naira-dollar-metric-card"
      ),
    EscrowMetricCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/escrow-metric-card"
      ),
    DisbursementTable: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/disbursement-table"
      ),
    DashboardTransactions: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/dashboard-transactions"
      ),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-view {
  .welcome-message {
    @include breakpoint-down(lg) {
      margin-bottom: toRem(16);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(18.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(18.5);
    }
  }

  .metrics-section {
    @include flex-row-start-wrap;

    .btn {
      padding: toRem(13) toRem(18);
      font-size: toRem(14.75);

      @include breakpoint-custom-down(1220) {
        @include get-btn-size("md");
        padding: toRem(10) toRem(19.5);
        margin-top: toRem(16);
      }

      @include breakpoint-down(sm) {
        padding: toRem(8.5) toRem(19);
        font-size: toRem(13.5);
        margin-top: toRem(16);
      }
    }
  }

  .section-title {
    @include breakpoint-down(sm) {
      font-size: toRem(18.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(18.5);
    }
  }

  .disbursement-table-wrapper {
    margin-bottom: toRem(50);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(40);
    }
  }
}
</style>  