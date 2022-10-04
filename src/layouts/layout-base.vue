<template>
  <div class="layout-base w-100">
    <!-- SIDEBAR BUILD -->
    <div
      class="sidebar-build"
      :class="show_mobile_sidebar && 'sidebar-build-open'"
      @click="hideSidebar"
    >
      <Sidebar />
    </div>

    <!-- BODY AREA -->
    <div class="body-build position-relative">
      <!-- MOBILE TOP BAR -->
      <MobileTopbar />

      <!-- CONTENT BUILD -->
      <div class="content-build position-relative index-1">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/shared/components/nav-comps/sidebar";
import MobileTopbar from "@/shared/components/nav-comps/mobile-topbar";

export default {
  name: "LayoutBase",

  components: {
    Sidebar,
    MobileTopbar,
  },

  data: () => ({
    show_mobile_sidebar: false,
  }),

  created() {
    this.$bus.$on("show-sidebar", () => (this.show_mobile_sidebar = true));
  },

  mounted() {
    this.$color.setPageBackgroundColor("#ffffff");
  },

  methods: {
    hideSidebar($event) {
      if ($event.target.classList.contains("sidebar-build-open"))
        this.show_mobile_sidebar = !this.show_mobile_sidebar;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-base {
  @include flex-row-between-nowrap;
  align-items: flex-start;

  .sidebar-build {
    @include fixed-display-area;
    width: 19%;

    @include breakpoint-down(xl) {
      width: 22%;
    }

    @include breakpoint-down(lg) {
      transition: left 0.3s ease-in;
      left: -100%;
      width: 0;
    }

    &-open {
      @include breakpoint-down(lg) {
        background: linear-gradient(
          180deg,
          rgba(1, 26, 39, 0.28) 4.69%,
          rgba(1, 26, 39, 0.25) 56.25%,
          rgba(1, 26, 39, 0.37) 100%
        );
        z-index: 99;
        width: 100%;
        left: 0;
      }
    }
  }

  .body-build {
    width: 81%;
    left: 19%;

    @include breakpoint-down(xl) {
      width: 78%;
      left: 22%;
    }

    @include breakpoint-down(lg) {
      width: 100%;
      left: 0;
    }

    .content-build {
      padding: toRem(32) toRem(32) 0;

      @include breakpoint-down(lg) {
        padding: toRem(32) toRem(24) 0;
        top: toRem(56);
      }

      @include breakpoint-down(sm) {
        padding: toRem(32) toRem(16) 0;
      }

      @include breakpoint-down(xs) {
        padding: toRem(32) toRem(13) 0;
      }
    }
  }
}
</style>