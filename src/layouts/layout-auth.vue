<template>
  <!-- VESICASH APP CONTAINER -->
  <div class="app-container layout-auth">
    <!-- CENTERED PLACED SECTION -->
    <div class="auth-area position-relative mgt-40">
      <!-- VESICASH FEATHER BRAND LOGO -->
      <div class="brand-logo mgb-32 text-center">
        <img
          v-lazy="loadImage('vesicash-feather-brand.svg')"
          alt="vesicash-brand-logo"
        />
      </div>

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
export default {
  name: "layoutAuth",

  data: () => ({}),

  mounted() {
    this.$color.setPageBackgroundColor("#011a27");
  },
};
</script>

<style lang="scss" scoped>
</style>
