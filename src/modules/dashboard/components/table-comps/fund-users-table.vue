<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="fund-users-tb"
      :table_data="dataset"
      :table_header="getTableHeader"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <FundUsersTableRow
          :key="index"
          table_name="fund-users-tb"
          :data="{ data }"
          :type="type"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "FundUsersTable",

  components: {
    TableContainer,
    FundUsersTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/fund-users-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [1, 2, 3],
    },

    type: {
      type: String,
      default: "single",
    },
  },

  computed: {
    getTableHeader() {
      return this.type === "single" ? this.single_header : this.multiple_header;
    },
  },

  data() {
    return {
      single_header: [
        "User email address",
        "User phone number",
        "User role",
        "Actions",
      ],

      multiple_header: [
        "User email address",
        "User phone number",
        "User role",
        "User access",
        "Actions",
      ],
    };
  },
};
</script>

<style lang="scss">
.fund-users-tb {
  &-1 {
    min-width: toRem(190);
  }

  &-2 {
    min-width: toRem(190);
  }

  &-3 {
    min-width: toRem(190);
  }

  &-4 {
    min-width: toRem(190);
  }

  &-5 {
    min-width: toRem(190);
  }
}
</style>