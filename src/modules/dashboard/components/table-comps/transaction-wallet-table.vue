<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-wallet-tb"
      :table_data="dataset"
      :table_header="table_header"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <TransactionWalletTableRow
          :key="index"
          table_name="transaction-wallet-tb"
          :data="{ data }"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "TransactionWalletTable",

  components: {
    TableContainer,
    TransactionWalletTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-wallet-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [1, 2, 3],
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Transaction reference",
        "Account name",
        "Wallet used",
        "Amount paid",
        "Status",
        "Actions",
      ],
    };
  },
};
</script>

<style lang="scss">
.transaction-wallet-tb {
  &-1 {
    max-width: toRem(210);
  }

  &-2 {
    @include text-truncate();
    max-width: toRem(160);
  }

  &-3 {
    max-width: toRem(210);
  }

  &-4 {
    max-width: toRem(140);
  }

  &-5 {
    max-width: toRem(140);
  }

  &-6 {
  }

  &-7 {
  }

  .head-data {
    padding: toRem(8) toRem(24) !important;
  }

  .body-data {
    padding: toRem(16) toRem(24) !important;
  }
}
</style>