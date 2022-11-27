<template>
  <div class="summation-card rounded-16 border-grey-100">
    <!-- ONE-OFF DISBURSEMENT -->
    <template v-if="getTransactionType === 'oneoff'">
      <div class="item-row">
        <div class="item grey-600 tertiary-2-text">Amount to pay</div>

        <div
          class="value grey-900 secondary-2-text"
          v-html="
            `${getCurrencySign} ${$money.addComma(
              amount_data.milestone_amounts[0] || 0
            )}`
          "
        ></div>
      </div>
    </template>

    <!-- MILESTONE DISBURSEMENT -->
    <template v-else>
      <div
        class="item-row"
        v-for="(milestone, index) in milestones"
        :key="index"
      >
        <div class="item grey-600 tertiary-2-text">
          {{ milestone.name ? milestone.name : `Milestone ${index + 1}` }}
          payment
        </div>

        <div
          class="value grey-900 secondary-2-text"
          v-html="
            `${getCurrencySign} ${$money.addComma(
              amount_data.milestone_amounts[index] || 0
            )}`
          "
        ></div>
      </div>
    </template>

    <div class="item-row">
      <div class="item grey-600 tertiary-2-text">Escrow fee (5%)</div>
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
    milestones: {
      type: Array,
    },

    amount_data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getCurrencySign() {
      return this.$money.getSign(this.amount_data.currency.slug);
    },

    // ===================================================
    // GET THE TRANSACTION DISBURSEMENT TYPE FROM ROUTE
    // ===================================================
    getTransactionType() {
      return this.$route.query.type ? this.$route.query.type : "oneoff";
    },

    // PAUSED
    getEscrowCharge() {
      let escrow_type = this.getBusinessData.escrow_charge?.type;
      let escrow_value = this.getBusinessData.escrow_charge?.value;

      // PERCENTAGE TYPE
      if (escrow_type === "percentage") {
        return `${Number(this.getBusinessData.escrow_charge?.value) * 100}%`;
      }

      // FIXED TYPE
      else if (escrow_type === "fixed") {
        return escrow_value;
      }

      // PERCENTAGE AND FIXED TYPE
      else {
      }

      return escrow_type;
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
