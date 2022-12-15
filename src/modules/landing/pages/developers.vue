<template>
  <div>
    <!-- DEVELOPER HERO SECTION -->
    <DeveloperHeroSection />

    <!-- DEVELOPER TOOLS SECTION -->
    <DeveloperTools />
  </div>
</template>

<script>
import DeveloperHeroSection from "@/modules/landing/components/developers/developer-hero-section";
import DeveloperTools from "@/modules/landing/components/developers/developer-tools";

export default {
  name: "Developers",

  components: {
    DeveloperHeroSection,
    DeveloperTools,
  },
};
</script>

<style lang="scss" scoped>
</style>