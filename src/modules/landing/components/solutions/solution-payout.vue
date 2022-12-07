<template>
  <div class="solution-payout">
    <div class="vesicash-container">
      <div class="row">
        <!-- COPY SECTION -->
        <div class="copy-section col-12 col-md-6 mb-5 mb-md-0">
          <div class="title-text h2-text roobert-700 grey-900 mgb-16">
            Payouts made easy
          </div>

          <div class="description-text h6-text roobert-400 grey-600 mgb-32">
            Send or receive money in over 130 major currencies without any
            hassle. Or, get paid in over 130 major currencies with ease
          </div>
        </div>

        <!-- IMAGE SECTION -->
        <div class="col-12 col-md-6">
          <div class="image-section position-relative w-100">
            <img
              v-lazy="loadImage('solution-img-two.png', 'landing')"
              alt="Vesicash-payout-funds"
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
  name: "SolutionPayout",
};
</script>

<style lang="scss" scoped>
.solution-payout {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .row {
    @include flex-row-between-wrap;

    .title-text {
      // font-size: toRem(38);

      @include breakpoint-down(lg) {
        @include font-height(32, 40);
      }

      @include breakpoint-down(sm) {
        @include font-height(30, 40);
      }
    }

    .description-text {
      @include font-height(24, 32);
      width: 95%;

      @include breakpoint-down(lg) {
        @include font-height(18, 30);
      }

      @include breakpoint-down(sm) {
        @include font-height(17, 30);
        margin-bottom: toRem(12) !important;
        width: 100%;
      }
    }
  }
}
</style>