<template>
  <div class="page-loader w-100 smooth-transition index-999">
    <div class="row position-relative h-100">
      <div
        class="
          col-12
          d-flex
          flex-column
          justify-content-center
          align-items-center
          h-100
          mx-auto
        "
      >
        <!-- PROCESSING FEATHER LOGO -->
        <VesicashFeatherLogo />
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
};
</script>

<style lang="scss">
.page-loader {
  @include fixed-display-area;
  background: linear-gradient(
    180deg,
    rgba(1, 26, 39, 0.28) 4.69%,
    rgba(1, 26, 39, 0.25) 56.25%,
    rgba(1, 26, 39, 0.37) 100%
  );

  .row {
    .col-12 {
      @include center-placement();

      svg {
      }
    }
  }
}
</style>
