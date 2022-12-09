<template>
  <div class="cta-block teal-900-bg">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div class="header-text text-center h1-text roobert-700 neutral-10 mgb-32">
        Ready to grow your
        <br />business to the next level
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text text-center h6-text roobert-400 grey-200 mgb-50">
        Let’s help you with all the tools you need to take your business to the
        next level
      </div>

      <!-- BUTTON ROW -->
      <div class="button-row">
        <a
          href="https://vesicash.com/contact"
          class="btn btn-secondary btn-md mgr-16 roobert-500"
        >Contact Us</a>
        <router-link
          to="/register-lander"
          class="btn btn-primary btn-md mgl-16 roobert-500"
        >Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTABlock",
};
</script>

<style lang="scss" scoped>
.cta-block {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .vesicash-container {
    @include flex-column-center;

    .header-text {
      @include font-height(64, 72);

      @include breakpoint-down(lg) {
        @include font-height(58, 72);
      }

      @include breakpoint-down(md) {
        @include font-height(44, 65);
      }

      @include breakpoint-down(sm) {
        @include font-height(36, 58);

        br {
          display: none;
        }
      }

      @include breakpoint-down(xs) {
        @include font-height(30, 52);
      }
    }

    .description-text {
      width: 45%;

      @include breakpoint-down(lg) {
        font-size: toRem(17);
        width: 60%;
      }

      @include breakpoint-down(md) {
        width: 80%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(35) !important;
        font-size: toRem(16);
        width: 90%;
      }
    }

    .button-row {
      @include flex-row-center-nowrap;

      @include breakpoint-down(sm) {
        @include flex-row-center-wrap;
        width: 100%;
      }

      .btn {
        font-size: toRem(16);
      }

      .btn-secondary {
        padding: toRem(15.25) toRem(50);

        @include breakpoint-down(sm) {
          width: 100%;
          margin: toRem(13) 0 !important;
        }
      }

      .btn-primary {
        padding: toRem(17) toRem(35);

        @include breakpoint-down(sm) {
          margin: toRem(13) 0 !important;
          width: 100%;
        }
      }
    }
  }
}
</style>