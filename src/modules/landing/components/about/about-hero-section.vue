<template>
  <div class="about-hero-section">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text mgb-32 roobert-700 teal-900 slide-right">
        <span class="teal-900">We build bridges between</span>
        <br />
        <span class="green-500">companies and customers.</span>
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text grey-700 h6-text roobert-400 slide-left">
        <div class="text-content">
          Vesicash Innovative Technologies was founded in 2018 with a mission to
          catalyze the African digital economy by enabling African businesses to
          make and receive secure digital payments in a seamless, customized and
          bespoke. Our patented,digital escrow technology has helped over 5,000
          businesses grow and scale.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutHeroSection",
};
</script>

<style lang="scss" scoped>
.about-hero-section {
  .vesicash-container {
    padding-bottom: toRem(60);
    overflow: hidden;

    .header-text {
      @include font-height(72, 82);
      margin-top: toRem(200);

      @include breakpoint-down(xl) {
        @include font-height(64, 70);
      }

      @include breakpoint-down(lg) {
        margin-top: toRem(180);
        @include font-height(50, 60);
      }

      @include breakpoint-down(md) {
        margin-top: toRem(150);
        @include font-height(40, 55);
      }

      @include breakpoint-down(sm) {
        @include font-height(34, 44);
      }

      @include breakpoint-down(xs) {
        @include font-height(32, 40);
      }
    }

    .description-text {
      @include flex-row-end-nowrap;
      margin-bottom: toRem(100);
      width: 100%;

      .text-content {
        width: 70%;

        @include breakpoint-down(md) {
          width: 80%;
        }

        @include breakpoint-down(sm) {
          width: 100%;
        }
      }

      @include breakpoint-down(lg) {
        margin-bottom: toRem(80);
        font-size: toRem(20);
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(60);
        font-size: toRem(18);
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(50);
      }
    }
  }
}

.slide-right {
  animation: 1.2s slide-right ease-in-out;
}

.slide-left {
  animation: 1.2s slide-left ease-in-out;
}

@keyframes slide-left {
  from {
    margin-left: 80%;
    opacity: 0.5;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    margin-left: -80%;
    opacity: 0.5;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
}
</style>