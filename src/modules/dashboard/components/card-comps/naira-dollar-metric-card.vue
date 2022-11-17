<template>
  <div class="naira-dollar-metric-card rounded-12 teal-900-bg">
    <!-- TOP ROW -->
    <div class="top-row mgb-16">
      <!-- WALLET COLUMN SECTION -->
      <template v-for="(wallet, index) in wallet_balance">
        <div class="column" :key="index">
          <!-- TITLE TEXT -->
          <div class="title-text tertiary-3-text teal-100 mgb-10">
            {{ wallet.title }}
          </div>

          <!-- LOADING AMOUNT VALUE -->
          <template v-if="loading_wallet">
            <div
              class="loading-amount-value rounded-3 skeleton-loader mgb-5"
            ></div>
          </template>

          <template v-else>
            <!-- AMOUNT VALUE -->
            <div
              class="amount-value secondary-1-text mgb-4"
              :class="[
                wallet.sign === 'naira' && 'text-white',
                wallet.sign === 'dollar' && 'green-400',
              ]"
            >
              <span
                >{{ $money.getSign(wallet.sign)
                }}{{ $money.addComma(wallet.value.split(".")[0]) }}</span
              >
              <span class="amount-zero"
                >.{{ wallet.value.split(".")[1] || "00" }}</span
              >
            </div>
          </template>

          <!-- TITLE DESCRIPTION -->
          <div class="title-description secondary-3-text text-white mgt-5">
            Wallet balance
          </div>
        </div>
      </template>

      <div class="column">
        <!-- TITLE TEXT -->
        <div class="title-text tertiary-3-text teal-100 mgb-10">GBP</div>

        <!-- LOADING AMOUNT VALUE -->
        <template v-if="loading_wallet">
          <div
            class="loading-amount-value rounded-3 skeleton-loader mgb-5"
          ></div>
        </template>

        <template v-else>
          <!-- AMOUNT VALUE -->
          <div class="amount-value teal-500 secondary-1-text mgb-4">
            <span>£0</span>
            <span class="amount-zero">.00</span>
          </div>
        </template>

        <!-- TITLE DESCRIPTION -->
        <div class="title-description secondary-3-text text-white mgt-5">
          Wallet balance
        </div>
      </div>
    </div>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <button
        class="btn btn-tertiary btn-md"
        @click="toggleFundWalletSelectModal"
      >
        <div class="icon-plus mgr-6 teal-700 f-size-17"></div>
        Fund Wallet
      </button>

      <button class="btn btn-tertiary btn-md" @click="toggleWalletModal">
        <div class="mgr-8 position-relative" style="top: -1px">
          <MoneyIcon />
        </div>
        Withdraw
      </button>
      <!-- closeWalletOpenAccount will be replaced with toggleWalletModal when dollar withdrawal is ready -->
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_fund_wallet_select_modal">
        <FundWalletSelectModal
          @closeTriggered="toggleFundWalletSelectModal"
          @walletSelected="closeWalletOpenWalletDetails"
        />
      </transition>

      <transition name="fade" v-if="show_fund_wallet_info_modal">
        <FundWalletDetailsModal
          :wallet_type="default_wallet"
          @closeTriggered="toggleFundWalletDetailsModal"
          @goBackWalletSelection="closeWalletDetailsOpenWalletSelect"
          @walletFunded="closeFundDetailsAndOpenSuccess"
        />
      </transition>

      <transition name="fade" v-if="show_wallet_modal">
        <WithdrawSelectModal
          @closeTriggered="toggleWalletModal"
          @walletSelected="closeWalletOpenAccount"
        />
      </transition>

      <transition name="fade" v-if="show_wallet_account_modal">
        <WithdrawAccountModal
          @closeTriggered="toggleWalletAccountModal"
          @goBackWalletSelection="closeAccountOpenWallet"
          @accountSelected="closeAccountOpenConfirm"
        />
      </transition>

      <transition name="fade" v-if="show_wallet_confirm_modal">
        <WithdrawConfirmModal
          @closeTriggered="toggleWalletConfirmModal"
          @goBackAccountSelection="closeConfimWithdrawOpenAccount"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import MoneyIcon from "@/shared/components/icon-comps/money-icon";

