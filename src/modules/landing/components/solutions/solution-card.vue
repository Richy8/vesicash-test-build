<template>
  <div class="solution-card">
    <!-- ICON WRAPPER -->
    <div class="icon-wrapper rounded-circle mgb-32">
      <img v-lazy="loadImage(solution.icon, 'landing')" :alt="solution.title" />
    </div>

    <!-- TITLE TEXT -->
    <div class="title-text grey-900 h3-text roobert-700 mgb-8">
      {{ solution.title }}
    </div>

    <!-- DESCRIPTION TEXT -->
    <div class="description-text grey-700 h7-text roobert-400">
      {{ solution.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionCard",

  props: {
    solution: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.solution-card {
  padding-right: toRem(10);
  margin-bottom: toRem(62);

  @include breakpoint-down(sm) {
    margin-bottom: toRem(40);
  }

  .icon-wrapper {
    position: relative;
    @include draw-shape(64);
    box-shadow: 1.33333px -1.33333px 5.33332px rgba(168, 177, 175, 0.3),
      -1.33333px 1.33333px 5.33332px rgba(168, 177, 175, 0.3);

    img {
      @include center-placement();
      @include draw-shape(40);
    }
  }

  .title-text {
    @include breakpoint-down(lg) {
      @include font-height(24, 32);
    }
  }

  .description-text {
    @include breakpoint-down(md) {
      @include font-height(18, 30);
    }

    @include breakpoint-down(sm) {
      @include font-height(17, 28);
    }
  }
}
</style>