<template>
  <div class="blog-hero-section teal-900-bg">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text text-center mgb-32 roobert-700 neutral-10">
        Vesicash Blog
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text neutral-10 h6-text roobert-400 text-center">
        Finance, escrow, e-commerce and other information that keeps you on the
        edge of technology
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogHeroSection",
};
</script>

<style lang="scss" scoped>
.blog-hero-section {
  .vesicash-container {
    @include flex-column-center;
    justify-content: flex-start;

    .header-text {
      @include font-height(72, 85);
      margin-top: toRem(190);

      @include breakpoint-down(xl) {
        @include font-height(64, 70);
      }

      @include breakpoint-down(lg) {
        margin-top: toRem(180);
        @include font-height(50, 60);
      }

      @include breakpoint-down(md) {
        @include font-height(40, 48);
        margin-top: toRem(150);
      }
    }

    .description-text {
      margin-bottom: toRem(120);
      width: 50%;

      @include breakpoint-down(lg) {
        margin-bottom: toRem(100);
        width: 80%;
      }

      @include breakpoint-down(md) {
        @include generate-font-type("h7");
        margin-bottom: toRem(90);
        width: 100%;
      }
    }
  }
}
</style>