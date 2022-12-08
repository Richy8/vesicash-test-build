<template>
  <div class="feature-card">
    <div class="content-top">
      <!-- TITLE TEXT -->
      <div class="title-text grey-900 h2-text roobert-700 mgb-16">
        {{ feature.title }}
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text grey-600 h7-text roobert-400 mgb-32">
        {{ feature.description }}
      </div>
    </div>

    <!-- IMAGE SECTION -->
    <div class="image-section">
      <img v-lazy="loadImage(feature.image, 'landing')" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureCard",

  props: {
    feature: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.feature-card {
  position: relative;
  border: toRem(1) solid getColor("grey-100");
  border-radius: toRem(12);
  height: toRem(750);

  @include breakpoint-down(xl) {
    height: toRem(680);
  }

  @include breakpoint-down(md) {
    height: unset;
  }

  .content-top {
    padding: toRem(32);

    @include breakpoint-down(sm) {
      padding: toRem(28);
    }

    @include breakpoint-down(xs) {
      padding: toRem(20);
    }

    .title-text {
      // font-size: toRem(36);

      @include breakpoint-down(lg) {
        @include font-height(34, 40);
      }

      @include breakpoint-down(sm) {
        @include font-height(28, 38);
      }
    }

    .description-text {
      // font-size: toRem(18);

      @include breakpoint-down(lg) {
        font-size: toRem(18);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(16.5);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(16);
      }
    }
  }

  .image-section {
    padding: toRem(32);
    position: absolute;
    bottom: 0;

    @include breakpoint-down(md) {
      padding: 0 toRem(32) toRem(32);
      position: unset;
      height: auto;
      width: 100%;
    }

    @include breakpoint-down(sm) {
      padding: 0 toRem(28) toRem(28);
    }

    @include breakpoint-down(xs) {
      padding: 0 toRem(20) toRem(20);
    }

    img {
      width: 100%;
    }
  }
}
</style>