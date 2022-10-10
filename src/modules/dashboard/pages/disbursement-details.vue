<template>
  <div class="dashboard-disbursement-view">
    <!-- BACK BUTTON -->
    <PageBackBtn />

    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">
      Payment for web app landing page
    </div>

    <!-- FUND DETAILS SECTION -->
    <template name="fund-details-section">
      <div class="fund-details-section row">
        <!-- DISBURSEMENT DETAILS -->
        <div class="col-12 col-xl-6">
          <FundInfoCard
            card_title="Disbursement details"
            :card_items="[
              {
                title: 'Disbursement Type',
                value: 'One-off disbursement type',
              },
              { title: 'Transacting Parties', value: 'Two parties' },
            ]"
          />
        </div>

        <!-- DISPUTE HANDLING -->
        <div class="col-12 col-xl-5">
          <FundInfoCard
            card_title="Dispute handling"
            :card_items="[
              { title: 'Dispute Type', value: 'Vesicash handles dispute' },
              {
                title: 'Dispute Policy Doc',
                value: 'Two parties',
                file: { name: 'PolicyFile.doc' },
              },
            ]"
          />
        </div>
      </div>
    </template>

    <!-- USERS INVOLVED SECTION -->
    <template name="users-involved-section">
      <div class="section-wrapper">
        <div class="section-title">Users Involved</div>

        <!-- USERS INVOLVED TABLE -->
        <UsersTable />
      </div>
    </template>

    <!-- PAYMENT RULES SECTION -->
    <template name="payment-rules-section">
      <div class="section-wrapper">
        <div class="section-title">Payment Rules</div>

        <!-- PAYMENT RULES CARD -->
        <template>
          <PaymentRuleCard />
        </template>
      </div>
    </template>

    <!-- TRANSACTIONS SECTION -->
    <template name="transactions-section">
      <div class="section-wrapper">
        <div class="section-title">Transactions</div>

        <!-- TRANSACTIONS TABLE -->
        <DashboardTransactions />
      </div>
    </template>

    <!-- ACTIVITY SECTION -->
    <template name="activity-section">
      <div class="section-wrapper">
        <div class="section-title">Activity</div>

        <div class="activity-wrapper wt-50">
          <ActivityCard />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "DashboardDisbursement",

  metaInfo: {
    title: "Disbursement Details",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    PageBackBtn,
    FundInfoCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/fund-info-card"
      ),
    PaymentRuleCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/payment-rule-card"
      ),
    ActivityCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/activity-card"
      ),
    UsersTable: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/users-table"
      ),
    DashboardTransactions: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/dashboard-transactions"
      ),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-disbursement-view {
  .page-title {
    font-size: toRem(22.5);

    @include breakpoint-down(md) {
      font-size: toRem(20.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(19);
    }
  }

  .fund-details-section {
    @include flex-row-start-wrap;
  }

  .section-wrapper {
    margin-bottom: toRem(34);

    .section-title {
      @include generate-font-type("primary-1");
      color: getColor("grey-900");
      margin-bottom: toRem(8);
    }
  }

  .activity-wrapper {
    @include breakpoint-down(xl) {
      width: 65%;
    }

    @include breakpoint-down(lg) {
      padding-bottom: toRem(40);
      width: 75%;
    }

    @include breakpoint-down(sm) {
      width: 100%;
    }
  }
}
</style>  