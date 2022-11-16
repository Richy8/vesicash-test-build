<template>
  <div class="dashboard-view">
    <div class="welcome-row">
      <!-- WELCOME MESSAGE -->
      <div class="welcome-message h5-text grey-900">
        Welcome
        <span class="text-capitalize">
          {{ getUser.fullname.split(" ")[0] || "" }}
        </span>
      </div>

      <!-- DISBURSE MONEY BUTTON -->
      <router-link
        :to="{ name: 'TransactionSetup' }"
        class="btn btn-primary btn-md"
        >Create Escrow</router-link
      >
    </div>

    <!-- METRICS SECTION -->
    <div class="metrics-section mgb-40">
      <!-- NAIRA DOLLAR SECTION -->
      <NairaDollarMetricCard
        :wallet_balance="naira_dollar_wallet"
        :loading_wallet="loading_wallet"
      />

      <!-- ESCROW SECTION -->
      <EscrowMetricCard
        :escrow_balance="escrow_wallet"
        :loading_wallet="loading_wallet"
      />

      <!-- DISBURSE MONEY BUTTON -->
      <!-- <router-link :to="{ name: 'TransactionSetup' }" class="btn btn-primary btn-md">Create Escrow</router-link> -->
    </div>

    <!-- TRANSACTION SECTION -->
    <template>
      <div class="section-title mgb-18 h5-text grey-900">Transactions</div>

      <!-- TRANSACTION TABLE DATA -->
      <div class="disbursement-table-wrapper">
        <TransactionTable />
      </div>
    </template>

    <!-- TRANSACTION SECTION -->
    <template>
      <div class="section-title mgb-8 h5-text grey-900">Payments</div>

      <!-- DASHBOARD TRANSACTIONS -->
      <div class="wrapper pdb-30">
        <DashboardTransactions />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Dashboard",

  metaInfo: {
    title: "Dashboard",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    NairaDollarMetricCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/naira-dollar-metric-card"
      ),
    EscrowMetricCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/escrow-metric-card"
      ),
    TransactionTable: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/transaction-table"
      ),
    DashboardTransactions: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/dashboard-transactions"
      ),
  },

  data() {
    return {
      naira_dollar_wallet: [
        {
          title: "NGN",
          value: "0.00",
          sign: "naira",
        },
        {
          title: "USD",
          value: "0.00",
          sign: "dollar",
        },
      ],

      escrow_wallet: [
        {
          title: "DOLLAR",
          value: "0.00",
          sign: "dollar",
        },
        {
          title: "NAIRA",
          value: "0.00",
          sign: "naira",
        },
      ],

      loading_wallet: true,
    };
  },

  mounted() {
    this.fetchUserWalletBalance();

    // CLEAR OUT TRANSAACTION STORE
    this.RESET_TRANSACTION();
  },

  methods: {
    ...mapActions({
      getWalletBalance: "dashboard/getWalletBalance",
    }),
    ...mapMutations({
      RESET_TRANSACTION: "transactions/RESET_TRANSACTION",
    }),

    // =============================================
    // FETCH ALL WALLET BALANCE OF CURRENT USER
    // =============================================
    fetchUserWalletBalance() {
      let request_payload = {
        account_id: this.getAccountId,
      };

      this.getWalletBalance(request_payload)
        .then((response) => {
          if (response.code === 200) {
            let { wallets } = response?.data;
            // DOLLAR BALANCE
            let dollar_balance = wallets.find(
              (wallet) => wallet.currency == "USD"
            );

            // NAIRA BALANCE
            let naira_balance = wallets.find(
              (wallet) => wallet.currency == "NGN"
            );

            // ESCROW NAIRA BALANCE
            let escrow_naira_balance = wallets.find(
              (wallet) => wallet.currency == "ESCROW_NGN"
            );

            // ESCROW DOLLAR BALANCE
            let escrow_dollar_balance = wallets.find(
              (wallet) => wallet.currency == "ESCROW_USD"
            );

            this.naira_dollar_wallet[0].value = naira_balance.available;
            this.naira_dollar_wallet[1].value = dollar_balance.available;
            this.escrow_wallet[0].value = escrow_naira_balance.available;
            this.escrow_wallet[1].value = escrow_dollar_balance.available;

            this.loading_wallet = false;
          } else {
            this.loading_wallet = false;
          }
        })
        .catch(() => (this.loading_wallet = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-view {
  .welcome-row {
    @include flex-row-between-wrap;
    gap: toRem(24);

    margin-bottom: toRem(24);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(16);
    }

    .welcome-message {
      @include breakpoint-down(sm) {
        font-size: toRem(18.75);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(18.5);
      }
    }

    .btn {
      padding: toRem(10) toRem(19.5);
      font-size: toRem(14.5);

      @include breakpoint-custom-down(1220) {
        @include get-btn-size("md");
        margin-top: toRem(16);
      }

      @include breakpoint-down(sm) {
        padding: toRem(8.5) toRem(19);
        font-size: toRem(13.5);
        margin-top: toRem(16);
      }
    }
  }

  .metrics-section {
    @include flex-row-start-wrap;
    align-items: stretch;
    gap: toRem(32);
  }

  .section-title {
    @include breakpoint-down(sm) {
      font-size: toRem(18.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(18.5);
    }
  }

  .disbursement-table-wrapper {
    margin-bottom: toRem(50);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(40);
    }
  }
}
</style>
