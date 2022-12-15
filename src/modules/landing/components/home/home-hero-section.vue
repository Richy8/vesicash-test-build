<template>
  <div class="home-hero-section teal-900-bg">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text text-center mgb-32 roobert-700 fw-700 green-200">
        Digital Escrow and <br />
        Global Remittances
        <span class="teal-200">for African Businesses</span>
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text neutral-10 h6-text roobert-400 text-center">
        Enabling businesses effectively manage their local and cross-border B2B
        payments, with an additional security layer.
      </div>

      <!-- HERO IMAGE -->
      <div class="hero-img-container mx-auto">
        <img
          v-lazy="loadImage('home-hero-img.png', 'landing')"
          alt="Vesicash dashboard"
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeroSection",
};
</script>

<style lang="scss" scoped>
.home-hero-section {
  .vesicash-container {
    @include flex-column-center;
    justify-content: flex-start;

    .header-text {
      @include font-height(72, 85);
      margin-top: toRem(200);

      @include breakpoint-down(xl) {
        @include font-height(64, 70);
      }

      @include breakpoint-down(lg) {
        margin-top: toRem(180);
        @include font-height(50, 60);
      }

      @include breakpoint-down(md) {
        margin-top: toRem(160);
        @include font-height(40, 55);
      }

      @include breakpoint-down(xs) {
        br {
          display: none;
        }
      }
    }

    .description-text {
      margin-bottom: toRem(100);
      width: 76%;

      @include breakpoint-down(xl) {
        width: 80%;
      }

      @include breakpoint-down(lg) {
        margin-bottom: toRem(80);
        font-size: toRem(24);
        width: 80%;
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(60);
        font-size: toRem(20);
        width: 100%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(50);
        font-size: toRem(18);
      }
    }

    .hero-img-container {
      position: relative;
      width: 95%;

      @include breakpoint-down(lg) {
        width: 100%;
      }

      img {
        width: 100%;
      }
    }
  }
}
</style>