<template>
  <div class="sum-total-card grey-10-bg rounded-12">
    <div class="title grey-600 tertiary-1-text">Total amount to pay</div>

    <div class="value grey-900 primary-1-text">$35,500</div>
  </div>
</template>

<script>
export default {
  name: "SumTotalCard",
};
</script>

<style lang="scss" scoped>
.sum-total-card {
  border: toRem(1) dashed getColor("green-500");
  @include flex-row-between-nowrap;
  padding: toRem(14) toRem(16);

  @include breakpoint-down(sm) {
    padding: toRem(14);
  }

  .title {
    @include breakpoint-down(sm) {
      font-size: toRem(15);
    }
  }

  .value {
    @include breakpoint-down(sm) {
      font-size: toRem(15);
    }
  }
}
</style>