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

    <!-- LOG OUT ACCOUNT SECTION -->
    <div class="wrapper position-absolute wt-100">
      <div
        class="log-out-section smooth-transition rounded-8 pointer w-100"
        @click="handleUserlogOut"
      >
        <!-- ICON COMPONENT -->
        <ExitIcon />

        <div class="nav-text secondary-2-text red-500">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navRoutes from "@/shared/nav-routes";
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";
import ExitIcon from "@/shared/components/icon-comps/exit-icon";
import SidebarItem from "@/shared/components/nav-comps/sidebar-item";

export default {
  name: "Sidebar",

  components: {
    VesicashBrandLogo,
    SidebarItem,
    ExitIcon,
  },

  data() {
    return {
      sidebar_routes: navRoutes,
    };
  },

  methods: {
    ...mapActions({ logOutUser: "auth/logOutUser" }),

    handleUserlogOut() {
      this.togglePageLoader();
      setTimeout(() => this.logOutUser(), 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: toRem(22) toRem(16);
  @include stretch-area;
  position: relative;

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

  .wrapper {
    padding: 0 toRem(16);
    bottom: toRem(24);
    left: 0;

    .log-out-section {
      @include flex-row-start-nowrap;
      position: relative;
      padding: toRem(8);

      svg {
        margin-right: toRem(16);
      }

      &:hover {
        background: getColor("neutral-10");
      }
    }
  }
}
</style>