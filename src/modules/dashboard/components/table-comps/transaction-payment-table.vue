<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-payment-tb"
      :table_data="dataset"
      :table_header="table_header"
      :is_loading="false"
      empty_message="No payment transaction to display from your account"
    >
      <template v-for="(data, index) in dataset">
        <TransactionPaymentTableRow
          :key="index"
          table_name="transaction-payment-tb"
          :data="{ data }"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "TransactionPaymentTable",

  components: {
    TableContainer,
    TransactionPaymentTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-payment-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Disbursment name",
        "Payment method",
        "Amount to be paid",
        "Status",
        "Actions",
      ],
    };
  },
};
</script>

<style lang="scss">
.transaction-payment-tb {
  &-1 {
  }

  &-2 {
    max-width: toRem(205);
  }

  &-3 {
  }

  &-4 {
  }

  &-5 {
  }

  &-6 {
  }
}
</style>