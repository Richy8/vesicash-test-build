<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="users-tb"
      :table_data="dataset"
      :table_header="table_header"
      :is_loading="false"
    >
      <template v-for="(data, index) in dataset">
        <UsersTableRow :key="index" table_name="users-tb" :data="{ data }" />
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
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/users-table-row"
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
        "User email address",
        "User phone number",
        "User role",
        "Status",
      ],
    };
  },
};
</script>

<style lang="scss">
.users-tb {
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
</style>