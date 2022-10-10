<template>
  <div
    class="sum-total-card grey-10-bg rounded-12"
    :class="use_custom_style && 'custom-text-style'"
  >
    <!-- TOTAL TEXT VALUE -->
    <div class="title grey-600 tertiary-1-text">{{ total_text }}</div>

    <!-- TOTAL AMOUNT VALUE -->
    <div class="value grey-900 primary-1-text">{{ total_value }}</div>
  </div>
</template>

<script>
export default {
  name: "SumTotalCard",

  props: {
    total_text: {
      type: String,
      required: true,
    },

    total_value: {
      type: String,
      required: true,
    },

    use_custom_style: {
      type: Boolean,
      default: false,
    },
  },
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

.custom-text-style {
  .title {
    @include generate-font-type("tertiary-2");
    font-size: toRem(14) !important;
  }

  .value {
    @include generate-font-type("secondary-2");
    font-size: toRem(14) !important;
  }
}
</style>