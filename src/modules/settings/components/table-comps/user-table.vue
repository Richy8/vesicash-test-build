<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="user-table"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      @goToPage="getUserWalletTransactions($event)"
      :pagination="pagination"
    >
      <template v-for="(data, index) in table_data">
        <UserTableRow :key="index" table_name="user-table" :data="data" />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";
import UserTableRow from "@/modules/settings/components/table-comps/user-table-row";

export default {
  name: "UserTable",

  components: {
    TableContainer,
    UserTableRow,
  },

  data() {
    return {
      table_header: ["Full name", "Email address", "Password", "Actions"],

      table_data: [
        {
          full_name: "Awo bangalee",
          email: "Awobangalee@gmail.com",
          password: "Bangalee",
        },
        {
          full_name: "Silas Adedoyin",
          email: "Silasadedoy@gmail.com",
          password: "Adedoyin",
        },
        {
          full_name: "Simon Oluwuyi",
          email: "Silasadedoy@gmail.com",
          password: "Password",
        },
      ],

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
        "You do not currently have any user, click the create users button to add users.",
    };
  },

  mounted() {
    // this.getUserWalletTransactions(1);
  },

  methods: {
    ...mapActions({
      fetchWalletTransactions: "dashboard/fetchWalletTransactions",
    }),

    getUserWalletTransactions(page) {
      // USE PREVIOUSLY SAVED DATA FOR THAT PAGE NUMBER (AVOID UNNECESSARY API CALLS)
      if (this.paginatedData[page] && this.paginationPages[page]) {
        this.table_data = this.paginatedData[page];
        this.pagination = this.paginationPages[page];
        this.table_loading = false;
        return;
      }

      const payload = {
        page,
        account_id: this.getAccountId,
      };

      this.table_loading = true;

      this.fetchWalletTransactions(payload)
        .then((response) => {
          if (response.code === 200) {
            // SHOW ALL DATA ROWS OR THREE ROWS BASED ON ROUTE
            this.table_data =
              this.$route?.name === "PaymentsPage"
                ? response?.data?.data
                : response?.data?.data?.slice(0, 3);
            this.table_loading = false;

            //SET PAGINATION DATA
            this.pagination = {
              current_page: response?.data?.current_page,
              per_page: response?.data?.per_page,
              last_page: response?.data?.last_page,
              from: response?.data?.from,
              to: response?.data?.to,
              total: response?.data?.total,
            };

            this.paginationPages[page] = this.pagination;

            this.paginatedData[page] =
              this.$route?.name === "PaymentsPage"
                ? response?.data?.data
                : response?.data?.data?.slice(0, 3);
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
  &-2,
  &-3,
  &-4 {
    max-width: toRem(190);
  }

  .head-data {
    padding: toRem(8) toRem(32) !important;
  }

  .body-data {
    padding: toRem(14) toRem(32) !important;
  }
}
</style>