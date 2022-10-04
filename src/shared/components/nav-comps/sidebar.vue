<template>
  <div class="sidebar teal-50-bg index-99">
    <!-- BRAND LOGO -->
    <router-link
      :to="{ name: 'VesicashDashboard' }"
      class="brand-logo mgb-40 d-block"
    >
      <VesicashBrandLogo />
    </router-link>

    <!-- SIDE NAV ITEMS -->
    <div class="sidebar-item-list index-99">
      <SidebarItem
        v-for="(nav, index) in sidebar_routes"
        :key="index"
        :nav="nav"
      />
    </div>
  </div>
</template>

<script>
import navRoutes from "@/shared/nav-routes";
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";
import SidebarItem from "@/shared/components/nav-comps/sidebar-item";

export default {
  name: "Sidebar",

  components: {
    VesicashBrandLogo,
    SidebarItem,
  },

  data() {
    return {
      sidebar_routes: navRoutes,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: toRem(22) toRem(16);
  @include stretch-area;

  @include breakpoint-down(lg) {
    width: 60%;
  }

  @include breakpoint-down(sm) {
    width: 65%;
  }

  @include breakpoint-down(xs) {
    width: 75%;
  }

  .brand-logo {
    svg {
      width: toRem(146);
      height: auto;
    }
  }
}
</style>