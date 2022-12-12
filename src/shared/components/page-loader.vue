<template>
  <div class="page-loader w-100 smooth-transition">
    <div class="row position-relative h-100">
      <div
        class="col-12 d-flex flex-column justify-content-center align-items-center h-100 mx-auto"
      >
        <!-- PROCESSING FEATHER LOGO -->
        <div class="pulse-animate">
          <VesicashFeatherLogo />
        </div>

        <div
          v-if="message.length"
          class="loader-text text-center neutral-10 primary-1-text mgt-15 fw-400"
        >{{ message }}...</div>
      </div>
    </div>
  </div>
</template>

<script>
import VesicashFeatherLogo from "@/shared/components/icon-comps/vesicash-feather-logo";

export default {
  name: "PageLoader",

  components: {
    VesicashFeatherLogo,
  },

  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.page-loader {
  @include fixed-display-area;
  background: linear-gradient(
    180deg,
    rgba(1, 26, 39, 0.48) 4.69%,
    rgba(1, 26, 39, 0.45) 56.25%,
    rgba(1, 26, 39, 0.47) 100%
  );

  z-index: 3500;

  .row {
    .col-12 {
      @include center-placement();

      .loader-text {
        font-size: toRem(16.5);
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.85);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.85);
    }
  }

  .pulse-animate {
    -webkit-animation: pulse 1.5s linear infinite;
    -moz-animation: pulse 1.5s linear infinite;
    -ms-animation: pulse 1.5s linear infinite;
    animation: pulse 1.5s linear infinite;
  }
}
</style>
