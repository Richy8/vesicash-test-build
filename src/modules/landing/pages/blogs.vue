<template>
  <div>
    <!-- BLOG HERO SECTION -->
    <BlogHeroSection />

    <!-- BLOG LIST SECTION -->
    <BlogListSection />
  </div>
</template>

<script>
import BlogHeroSection from "@/modules/landing/components/blogs/blog-hero-section";

export default {
  name: "Blogs",

  components: {
    BlogHeroSection,
    BlogListSection: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/blogs/blog-list-section"
      ),
  },
};
</script>

<style lang="scss" scoped>
</style>