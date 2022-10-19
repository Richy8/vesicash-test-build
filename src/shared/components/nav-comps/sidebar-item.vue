<template>
  <router-link :to="nav.link" class="d-block mgb-14">
    <div
      class="sidebar-item smooth-transition rounded-8"
      :class="isActive && 'sidebar-item-active'"
    >
      <!-- ICON COMPONENT -->
      <component :is="nav.icon" />

      <!-- NAV TEXT -->
      <div
        class="
          nav-text
          secondary-2-text
          grey-600
          text-capitalize
          smooth-transition
        "
      >
        {{ nav.title }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SidebarItem",

  components: {
    DashboardIcon: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/icon-comps/dashboard-icon"
      ),
    DisbursementIcon: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/icon-comps/disbursement-icon"
      ),
    TransactionIcon: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/icon-comps/transaction-icon"
      ),
    SettingsIcon: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/icon-comps/settings-icon"
      ),
  },

  props: {
    nav: {
      type: Object,
      default: () => ({
        title: "Dashboard",
        icon: "DashboardIcon",
        link: "/dashboard",
      }),
    },
  },

  computed: {
    isActive() {
      return this.path_list.includes(this.nav.title) ? true : false;
    },
  },

  watch: {
    $route: {
      handler(value) {
        this.path_list = value.path.split("/");
      },
      immediate: true,
    },
  },

  data: () => ({
    path_list: [],
  }),
};
</script>

<style lang="scss">
%active-side-bar-state {
  background: getColor("neutral-10");

  .nav-text {
    color: getColor("teal-800");
  }

  svg {
    .light-theme {
      fill: getColor("teal-200") !important;
    }

    .dark-theme {
      fill: getColor("teal-800") !important;
    }
  }
}

.sidebar-item {
  @include flex-row-start-nowrap;
  padding: toRem(8);

  &:last-of-type {
    margin-bottom: 0;
  }

  svg {
    margin-right: toRem(16);

    .light-theme {
      @include transition(0.325s);
      fill: getColor("grey-300");
    }

    .dark-theme {
      @include transition(0.325s);
      fill: getColor("grey-500");
    }
  }

  &:hover {
    @extend %active-side-bar-state;
  }

  &-active {
    @extend %active-side-bar-state;
  }
}
</style>