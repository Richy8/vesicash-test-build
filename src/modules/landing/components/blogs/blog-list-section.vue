<template>
  <div class="blog-list-section">
    <div class="vesicash-container">
      <div class="row">
        <div class="col-12 col-sm-6">
          <BlogPostCard />
        </div>

        <div class="col-12 col-sm-6">
          <BlogPostCard />
        </div>

        <div class="col-12 col-sm-6">
          <BlogPostCard />
        </div>

        <div class="col-12 col-sm-6">
          <BlogPostCard />
        </div>

        <div class="col-12 col-sm-4">
          <BlogPostCard card_type="multiple" />
        </div>

        <div class="col-12 col-sm-4">
          <BlogPostCard card_type="multiple" />
        </div>

        <div class="col-12 col-sm-4">
          <BlogPostCard card_type="multiple" />
        </div>
      </div>

      <!-- BLOG NEWSLETTER -->
      <BlogNewsletter />
    </div>
  </div>
</template>

<script>
import BlogPostCard from "@/modules/landing/components/blogs/blog-post-card";

export default {
  name: "BlogListSection",

  components: {
    BlogPostCard,
    BlogNewsletter: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/blogs/blog-newsletter"
      ),
  },
};
</script>

<style lang="scss" scoped>
.blog-list-section {
  padding: toRem(120) 0 toRem(80);
}
</style>