<template>
  <div class="solution-hero-section">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text mgb-32 roobert-700 teal-900">What we do</div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text grey-700 h6-text roobert-400">
        Vesicash Innovative Technologies is a digital escrow company with a
        mission to catalyze the African digital economy.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionsHeroSection",
};
</script>

<style lang="scss" scoped>
.solution-hero-section {
  .vesicash-container {
    .header-text {
      @include font-height(72, 82);
      margin-top: toRem(200);

      @include breakpoint-down(xl) {
        @include font-height(64, 72);
      }

      @include breakpoint-down(lg) {
        margin-top: toRem(180);
      }

      @include breakpoint-down(md) {
        margin-top: toRem(140);
        margin-bottom: toRem(24) !important;
        @include font-height(40, 48);
      }

      @include breakpoint-down(xs) {
        // @include font-height(32, 40);
      }
    }

    .description-text {
      margin-bottom: toRem(100);
      width: 55%;

      @include breakpoint-down(lg) {
        margin-bottom: toRem(80);
        font-size: toRem(24);
        width: 60%;
      }

      @include breakpoint-down(md) {
        // font-size: toRem(20);
        margin-bottom: toRem(60);
        width: 100%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(50);
        font-size: toRem(18);
      }
    }
  }
}
</style>