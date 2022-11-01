<template>
  <div class="feature-card">
    <!-- TITLE TEXT -->
    <div class="title-text grey-900 h2-text roobert-700 mgb-16">
      {{ feature.title }}
    </div>

    <!-- DESCRIPTION TEXT -->
    <div class="description-text grey-600 h7-text roobert-400 mgb-32">
      {{ feature.description }}
    </div>

    <!-- IMAGE SECTION -->
    <div class="image-section w-100">
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
  border: toRem(1) solid getColor("grey-100");
  border-radius: toRem(12);
  padding: toRem(32);

  .title-text {
    font-size: toRem(36);
  }

  .description-text {
    font-size: toRem(18);
  }

  .image-section {
    position: relative;

    img {
      width: 100%;
    }
  }
}
</style>