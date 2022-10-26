<template>
  <div class="escrow-metric-card rounded-12 border-green-100 green-10-bg">
    <!-- TITLE TEXT -->
    <div class="title-text tertiary-3-text grey-700 mgb-12">In Escrow</div>

    <!-- AMOUNT VALUE IN DOLLARS -->
    <template v-if="loading_wallet">
      <div class="loading-amount-value rounded-3 skeleton-loader mgb-16"></div>
    </template>

    <template v-else>
      <div class="amount-value mgb-8 border-bottom-grey-100">
        <span v-html="$money.getSign('dollar')"></span>
        {{ $money.addComma(getEscrowDollar.split(".")[0])
        }}
        <span
          class="amount-zero"
        >.{{ getEscrowDollar.split(".")[1] || "00" }}</span>
      </div>
    </template>

    <!-- AMOUNT VALUE IN NAIRA -->
    <template v-if="loading_wallet">
      <div class="loading-amount-value rounded-3 skeleton-loader mgb-12"></div>
    </template>

    <template v-else>
      <div class="amount-value">
        <span v-html="$money.getSign('naira')"></span>
        {{ getEscrowNaira.split(".")[0]
        }}
        <span
          class="amount-zero"
        >.{{ getEscrowNaira.split(".")[1] }}</span>
      </div>
    </template>

    <!-- TITLE DESCRIPTION -->
    <div class="title-description secondary-3-text grey-700">Escrow balance</div>
  </div>
</template>

<script>
export default {
  name: "EscrowMetricCard",

  props: {
    escrow_balance: {
      type: Array,
      default: () => [],
    },

    loading_wallet: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    getEscrowNaira() {
      return this.escrow_balance[1].value;
    },

    getEscrowDollar() {
      return this.escrow_balance[0].value;
    },
  },
};
</script>

<style  lang="scss" scoped>
.escrow-metric-card {
  padding: toRem(16) toRem(24);
  margin-right: toRem(32);
  width: toRem(225);

  @include breakpoint-down(lg) {
    margin-right: toRem(24);
    padding: toRem(16);
    width: toRem(200);
  }

  @include breakpoint-custom-down(700) {
    width: toRem(170);
    margin-right: 0;
  }

  @include breakpoint-down(sm) {
    width: 100%;
  }

  .title-text {
    @include breakpoint-down(xs) {
      font-size: toRem(11.75);
    }
  }

  .amount-value {
    @include generate-font-type("h4");
    color: getColor("teal-800");
    padding-bottom: toRem(8);
    font-size: toRem(23.5);

    @include breakpoint-down(lg) {
      @include generate-font-type("primary-1");
      padding-bottom: toRem(12.75);
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
}
</style>