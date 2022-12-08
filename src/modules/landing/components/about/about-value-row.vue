<template>
  <div class="about-value-row">
    <!-- COUNTER STATE -->
    <div class="counter teal-200 roobert-700">{{ value.counter }}</div>

    <!-- INFO BLOCK -->
    <div class="info-block">
      <div class="title-text h3-text roobert-700 grey-900">
        {{ value.title }}
      </div>

      <div class="description-text h7-text grey-700 roobert-400">
        {{ value.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutValueRow",

  props: {
    value: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.about-value-row {
  @include flex-row-between-nowrap;
  align-items: center;

  .counter {
    @include font-height(72, 82);
    margin-top: toRem(-30);
    width: 25%;

    @include breakpoint-down(lg) {
      @include font-height(60, 72);
    }

    @include breakpoint-down(md) {
      display: none;
    }
  }

  .info-block {
    border-top: toRem(0.5) solid getColor("grey-200");
    @include flex-row-start-wrap;
    align-items: flex-start;
    padding: toRem(56) 0;

    @include breakpoint-down(md) {
      padding: toRem(40) 0;
    }

    @include breakpoint-down(sm) {
      @include flex-column-start-start;
    }

    .title-text {
      width: 35%;

      @include breakpoint-down(lg) {
        @include font-height(26, 32);
      }

      @include breakpoint-down(md) {
        @include font-height(24, 30);
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(16);
        width: 100%;
      }
    }

    .description-text {
      width: 65%;

      @include breakpoint-down(lg) {
        @include font-height(18, 28);
      }

      @include breakpoint-down(md) {
        @include font-height(18, 28);
      }

      @include breakpoint-down(sm) {
        width: 100%;
      }
    }
  }
}
</style>