<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="user-table"
      :table_data="getPaginatedUser"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      empty_action_name="Add new user"
      @emptyAction="$emit('emptyAction')"
      @goToPage="page=$event"
      :pagination="getPagination"
      show_paging
    >
      <template v-for="(user, index) in getPaginatedUser">
        <UserTableRow :key="user.account_id+index" table_name="user-table" :data="user" />
      </template>

      <template slot="emptyIconSlot">
        <UserIcon big />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";
import UserTableRow from "@/modules/settings/components/table-comps/user-table-row";
import UserIcon from "@/shared/components/icon-comps/user-icon";

export default {
  name: "ConnectedUserTable",

  components: {
    TableContainer,
    UserTableRow,
    UserIcon,
  },

  computed: {
    ...mapGetters({ getConnectedUsers: "settings/getConnectedUsers" }),

    getPaginatedUser() {
      const { per_page } = this;
      const index = this.page - 1;
      const start_range = per_page * index;
      const end_range = start_range + per_page;
      const users = [...this.getConnectedUsers];
      return users.slice(start_range, end_range);
    },

    getPagination() {
      const users = [...this.getConnectedUsers];
      const { per_page } = this;
      const current_page = this.page;

      const index = this.page - 1;
      const from = per_page * index;
      const to = Math.min(from + per_page, users.length);

      return {
        current_page,
        per_page,
        last_page: Math.ceil(users.length / per_page),
        from: from + 1,
        to,
        total: users.length,
      };
    },
  },

  data() {
    return {
      table_header: ["Full name", "Email address", "Actions"],

      page: 1,
      per_page: 15,

      table_data: [],

      table_loading: false,
      pagination: {
        current_page: 1,
        per_page: 10,
        last_page: 3,
        from: 1,
        to: 20,
        total: 50,
      },
      paginatedData: {},
      paginationPages: {},
      empty_message:
        "You currently don't have any user, click the add new user button to add users.",
    };
  },

  mounted() {
    this.fetchUsers(1);
  },

  watch: {
    table_loading: {
      handler(loading) {
        this.$emit("updateLoading", loading);
      },
    },
  },

  methods: {
    ...mapActions({
      fetchConnectedUsers: "settings/fetchConnectedUsers",
    }),

    fetchUsers(page) {
      this.table_loading = true;
      this.page = page;

      // USE PREVIOUSLY SAVED DATA (AVOID UNNECESSARY API CALLS)
      if (this.getConnectedUsers.length) {
        this.table_loading = false;
        return;
      }

      const payload = {
        page,
        business_id: this.getBusinessId,
      };

      this.fetchConnectedUsers(payload)
        .then((response) => {
          if (response.code === 200) {
            this.table_data = response?.data;
            this.table_loading = false;

            // this.paginationPages[page] = this.pagination;
          }

          // HANDLE NON 200 RESPONSE
          else this.handleErrorResponse();
        })
        .catch(() => this.handleErrorResponse());
    },

    // ==========================
    // HANDLE ERROR RESPONSE
    // ==========================
    handleErrorResponse() {
      this.table_loading = false;
      this.table_data = [];
    },
  },
};
</script>

<style lang="scss">
.user-table {
  &-1,
  &-3,
  &-4 {
    max-width: toRem(190);
  }

  &-2 {
    max-width: toRem(220);
  }

  .head-data {
    padding: toRem(8) toRem(32) !important;
  }

  .body-data {
    padding: toRem(14) toRem(32) !important;
  }
}
</style>