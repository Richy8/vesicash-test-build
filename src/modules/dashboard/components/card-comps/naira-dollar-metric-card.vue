<template>
  <div class="naira-dollar-metric-card rounded-12 teal-10-bg border-grey-100">
    <!-- TOP ROW -->
    <div class="top-row mgb-16">
      <!-- WALLET COLUMN SECTION -->
      <template v-for="(wallet, index) in wallets">
        <div class="column" :key="index">
          <!-- TITLE TEXT -->
          <div class="title-text tertiary-3-text grey-700 mgb-12">
            {{ wallet.title }} SIDE
          </div>

          <!-- AMOUNT VALUE -->
          <div class="amount-value teal-800 h4-text mgb-4">
            <span v-html="$money.getSign(wallet.sign)"></span>{{ wallet.value
            }}<span class="amount-zero">.00</span>
          </div>

          <!-- TITLE DESCRIPTION -->
          <div class="title-description secondary-3-text grey-700">
            Wallet balance
          </div>
        </div>
      </template>
    </div>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <button class="btn btn-secondary btn-md">Withdraw money</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NairaDollarMetricCard",

  data: () => ({
    wallets: [
      {
        title: "NAIRA",
        value: "6,400,000",
        sign: "naira",
      },
      {
        title: "DOLLAR",
        value: "100,240",
        sign: "dollar",
      },
    ],
  }),
};
</script>

<style  lang="scss" scoped>
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
    .btn {
      padding: toRem(8) toRem(16);

      @include breakpoint-down(lg) {
        @include get-btn-size("sm");
      }
    }
  }
}
</style>