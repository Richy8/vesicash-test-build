<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      :table_name="`users-${type}-tb`"
      :table_data="dataset"
      :table_header="getTableHeader"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <UsersTableRow :key="index" :table_name="`users-${type}-tb`" :data="data" :type="type" />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "UsersTable",

  components: {
    TableContainer,
    UsersTableRow: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/users-table-row"
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
      table_header: [
        "User email address",
        "User phone number",
        "User role",
        "Status",
      ],

      single_header: [
        "User email address",
        "User phone number",
        "User role",
        "Status",
      ],

      multiple_header: [
        "User email address",
        "User phone number",
        "User role",
        "User access",
        "Receives payout",
        "Status",
      ],
    };
  },
};
</script>

<style lang="scss">
.users-single-tb {
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
}

.users-multiple-tb {
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