<template>
  <div class="home-hero-section teal-900-bg">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text text-center mgb-32 roobert-700 fw-700 green-200">
        Global Remittance and <br />
        Digital Escrow
        <span class="teal-200">for Every Business</span>
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text neutral-10 h7-text text-center">
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
    // height: 100vh;

    .header-text {
      @include font-height(70, 90);
      margin-top: toRem(120);

      @include breakpoint-down(xl) {
        @include font-height(64, 72);
      }

      @include breakpoint-down(lg) {
        margin-top: toRem(100);
        @include font-height(50, 68);
      }

      @include breakpoint-down(md) {
        margin-top: toRem(80);
        @include font-height(40, 60);
      }

      @include breakpoint-down(xs) {
        @include font-height(34, 56);

        br {
          display: none;
        }
      }
    }

    .description-text {
      margin-bottom: toRem(100);
      font-size: toRem(18.75);
      width: 60%;

      @include breakpoint-down(xl) {
        width: 80%;
      }

      @include breakpoint-down(lg) {
        margin-bottom: toRem(80);
        font-size: toRem(18);
        width: 80%;
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(60);
        font-size: toRem(17);
        width: 100%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(50);
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