<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-wallet-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
    >
      <template v-for="(data, index) in table_data">
        <TransactionWalletTableRow
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
  name: "TransactionWalletTable",

  components: {
    TableContainer,
    TransactionWalletTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-wallet-table-row"
      ),
  },

  data() {
    return {
      table_header: [
        "Date",
        "Transaction reference",
        "Account id",
        "Wallet used",
        "Amount paid",
        "Status",
        "Actions",
      ],

      table_data: [],
      table_loading: true,
      empty_message:
        "You have not done any wallet transaction. You can fund your wallet to get started",
    };
  },

  mounted() {
    this.getUserWalletTransactions();
  },

  methods: {
    ...mapActions({
      fetchWalletTransactions: "dashboard/fetchWalletTransactions",
    }),

    // ====================================
    // FETCH ALL USER WALLET TRANSACTIONS
    // ====================================
    getUserWalletTransactions() {
      this.fetchWalletTransactions(this.getAccountId)
        .then((response) => {
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

  &-6 {
  }

  &-7 {
  }

  .head-data {
    padding: toRem(8) toRem(24) !important;
  }

  .body-data {
    padding: toRem(16) toRem(24) !important;
  }
}
</style>