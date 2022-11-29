<template>
  <div class="dashboard-view">
    <div class="welcome-row">
      <!-- WELCOME MESSAGE -->
      <div class="welcome-message h5-text grey-900">
        Welcome
        <span>{{ displayUserFirstname }}</span>
      </div>
    </div>

    <!-- METRICS SECTION -->
    <div class="metrics-section mgb-40">
      <!-- NAIRA DOLLAR SECTION -->
      <NairaDollarMetricCard
        :wallet_balance="naira_dollar_wallet"
        :loading_wallet="loading_wallet"
        :show_actions="false"
      />

      <!-- DISBURSE MONEY BUTTON -->
      <router-link
        :to="{ name: 'VesicashEchangeSetup' }"
        class="btn btn-primary btn-md"
      >Exchange Money</router-link>
    </div>

    <!-- TRANSACTION SECTION -->
    <template>
      <div class="section-title mgb-18 h5-text grey-900">Exchange transactions</div>

      <!-- EXCHANGE TABLE DATA -->
      <div class="exchange-table-wrapper">
        <ExchangeTable />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "ExchangeDashboard",

  metaInfo: {
    title: "Exchange Dashboard",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    NairaDollarMetricCard: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/naira-dollar-metric-card"
      ),

    ExchangeTable: () =>
      import(
        /* webpackChunkName: "exchange-module" */ "@/modules/exchange/components/table-comps/exchange-table"
      ),
  },

  computed: {
    displayUserFirstname() {
      return this.getUser?.fullname?.split(" ")[0] ?? this.getUser.email;
    },

    successActions() {
      return [
        {
          title: "Transfer money ",
          action: () => {},
        },

        {
          title: "Fund your wallet",
          action: () => {},
        },
      ];
    },
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
        {
          title: "GBP",
          value: "0.00",
          sign: "pound",
        },
      ],

      loading_wallet: true,
    };
  },

  mounted() {
    this.fetchUserWalletBalance();

    // CLEAR OUT TRANSAACTION STORE
    this.RESET_TRANSACTION();
    this.clearAttachedFile();
  },

  methods: {
    ...mapActions({
      getWalletBalance: "dashboard/getWalletBalance",
      clearAttachedFile: "general/clearAttachedFile",
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

            this.naira_dollar_wallet[0].value = naira_balance.available;
            this.naira_dollar_wallet[1].value = dollar_balance.available;

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
  }

  .metrics-section {
    @include flex-row-start-wrap;
    gap: toRem(32);

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

  .section-title {
    @include breakpoint-down(sm) {
      font-size: toRem(18.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(18.5);
    }
  }

  .exchange-table-wrapper {
    margin-bottom: toRem(50);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(40);
    }
  }
}
</style>
