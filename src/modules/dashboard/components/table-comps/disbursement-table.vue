<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="disbursement-tb"
      :table_data="dataset"
      :table_header="table_header"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <DisbursementTableRow
          :key="index"
          table_name="disbursement-tb"
          :data="{ data }"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "DisbursementTable",

  components: {
    TableContainer,
    DisbursementTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/disbursement-table-row"
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
        "Disbursment name",
        "Transacting parties",
        "Payment due date",
        "Amount to be paid",
        "Status",
        "Actions",
      ],
    };
  },
};
</script>

<style lang="scss">
.disbursement-tb {
  &-1 {
    min-width: toRem(200);
    max-width: toRem(205);
  }

  &-2 {
    min-width: toRem(150);
  }

  &-3 {
    min-width: toRem(150);
    vertical-align: top;
  }

  &-4 {
    min-width: toRem(150);
  }

  &-5 {
    min-width: toRem(150);
  }

  &-6 {
  }
}
</style>