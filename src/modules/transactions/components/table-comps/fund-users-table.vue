<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      :table_name="`fund-users-${type}-tb`"
      :table_data="dataset"
      :table_header="getTableHeader"
      :is_loading="loading"
      :empty_message="empty_message"
    >
      <template v-for="(data, index) in dataset">
        <FundUsersTableRow
          :key="index"
          :table_name="`fund-users-${type}-tb`"
          :data="data"
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
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/fund-users-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: true,
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
        "Receives payout",
        "Actions",
      ],

      empty_message: "You have not invited any user to this transaction",
    };
  },
};
</script>

<style lang="scss">
.fund-users-single-tb {
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

.fund-users-multiple-tb {
  &-1 {
    min-width: toRem(140);
  }

  &-2 {
    min-width: toRem(140);
  }

  &-3 {
    min-width: toRem(140);
  }

  &-4 {
    min-width: toRem(140);
  }

  &-5 {
    min-width: toRem(140);
  }

  &-6 {
    min-width: toRem(140);
  }
}
</style>