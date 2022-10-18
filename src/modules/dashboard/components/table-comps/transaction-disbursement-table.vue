<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-disbursement-tb"
      :table_data="dataset"
      :table_header="table_header"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <TransactionDisbursementTableRow
          :key="index"
          table_name="transaction-disbursement-tb"
          :data="{ data }"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "TransactionDisbursementTable",

  components: {
    TableContainer,
    TransactionDisbursementTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-disbursement-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [1],
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Disbursment name",
        "Paid by/to",
        "User role",
        "Amount paid",
        "Status",
        "Actions",
      ],
    };
  },
};
</script>

<style lang="scss">
.transaction-disbursement-tb {
  &-1 {
    max-width: toRem(210);
  }

  &-2 {
    max-width: toRem(200);
  }

  &-3 {
    max-width: toRem(180);
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