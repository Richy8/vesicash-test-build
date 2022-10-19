<template>
  <div class="dashboard-view">
    <!-- WELCOME MESSAGE -->
    <div class="welcome-message mgb-20 h5-text grey-900">
      Welcome {{ getUser.fullname.split(" ")[0] || "" }}
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
      <router-link
        v-if="false"
        :to="{ name: 'VesicashFundDetails' }"
        class="btn btn-primary btn-lg"
        >Disburse Money</router-link
      >
    </div>

    <!-- DISBURSEMENT SECTION -->
    <template v-if="false">
      <div class="section-title mgb-18 h5-text grey-900">Disbursements</div>

      <!-- DISBURSEMENT TABLE DATA -->
      <div class="disbursement-table-wrapper">
        <DisbursementTable />
      </div>
    </template>

    <!-- TRANSACTION SECTION -->
    <template>
      <div class="section-title mgb-8 h5-text grey-900">Transactions</div>

      <!-- DASHBOARD TRANSACTIONS -->
      <div class="wrapper pdb-30">
        <DashboardTransactions />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    DisbursementTable: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/disbursement-table"
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
          title: "NAIRA",
          value: "0",
          sign: "naira",
        },
        {
          title: "DOLLAR",
          value: "0",
          sign: "dollar",
        },
      ],

      escrow_wallet: [
        {
          title: "DOLLAR",
          value: "0",
          sign: "dollar",
        },
        {
          title: "NAIRA",
          value: "0",
          sign: "naira",
        },
      ],

      loading_wallet: true,
    };
  },

  mounted() {
    this.fetchUserWalletBalance();
  },

  methods: {
    ...mapActions({
      getWalletBalance: "dashboard/getWalletBalance",
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
          // console.log("BALANCE", response);

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

            // ESCROW BALANCE
            let escrow_balance = wallets.find(
              (wallet) => wallet.currency == "ESCROW"
            );

            this.naira_dollar_wallet[0].value = naira_balance.available;
            this.naira_dollar_wallet[1].value = dollar_balance.available;
            this.escrow_wallet[0].value = escrow_balance.available;
            this.escrow_wallet[1].value = escrow_balance.available;

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
  .welcome-message {
    @include breakpoint-down(lg) {
      margin-bottom: toRem(16);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(18.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(18.5);
    }
  }

  .metrics-section {
    @include flex-row-start-wrap;

    .btn {
      padding: toRem(12) toRem(18);
      font-size: toRem(14.75);

      @include breakpoint-custom-down(1220) {
        @include get-btn-size("md");
        padding: toRem(10) toRem(19.5);
        margin-top: toRem(16);
      }

      @include breakpoint-down(sm) {
        padding: toRem(8.5) toRem(19);
        font-size: toRem(13.5);
        margin-top: toRem(16);
      }
    }
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