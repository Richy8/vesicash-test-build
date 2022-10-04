<template>
  <div class="dashboard-transactions">
    <!-- PAGE SWITCHER -->
    <PageSwitcher />

    <!-- DISPLAY AREA FOR PAYMENTS/DISBURSEMENTS/WALLET -->
    <transition name="fade" mode="out-in">
      <component :is="transaction_table_type" />
    </transition>
  </div>
</template>

<script>
import PageSwitcher from "@/shared/components/page-switcher";

export default {
  name: "DashboardTransactions",

  components: {
    PageSwitcher,
    TransactionPaymentTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-payment-table"
      ),
  },

  data: () => ({
    transaction_table_type: "TransactionPaymentTable",
  }),
};
</script>

<style lang="scss" scoped>
</style>