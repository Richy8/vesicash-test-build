<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-wallet-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      :show_paging="showPagination"
      @goToPage="getUserWalletTransactions($event)"
      :pagination="pagination"
    >
      <template v-for="(data, index) in table_data">
        <TransactionWalletWithdrawalTableRow
          :key="index"
          table_name="transaction-wallet-tb"
          :data="data"
        />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "TransactionWalletWithdrawalTable",

  components: {
    TableContainer,
    TransactionWalletWithdrawalTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-wallet-withdrawal-table-row"
      ),
  },

  computed: {
    showPagination() {
      return this.$route?.name === "PaymentsPage" ? true : false;
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Transaction reference",
        "Recipient id",
        "Wallet used",
        "Amount paid",
        "Status",
        "Actions",
      ],

      table_data: [],
      table_loading: true,
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
        "You have not done any wallet withdrawals transaction. Click the 'withdraw' button to get started",
    };
  },

  mounted() {
    this.getUserWalletTransactions(1);
  },

  methods: {
    ...mapActions({
      fetchWalletTransactions: "dashboard/fetchWalletWithdrawals",
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

  //   &-6 {
  //   }

  //   &-7 {
  //   }

  .head-data {
    padding: toRem(8) toRem(24) !important;
  }

  .body-data {
    padding: toRem(16) toRem(24) !important;
  }
}
</style>