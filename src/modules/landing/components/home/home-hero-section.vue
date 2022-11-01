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
        Enabling businesses effectively manage their local and cross-border
        payments, with an additional security layer.
      </div>

      <!-- HERO IMAGE -->
      <div class="hero-img-container mx-auto">
        <img
          v-lazy="loadImage('hero-img.png', 'landing')"
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
    }

    .description-text {
      margin-bottom: toRem(100);
      font-size: toRem(18.75);
      width: 60%;
    }

    .hero-img-container {
      position: relative;
      width: 95%;

      img {
        width: 100%;
      }
    }
  }
}
</style>