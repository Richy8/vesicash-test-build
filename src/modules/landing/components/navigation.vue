<template>
  <div class="navigation-section vesicash-container">
    <div class="">
      <router-link :to="{ name: 'VesicashHome' }" class="brand-logo">
        <VesicashBrandLogo />
      </router-link>
    </div>

    <!-- NAVIGATIONS -->
    <div class="navigations">
      <!-- NAV ITEMS -->
      <div class="nav-items">
        <router-link to class="nav-item">Home</router-link>
        <router-link to class="nav-item">Product</router-link>
        <router-link to class="nav-item">About us</router-link>
      </div>

      <!-- NAV BUTTONS -->
      <div class="nav-buttons"></div>
    </div>
  </div>
</template>

<script>
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";

export default {
  name: "Navigation",

  components: {
    VesicashBrandLogo,
  },
};
</script>

<style lang="scss" scoped>
.navigation-section {
  @include flex-row-between-nowrap;
  padding: toRem(16) 0;

  .brand-logo {
    svg {
      width: toRem(141);
      height: auto;
    }
  }

  .navigations {
    @include flex-row-end-nowrap;

    .nav-items {
      @include flex-row-end-nowrap;

      .nav-item {
        padding: toRem(11) toRem(20);
        margin: 0 toRem(16);

        border: 1px solid red;
      }
    }

    .nav-buttons {
      @include flex-row-end-nowrap;
    }
  }
}
</style>