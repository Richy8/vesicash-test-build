<template>
  <div class="disbursement-page">
    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">Transactions</div>

    <!-- DISBURSEMENT TABLE DATA -->
    <div class="disbursement-table-wrapper">
      <TransactionTable />
    </div>
  </div>
</template>

<script>
export default {
  name: "Transactions",

  components: {
    TransactionTable: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/transaction-table"
      ),
  },
};
</script>

<style lang="scss" scoped></style>
