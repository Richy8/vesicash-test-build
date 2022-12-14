<template>
  <div class="faq-hero-section">
    <div class="vesicash-container">
      <div class="section-wrapper W-100">
        <!-- HEADER TEXT -->
        <div
          class="header-text mgb-24 roobert-700 teal-900 text-center mx-auto"
        >
          Frequently Asked Questions
        </div>

        <!-- DESCRIPTION TEXT -->
        <div class="description-text grey-700 h6-text roobert-400 text-center">
          How can we help you today
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "faqHeroSection",
};
</script>

<style lang="scss" scoped>
.faq-hero-section {
  .section-wrapper {
    margin: auto toRem(92);

    @include breakpoint-down(md) {
      margin: auto;
    }

    .header-text {
      @include font-height(72, 82);
      margin-top: toRem(200);
      width: 80%;

      @include breakpoint-down(xl) {
        @include font-height(64, 72);
      }

      @include breakpoint-down(lg) {
        @include font-height(52, 64);
        margin-top: toRem(180);
      }

      @include breakpoint-down(md) {
        margin-top: toRem(140);
        margin-bottom: toRem(24) !important;
        @include font-height(40, 48);
      }
    }

    .description-text {
      margin-bottom: toRem(40);

      @include breakpoint-down(lg) {
        font-size: toRem(24);
      }

      @include breakpoint-down(md) {
        font-size: toRem(20);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(18);
      }
    }
  }
}
</style>