<template>
  <!-- VESICASH APP CONTAINER -->
  <div class="app-container layout-auth">
    <!-- CENTERED PLACED SECTION -->
    <div class="auth-area position-relative mgt-40">
      <!-- VESICASH FEATHER BRAND LOGO -->
      <a
        href="/"
        class="brand-logo mgb-32 text-center d-flex justify-content-center"
        style="width: max-width"
      >
        <VesicashBrandLogo type="light" />
      </a>

      <!-- AUTH ENTRY VIEW -->
      <div class="auth-entry-view mx-auto">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";

export default {
  name: "layoutAuth",

  components: {
    VesicashBrandLogo,
  },

  data: () => ({}),

  mounted() {
    this.$color.setPageBackgroundColor("#011a27");
  },
};
</script>

<style lang="scss" scoped>
.auth-area {
  .brand-logo {
    svg {
      width: toRem(160);
      height: auto;
    }
  }
}
</style>
