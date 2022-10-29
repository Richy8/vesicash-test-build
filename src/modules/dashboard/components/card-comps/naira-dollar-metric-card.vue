<template>
  <div class="naira-dollar-metric-card rounded-12 teal-10-bg border-grey-100">
    <!-- TOP ROW -->
    <div class="top-row mgb-16">
      <!-- WALLET COLUMN SECTION -->
      <template v-for="(wallet, index) in wallet_balance">
        <div class="column" :key="index">
          <!-- TITLE TEXT -->
          <div class="title-text tertiary-3-text grey-700 mgb-12">
            {{ wallet.title }} Balance
          </div>

          <!-- LOADING AMOUNT VALUE -->
          <template v-if="loading_wallet">
            <div
              class="loading-amount-value rounded-3 skeleton-loader mgb-5"
            ></div>
          </template>

          <template v-else>
            <!-- AMOUNT VALUE -->
            <div class="amount-value teal-800 h4-text mgb-4">
              <span v-html="$money.getSign(wallet.sign)"></span>
              {{ $money.addComma(wallet.value.split(".")[0])
              }}<span class="amount-zero"
                >.{{ wallet.value.split(".")[1] || "00" }}</span
              >
            </div>
          </template>

          <!-- TITLE DESCRIPTION -->
          <div class="title-description secondary-3-text grey-700">
            Wallet balance
          </div>
        </div>
      </template>
    </div>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <button
        class="btn btn-tertiary btn-md"
        @click="toggleFundWalletSelectModal"
      >
        <div class="icon-plus mgr-6 f-size-17"></div>
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

    closeFundDetailsAndOpenSuccess(reference_id) {
      this.show_fund_wallet_info_modal = false;
      this.$router.push({
        name: "SuccessfulWalletFund",
        query: { currency: "NGN", reference_id },
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
  padding: toRem(16) toRem(24);
  margin-right: toRem(32);
  width: toRem(450);

  @include breakpoint-down(lg) {
    margin-right: toRem(24);
    padding: toRem(16);
    width: toRem(400);
  }

  @include breakpoint-custom-down(700) {
    width: toRem(350);
  }

  @include breakpoint-down(sm) {
    margin-bottom: toRem(24);
    margin-right: 0;
    width: 100%;
  }

  .top-row {
    @include flex-row-between-nowrap;

    @include breakpoint-down(sm) {
      @include flex-row-between-wrap;
    }

    .column {
      width: 50%;

      @include breakpoint-down(sm) {
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

      &:first-of-type {
        border-right: toRem(1) solid getColor("grey-100");

        @include breakpoint-down(sm) {
          border: 0;
          padding-bottom: toRem(16);
          border-bottom: toRem(1) solid getColor("grey-100");
        }
      }

      &:last-of-type {
        padding-left: toRem(24);

        @include breakpoint-down(lg) {
          padding-left: toRem(16);
        }

        @include breakpoint-down(sm) {
          padding-top: toRem(16);
          padding-left: 0;
        }
      }
    }
  }

  .bottom-row {
    @include flex-row-start-nowrap;

    .btn {
      padding: toRem(8) toRem(16);

      &:first-of-type {
        margin-right: toRem(16);
      }

      @include breakpoint-down(lg) {
        @include get-btn-size("sm");
      }
    }
  }
}
</style>
