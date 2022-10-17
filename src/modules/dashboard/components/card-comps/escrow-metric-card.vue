<template>
  <div class="escrow-metric-card rounded-12 border-green-100 green-10-bg">
    <!-- TITLE TEXT -->
    <div class="title-text tertiary-3-text grey-700 mgb-12">ESCROW SIDE</div>

    <!-- AMOUNT VALUE IN DOLLARS -->
    <div class="amount-value mgb-8 border-bottom-grey-100">
      <span v-html="$money.getSign('dollar')"></span>0<span class="amount-zero"
        >.00</span
      >
    </div>

    <!-- AMOUNT VALUE IN NAIRA -->
    <div class="amount-value">
      <span v-html="$money.getSign('naira')"></span>0<span class="amount-zero"
        >.00</span
      >
    </div>

    <!-- TITLE DESCRIPTION -->
    <div class="title-description secondary-3-text grey-700">
      Escrow balance
    </div>
  </div>
</template>

<script>
export default {
  name: "EscrowMetricCard",
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
}
</style>