<template>
  <div class="summation-card rounded-16 border-grey-100">
    <div class="item-row">
      <div class="item grey-600 tertiary-2-text">Amount to pay</div>
      <div
        class="value grey-900 secondary-2-text"
        v-html="`${getCurrencySign} ${$money.addComma(amount_data.amount)}`"
      ></div>
    </div>

    <div class="item-row">
      <div class="item grey-600 tertiary-2-text">15% Escrow fee</div>
      <div
        class="value grey-900 secondary-2-text"
        v-html="`${getCurrencySign} ${$money.addComma(amount_data.escrow_fee)}`"
      ></div>
    </div>

    <!-- TOTAL ROW -->
    <div class="total-row">
      <div class="item grey-900 tertiary-2-text">TOTAL AMOUNT</div>
      <div
        class="value grey-900 primary-2-text"
        v-html="`${getCurrencySign} ${$money.addComma(amount_data.total_fee)}`"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummationCard",

  props: {
    amount_data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getCurrencySign() {
      return this.$money.getSign(this.amount_data.currency.slug);
    },
  },
};
</script>

<style lang="scss" scoped>
.summation-card {
  padding: toRem(24);

  @include breakpoint-down(sm) {
    padding: toRem(16);
  }

  .item-row {
    border-bottom: toRem(1) solid getColor("grey-100");
    @include flex-row-between-nowrap;
    padding-bottom: toRem(14);
    margin-bottom: toRem(16);

    &:last-of-type {
      margin-bottom: 0;
      border-bottom: 0;
    }
  }

  .total-row {
    @include flex-row-between-nowrap;
  }
}
</style>
