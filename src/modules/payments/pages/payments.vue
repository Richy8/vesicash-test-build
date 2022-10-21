<template>
  <div class="transactions-page">
    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">Payments</div>

    <!-- DASHBOARD TRANSACTIONS -->
    <div class="wrapper pdb-30">
      <DashboardTransactions />
    </div>
  </div>
</template>

<script>
export default {
  name: "Transactions",

  components: {
    DashboardTransactions: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/dashboard-transactions"
      ),
  },
};
</script>

<style lang="scss" scoped></style>
