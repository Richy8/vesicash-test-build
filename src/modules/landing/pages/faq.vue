<template>
  <div>
    <!-- FAQ HERO SECTION -->
    <FAQHeroSection />

    <!-- FAQ DETAILS SECTION -->
    <FAQDetailsSection />

    <!-- SOLUTION CTA SECTION -->
    <SolutionCTA />
  </div>
</template>

<script>
import FAQHeroSection from "@/modules/landing/components/faq/faq-hero-section";

export default {
  name: "About",

  components: {
    FAQHeroSection,
    FAQDetailsSection: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/faq/faq-details-section"
      ),
    SolutionCTA: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-cta"
      ),
  },
};
</script>

<style lang="scss" scoped>
</style>