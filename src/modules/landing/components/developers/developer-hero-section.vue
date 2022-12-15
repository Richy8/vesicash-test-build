<template>
  <div class="developer-hero-section">
    <div class="vesicash-container">
      <div class="section-wrapper">
        <div class="col-12 col-md-6">
          <div class="header-text mgb-24 roobert-700 teal-900">
            Integrate vesicash today
          </div>

          <!-- DESCRIPTION TEXT -->
          <div class="description-text grey-700 h6-text roobert-400 mgb-43">
            Our RESTful Application Programming Interface (API) enables digital
            escrow capabilities on your platform.
          </div>

          <!-- BUTTON ROW -->
          <div class="btn-row">
            <a href="#" class="btn btn-primary btn-lg mgr-16 roobert-500"
              >Get Started</a
            >

            <a href="#" class="btn btn-secondary btn-lg mgr-16 roobert-500"
              >View documentation</a
            >
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="image-section position-relative w-100">
            <img
              v-lazy="loadImage('developer-connect.png', 'landing')"
              alt="Developer connect"
              class="wt-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeveloperHeroSection",
};
</script>

<style lang="scss" scoped>
.developer-hero-section {
  .section-wrapper {
    @include flex-row-between-nowrap;
    margin: toRem(120) auto toRem(90);
    align-items: center;

    @include breakpoint-down(md) {
      margin: toRem(120) auto toRem(50);
      @include flex-row-between-wrap;
    }

    .header-text {
      @include font-height(72, 82);
      width: 90%;

      @include breakpoint-down(xl) {
        @include font-height(64, 72);
      }

      @include breakpoint-down(lg) {
        @include font-height(52, 64);
      }

      @include breakpoint-down(md) {
        @include font-height(40, 48);
      }
    }

    .description-text {
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

    .btn-row {
      @include flex-row-start-nowrap;

      @include breakpoint-down(xs) {
        @include flex-row-start-wrap;

        .btn {
          &:first-of-type {
            margin-bottom: toRem(24);
          }
        }
      }
    }
  }
}
</style>