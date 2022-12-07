<template>
  <div>
    <!-- SOLUTIONS HERO SECTION -->
    <SolutionsHeroSection />
    <SolutionSection />

    <!-- SOLUTION TRANSFER -->
    <SolutionTransfer />

    <!-- SOLUTION PAYOUT -->
    <SolutionPayout />

    <!-- SOLUTION DEVELOPERS -->
    <SolutionDevelopers />

    <!-- SOLUTION CTA SECTION -->
    <SolutionCTA />
  </div>
</template>

<script>
import SolutionsHeroSection from "@/modules/landing/components/solutions/solutions-hero-section";
import SolutionSection from "@/modules/landing/components/solutions/solution-section";

export default {
  name: "Solutions",

  components: {
    SolutionsHeroSection,
    SolutionSection,
    SolutionTransfer: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-transfer"
      ),
    SolutionPayout: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-payout"
      ),
    SolutionDevelopers: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-developers"
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