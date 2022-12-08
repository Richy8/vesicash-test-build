<template>
  <div class="mobile-menu neutral-10-bg index-99">
    <div class="vesicash-container">
      <!-- TOP ROW -->
      <div class="top-row">
        <div class="nav-content w-100 mx-auto">
          <!-- APP LOGO  -->
          <router-link :to="{ name: 'VesicashHome' }" class="brand-logo">
            <VesicashBrandLogo />
          </router-link>

          <!-- MENU TOGGLE  -->
          <div
            class="
              menu-toggler
              rounded-circle
              smooth-transition
              grey-50-bg
              pointer
            "
            @click="$emit('closeMenu')"
          >
            <div class="icon icon-close grey-700" title="Menu"></div>
          </div>
        </div>
      </div>

      <!-- MENU ROW -->
      <div class="bottom-row">
        <div class="nav-items">
          <router-link :to="{ name: 'VesicashHome' }" class="nav-item"
            >Home</router-link
          >
          <router-link :to="{ name: 'VesicashSolutions' }" class="nav-item"
            >What we do</router-link
          >
          <router-link :to="{ name: 'VesicashAbout' }" class="nav-item"
            >About us</router-link
          >

          <router-link to="/login" class="btn btn-tertiary btn-md mgb-24"
            >Sign In</router-link
          >
          <router-link to="/register-lander" class="btn btn-primary btn-md"
            >Create an account</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";

export default {
  name: "MobileMenu",

  components: {
    VesicashBrandLogo,
  },
};
</script>

<style lang="scss" scoped>
@keyframes slide-left {
  0%,
  30% {
    margin-left: -25px;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.mobile-menu {
  @include fixed-display-area;
  animation: slide-left 0.4s ease-in-out forwards;

  .top-row {
    padding: toRem(16) 0;
    @include transition(0.3s);

    .nav-content {
      @include flex-row-between-nowrap;

      .brand-logo {
        svg {
          width: toRem(141);
          height: auto;
        }
      }

      .menu-toggler {
        @include draw-shape(32);
        position: relative;

        .icon {
          @include center-placement();
          font-size: toRem(24);
        }

        &:hover {
          background: getColor("grey-100");
        }
      }
    }
  }

  .bottom-row {
    margin-top: toRem(40);

    @include breakpoint-down(xs) {
      margin-top: toRem(20);
    }

    .nav-items {
      @include flex-column-start-start;
      padding-left: toRem(5);

      .nav-item {
        @include generate-font-type("secondary-1");
        font-family: "Roobert-Medium", sans-serif;
        color: getColor("grey-600");
        @include transition(0.4s);
        margin-bottom: toRem(32);
        font-size: toRem(17);

        &:hover,
        &.router-link-exact-active {
          color: getColor("green-500");
        }
      }

      .btn {
        width: 100%;
        padding: toRem(11.5);
      }
    }
  }
}
</style>
