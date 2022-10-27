<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
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
      empty_message:
        "You have not created any Transactions yet. Click the 'Create Transaction' Button to get started",
    };
  },

  mounted() {
    this.getUserTransactions();
  },

  methods: {
    ...mapActions({
      fetchTransactionsByUser: "transactions/fetchTransactionsByUser",
    }),

    // ====================================
    // FETCH ALL USER TRANSACTIONS
    // ====================================
    getUserTransactions() {
      this.fetchTransactionsByUser({ account_id: this.getAccountId })
        .then((response) => {
          console.log(response);

          if (response.code === 200) {
            this.table_data = response.data;
            this.table_loading = false;
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
    min-width: toRem(150);
  }

  &-5 {
    min-width: toRem(150);
  }

  &-6 {
  }
}
</style>
