<template>
  <div>
    <!-- TOP NAVIGATION -->
    <Navigation />

    <!-- BODY SECTION -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- FOOTER SECTION -->
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/modules/landing/components/navigation";
import Footer from "@/modules/landing/components/footer";

export default {
  name: "LauoutLanding",

  components: {
    Navigation,
    Footer,
  },

  mounted() {
    this.$color.setPageBackgroundColor("#ffffff");
  },
};
</script>

<style lang="scss" scoped>
</style>