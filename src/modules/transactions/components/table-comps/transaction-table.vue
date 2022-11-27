<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="getEmptyMessage"
      :empty_action_name="getEmptyActionName"
      :show_paging="showPagination"
      :pagination="pagination"
      @goToPage="getUserTransactions($event)"
      @emptyAction="initiateEscrowTransaction"
    >
      <template v-for="(data, index) in table_data">
        <TransactionTableRow
          :key="index"
          table_name="transaction-tb"
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
  name: "TransactionTable",

  components: {
    TableContainer,
    TransactionTableRow: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/transaction-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    showPagination() {
      return this.$route?.name === "AllTransactions" ? true : false;
    },

    getEmptyMessage() {
      return this.$route?.name === "AllTransactions"
        ? "You have not created any transactions yet. Click the button below to get started"
        : "You have not created any transactions yet. Click the 'create escrow' button to get started";
    },

    getEmptyActionName() {
      return this.$route?.name === "AllTransactions" ? "Create escrow" : "";
    },
  },

  data() {
    return {
      table_header: [
        "Transaction name",
        "Transacting parties",
        "Payment due date",
        "Amount to be paid",
        "Status",
        "Actions",
      ],

      table_data: [],
      table_loading: true,
      paginatedData: {},
      paginationPages: {},
      pagination: {
        current_page: 1,
        per_page: 10,
        last_page: 3,
        from: 1,
        to: 20,
        total: 50,
      },
      empty_message:
        "You have not created any transactions yet. Click the button below to get started",
    };
  },

  mounted() {
    this.getUserTransactions(1);
  },

  methods: {
    ...mapActions({
      fetchTransactionsByUser: "transactions/fetchTransactionsByUser",
    }),

    initiateEscrowTransaction() {
      this.$router.push({ name: "TransactionSetup" });
    },

    // ====================================
    // FETCH ALL USER TRANSACTIONS
    // ====================================
    getUserTransactions(page) {
      // USE PREVIOUSLY SAVED DATA FOR THAT PAGE NUMBER (AVOID UNNECESSARY API CALLS)
      if (this.paginatedData[page] && this.paginationPages[page]) {
        this.table_data = this.paginatedData[page];
        this.pagination = this.paginationPages[page];
        this.table_loading = false;
        return;
      }

      const payload = {
        payload: { account_id: this.getAccountId },
        page,
        limit: this.$route?.name === "AllTransactions" ? 20 : 3,
      };

      this.table_loading = true;

      this.fetchTransactionsByUser(payload)
        .then((response) => {
          if (response.code === 200) {
            this.table_data = response.data;
            this.table_loading = false;

            this.saveTransactionDataAndPagination(
              response.data,
              response.pagination,
              page
            );
          }

          // HANDLE NON 200 RESPONSE
          else this.handleErrorResponse();
        })
        .catch(() => this.handleErrorResponse());
    },

    saveTransactionDataAndPagination(data, pagination, page) {
      //SET PAGINATION DATA
      const from = pagination?.limit * (pagination?.currentPage - 1) + 1;

      this.pagination = {
        current_page: pagination?.currentPage,
        per_page: pagination?.limit,
        last_page: pagination?.totalPages,
        from,
        to: from + (data?.length - 1),
        total: pagination?.total_records,
      };

      this.paginationPages[page] = this.pagination;

      this.paginatedData[page] = data;
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
.transaction-tb {
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
    min-width: toRem(120);
  }

  &-5 {
    min-width: toRem(100);
  }

  &-6 {
  }
}
</style>