export default {
  name: "NairaDollarMetricCard",

  components: {
    MoneyIcon,
    FundWalletSelectModal: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/modals/wallet-modals/wallet-select-modal"
      ),

    FundWalletDetailsModal: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/modals/wallet-modals/wallet-details-modal"
      ),

    WithdrawSelectModal: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/modals/withdraw-modals/withdraw-select-modal"
      ),

    WithdrawAccountModal: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/modals/withdraw-modals/withdraw-account-modal"
      ),

    WithdrawConfirmModal: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/modals/withdraw-modals/withdraw-confirm-modal"
      ),
  },

  props: {
    wallet_balance: {
      type: Array,
      default: () => [],
    },

    loading_wallet: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    show_wallet_modal: false,
    show_wallet_account_modal: false,
    show_wallet_confirm_modal: false,

    show_fund_wallet_select_modal: false,
    show_fund_wallet_info_modal: false,

    default_wallet: "naira",
  }),

  methods: {
    toggleWalletModal() {
      this.show_wallet_modal = !this.show_wallet_modal;
    },

    toggleWalletAccountModal() {
      this.show_wallet_account_modal = !this.show_wallet_account_modal;
    },

    toggleWalletConfirmModal() {
      this.show_wallet_confirm_modal = !this.show_wallet_confirm_modal;
    },

    toggleFundWalletSelectModal() {
      this.show_fund_wallet_select_modal = !this.show_fund_wallet_select_modal;
    },

    toggleFundWalletDetailsModal() {
      this.show_fund_wallet_info_modal = !this.show_fund_wallet_info_modal;
    },

    closeWalletOpenWalletDetails($event) {
      this.default_wallet = $event;
      this.show_fund_wallet_select_modal = false;
      this.toggleFundWalletDetailsModal();
    },

    closeWalletDetailsOpenWalletSelect() {
      this.show_fund_wallet_info_modal = false;
      this.toggleFundWalletSelectModal();
    },

    closeFundDetailsAndOpenSuccess() {
      this.show_fund_wallet_info_modal = false;
      this.$router.push({
        name: "SuccessfulWalletFund",
        query: { currency: "NGN" },
      });
    },

    closeWalletOpenAccount() {
      this.show_wallet_modal = false;
      this.toggleWalletAccountModal();
    },

    closeAccountOpenWallet() {
      this.show_wallet_account_modal = false;
      // this will be un-commented when dollar withdrawal works
      this.toggleWalletModal();
    },

    closeConfimWithdrawOpenAccount() {
      this.show_wallet_confirm_modal = false;
      this.toggleWalletAccountModal();
    },

    closeAccountOpenConfirm() {
      this.show_wallet_account_modal = false;
      this.toggleWalletConfirmModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.naira-dollar-metric-card {
  padding: toRem(24) toRem(24) toRem(16);
  width: toRem(595);

  @include breakpoint-custom-down(530) {
    padding: toRem(16) toRem(20);
    width: 100%;
  }

  .top-row {
    @include flex-row-start-nowrap;

    @include breakpoint-custom-down(530) {
      @include flex-row-start-wrap;
    }

    .column {
      width: 33.3%;

      @include breakpoint-custom-down(530) {
        width: 100%;
      }

      .title-text {
        @include breakpoint-down(xs) {
          font-size: toRem(11.75);
        }
      }

      .amount-value {
        font-size: toRem(23.5);

        @include breakpoint-down(lg) {
          @include generate-font-type("primary-1");
          font-size: toRem(18.5);
        }

        @include breakpoint-custom-down(700) {
          font-size: toRem(16);
        }

        .amount-zero {
          font-size: toRem(18);

          @include breakpoint-custom-down(700) {
            font-size: toRem(16);
          }
        }
      }

      .loading-amount-value {
        @include draw-shape(120, 32);
      }

      border-right: toRem(1) solid getColor("grey-100");
      padding: 0 toRem(24);

      @include breakpoint-custom-down(530) {
        border: 0;
        padding: toRem(16) 0;
        border-bottom: toRem(1) solid getColor("grey-100");
      }

      &:first-of-type {
        padding-left: 0;

        @include breakpoint-custom-down(530) {
          padding-top: 0;
        }
      }

      &:last-of-type {
        border-right: none;
        border-bottom: none;
      }
    }
  }

  .bottom-row {
    @include flex-row-start-wrap;
    gap: toRem(24);

    .btn {
      border: toRem(1) solid getColor("teal-100") !important;
      padding: toRem(8) toRem(16);
      color: getColor("teal-700") !important;
      background: getColor("teal-100") !important;

      @include breakpoint-custom-down(530) {
        width: 100%;
      }

      svg {
        @include draw-shape(17);
      }

      @include breakpoint-down(lg) {
        @include get-btn-size("sm");
      }
    }
  }
}
</style>
