<template>
  <div>
    <!-- ABOUT HERO SECTION -->
    <AboutHeroSection />

    <!-- ABOUT VALUES SECTION -->
    <AboutValues />

    <!-- SOLUTION CTA SECTION -->
    <SolutionCTA />
  </div>
</template>

<script>
import AboutHeroSection from "@/modules/landing/components/about/about-hero-section";
import AboutValues from "@/modules/landing/components/about/about-values";

export default {
  name: "About",

  components: {
    AboutHeroSection,
    AboutValues,
    SolutionCTA: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-cta"
      ),
  },
};
</script>

<style lang="scss" scoped>
</style>