<template>
  <div
    class="fixed-top w-100 index-999 smooth-transition neutral-10-bg"
    ref="navbar"
  >
    <div class="vesicash-container">
      <div class="navigation-section smooth-transition">
        <router-link :to="{ name: 'VesicashHome' }" class="brand-logo">
          <VesicashBrandLogo />
        </router-link>

        <!-- NAVIGATIONS -->
        <div class="navigations">
          <div
            class="menu-icon icon-hamburger grey-500 f-size-32 pointer"
            @click="toggleMobileDropdown"
          ></div>

          <!-- NAV ITEMS -->
          <div class="nav-items">
            <!-- <router-link :to="{ name: 'VesicashHome' }" class="nav-item"
            >Home</router-link
          > -->
            <router-link :to="{ name: 'VesicashSolutions' }" class="nav-item"
              >What we do</router-link
            >
            <router-link :to="{ name: 'VesicashAbout' }" class="nav-item"
              >About us</router-link
            >
          </div>

          <!-- NAV BUTTONS -->
          <div class="nav-buttons">
            <router-link
              to="/login"
              class="btn btn-tertiary btn-md roobert-500 mgr-16"
              >Sign In</router-link
            >
            <router-link
              to="/register-lander"
              class="btn btn-primary btn-md roobert-500"
              >Create an account</router-link
            >
          </div>
        </div>
      </div>

      <!-- MOBILE MENU -->
      <template v-if="show_mobile_dropdown">
        <MobileMenu @closeMenu="toggleMobileDropdown" />
      </template>
    </div>
  </div>
</template>

<script>
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";

export default {
  name: "Navigation",

  components: {
    VesicashBrandLogo,
    MobileMenu: () =>
      import(
        /* webpackChunkName: 'MobileMenu' */ "@/modules/landing/components/mobile-menu"
      ),
  },

  data: () => ({
    show_mobile_dropdown: false,
  }),

  mounted() {
    window.onscroll = () => {
      this.$refs.navbar.classList.toggle("scrolling-up", window.scrollY > 20);
    };
  },

  methods: {
    toggleMobileDropdown() {
      this.show_mobile_dropdown = !this.show_mobile_dropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-section {
  @include flex-row-between-nowrap;
  padding: toRem(12) 0;

  .brand-logo {
    svg {
      width: toRem(146);
      height: auto;
    }
  }

  .navigations {
    @include flex-row-end-nowrap;

    .menu-icon {
      font-size: toRem(25);
      display: none;

      @include breakpoint-down(md) {
        display: unset;
      }
    }

    .nav-items {
      @include flex-row-end-nowrap;

      @include breakpoint-down(md) {
        display: none;
      }

      .nav-item {
        @include generate-font-type("secondary-1");
        font-family: "Roobert-Medium", sans-serif;
        color: getColor("grey-600");
        @include transition(0.4s);
        margin-right: toRem(56);

        &:hover,
        &.router-link-exact-active {
          color: getColor("green-500");
        }

        @include breakpoint-custom-down(920) {
          margin-right: toRem(35);
        }
      }
    }

    .nav-buttons {
      @include flex-row-end-nowrap;

      @include breakpoint-down(md) {
        display: none;
      }

      .btn {
        font-size: toRem(16);
      }

      .btn-tertiary {
        padding: toRem(11) toRem(37);

        @include breakpoint-custom-down(920) {
          padding: toRem(11) toRem(30);
          margin-right: toRem(12);
        }
      }

      .btn-primary {
        padding: toRem(11.75) toRem(20);

        @include breakpoint-custom-down(920) {
          padding: toRem(11.75) toRem(15);
        }
      }
    }
  }
}

.scrolling-up {
  background: getColor("neutral-10");
  @include transition(0.3s);

  .navigation-section {
    padding: toRem(8) 0;
  }
}

.scrolling-down {
  display: none;
}
</style>