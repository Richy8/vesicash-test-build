<template>
  <div class="dashboard-transactions">
    <!-- PAGE SWITCHER -->
    <PageSwitcher @swapTable="transaction_table_type = $event" />

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
    TransactionDisbursementTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-disbursement-table"
      ),
    TransactionWalletTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-wallet-table"
      ),
  },

  data: () => ({
    transaction_table_type: "TransactionPaymentTable",
  }),
};
</script>

<style lang="scss" scoped>
</style>