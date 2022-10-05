<template>
  <div class="auth-wrapper wt-fit neutral-10-bg rounded-16 mx-auto mgb-40">
    <!-- TITLE TEXT -->
    <div class="title-text h5-text grey-900 text-center">
      {{ title_text }}
    </div>

    <!-- META TEXT -->
    <div
      class="meta-text tertiary-2-text grey-600 text-center mgt-4"
      v-if="meta_text"
      v-html="meta_text"
    ></div>

    <!-- AUTH FORM AREA -->
    <div class="auth-form-area mgt-24">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthWrappers",

  props: {
    title_text: {
      type: String,
      default: "Title text",
    },
    meta_text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  padding: toRem(24);

  @include breakpoint-down(xxs) {
    padding: toRem(24) toRem(14);
    width: 100%;
  }

  @include breakpoint-up(xxs) {
    padding: toRem(24) toRem(16);
    width: 100%;
  }

  @include breakpoint-up(sm) {
    padding: toRem(24);
    width: fit-content;
  }

  .title-text {
    @include breakpoint-down(xxs) {
      font-size: toRem(18);
    }

    @include breakpoint-up(xxs) {
      font-size: toRem(18.25);
    }

    @include breakpoint-up(sm) {
      font-size: toRem(19);
    }

    @include breakpoint-up(lg) {
      font-size: toRem(20);
    }
  }

  .meta-text {
    font-size: toRem(13.5);

    @include breakpoint-down(xxs) {
      font-size: toRem(12.75);
    }

    @include breakpoint-up(xxs) {
      font-size: toRem(13);
    }

    @include breakpoint-up(sm) {
      font-size: toRem(13.25);
    }

    @include breakpoint-up(lg) {
      font-size: toRem(13.5);
    }
  }

  .auth-page {
    width: toRem(362);

    @include breakpoint-down(xxs) {
      width: 100%;
    }

    @include breakpoint-up(xxs) {
      width: 100%;
    }

    @include breakpoint-up(sm) {
      width: toRem(362);
    }

    .btn-area {
      .btn {
        padding: toRem(10);
      }
    }
  }
}
</style>