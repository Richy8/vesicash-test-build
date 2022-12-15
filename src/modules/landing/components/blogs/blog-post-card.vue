<template>
  <div class="blog-post-card pointer">
    <!-- BLOG IMAGE -->
    <div
      class="blog-image mgb-32"
      :class="card_type === 'single' ? 'blog-image-by-2' : 'blog-image-by-3'"
    >
      <img v-lazy="loadImage('blog-img.png', 'landing')" class="wt-100" />
    </div>

    <!-- BLOG TITLE -->
    <div class="blog-title h2-text roobert-700 teal-900 mgb-16">
      Five things you are doing wrong as an Online Vendor
    </div>

    <!-- BLOG META -->
    <div class="blog-meta h7-text roobert-400 grey-600">
      <div class="category">How to</div>
      <div class="dot rounded-circle grey-500-bg"></div>
      <div class="author">By Vesicash</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPostCard",
  props: {
    card_type: {
      type: String,
      default: "single",
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-post-card {
  margin-bottom: toRem(60);

  .blog-image {
    &-by-2 {
      height: toRem(420);
    }

    &-by-3 {
      height: toRem(270);
    }
  }

  .blog-title {
    @include line-clamp(2);
  }

  .blog-meta {
    @include flex-row-start-wrap;
    align-items: center;

    .dot {
      @include draw-shape(5);
      margin: 0 toRem(8);
    }
  }
}
</style>