<template>
  <div>
    <!-- HOME HERO SECTION -->
    <HomeHeroSection />

    <!-- CLIENT BLOCK -->
    <ClientBlock />

    <!-- FEATURE SECTION -->
    <FeatureSection />

    <!-- BUSINESS AREA SECTION -->
    <BusinessAreaSection />

    <!-- TOOLS SECTION -->
    <ToolsSection />

    <!-- API CODE BLOCK -->
    <APICodeBlock />

    <!-- CTA BLOCK -->
    <CTABlock />
  </div>
</template>

<script>
import HomeHeroSection from "@/modules/landing/components/home/home-hero-section";
import ClientBlock from "@/modules/landing/components/home/client-block";
import CTABlock from "@/modules/landing/components/home/cta-block";

export default {
  name: "Home",

  components: {
    HomeHeroSection,
    ClientBlock,
    CTABlock,
    APICodeBlock: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/home/api-doc-block"
      ),
    FeatureSection: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/home/feature-section"
      ),
    BusinessAreaSection: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/home/business-area-section"
      ),
    ToolsSection: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/home/tools-section"
      ),
  },
};
</script>

<style lang="scss" scoped>
</style>