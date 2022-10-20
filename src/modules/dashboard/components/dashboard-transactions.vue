<template>
  <div class="dashboard-transactions">
    <!-- PAGE SWITCHER -->
    <PageSwitcher
      :page_data="pages"
      @swapTable="transaction_table_type = $event"
    />

    <!-- DISPLAY AREA FOR PAYMENTS/DISBURSEMENTS/WALLET -->
    <transition name="fade" mode="out-in">
      <component
        :is="transaction_table_type"
        @showTransactionModal="toggleTransactionSummaryModal"
      />
    </transition>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_transaction_summary_modal">
        <TransactionSummaryModal
          @closeTriggered="toggleTransactionSummaryModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import PageSwitcher from "@/shared/components/page-switcher";

export default {
  name: "DashboardTransactions",

  components: {
    PageSwitcher,
    TransactionPaymentTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-payment-table"
      ),

    TransactionDisbursementTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-disbursement-table"
      ),

    TransactionWalletTable: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/components/table-comps/transaction-wallet-table"
      ),

    TransactionSummaryModal: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/modals/transaction-summary-modal"
      ),
  },

  data: () => ({
    pages: [
      // {
      //   title: "Payments",
      //   table: "TransactionPaymentTable",
      //   active: false,
      // },
      // {
      //   title: "Disbursements",
      //   table: "TransactionDisbursementTable",
      //   active: false,
      // },
      {
        title: "Wallets",
        table: "TransactionWalletTable",
        active: true,
      },
    ],

    transaction_table_type: "TransactionWalletTable",
    show_transaction_summary_modal: false,
  }),

  created() {
    this.$bus.$on("showTransactionSummary", () =>
      this.toggleTransactionSummaryModal()
    );
  },

  methods: {
    toggleTransactionSummaryModal() {
      this.show_transaction_summary_modal =
        !this.show_transaction_summary_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>