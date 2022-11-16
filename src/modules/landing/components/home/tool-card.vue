<template>
  <div class="tool-card">
    <!-- IMAGE BLOCK -->
    <div class="image-block position-relative w-100 mgb-32">
      <img v-lazy="loadImage(tool.image, 'landing')" alt="" class="w-100" />
    </div>

    <!-- TITLE TEXT -->
    <div class="title-text grey-900 h3-text roobert-700 mgb-8">
      {{ tool.title }}
    </div>

    <!-- DESCRIPTION TEXT -->
    <div class="description-text grey-600 h7-text roobert-400">
      {{ tool.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolCard",

  props: {
    tool: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.tool-card {
  margin-bottom: toRem(60);

  .title-text {
    font-size: toRem(28);

    @include breakpoint-down(lg) {
      font-size: toRem(26);
    }

    @include breakpoint-down(md) {
      @include font-height(22, 33);
    }
  }

  .description-text {
    font-size: toRem(18);

    @include breakpoint-down(lg) {
      font-size: toRem(17);
    }

    @include breakpoint-down(md) {
      font-size: toRem(16.5);
    }
  }
}
</style>