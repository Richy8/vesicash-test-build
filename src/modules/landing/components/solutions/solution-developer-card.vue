<template>
  <div class="solution-developer-card neutral-10-bg position-relative rounded-16">
    <!-- TITLE TEXT -->
    <div class="title-text grey-900 h3-text roobert-70 mgb-16">{{ content.title }}</div>

    <!-- DESCRIPTION TEXT -->
    <div class="description-text grey-700 h7-text roobert-400 mgb-40">{{ content.description }}</div>

    <!-- CTA BUTTON -->
    <div class="btn-row">
      <a :href="content.link" class="btn btn-primary wt-100">{{content.cta}}</a>
      <!-- <button class="btn btn-primary wt-100">{{ content.cta }}</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "solutionDeveloperCard",

  props: {
    content: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.solution-developer-card {
  padding: toRem(24);
  height: toRem(285);

  @include breakpoint-down(md) {
    margin-bottom: toRem(40);
    height: unset;
  }

  .title-text {
    @include breakpoint-down(xl) {
      @include font-height(24, 32);
    }

    @include breakpoint-down(xs) {
      @include font-height(22, 31);
    }
  }

  .description-text {
    @include breakpoint-down(xl) {
      @include font-height(18, 28);
    }

    @include breakpoint-down(xs) {
      @include font-height(17, 26);
    }
  }

  .btn-row {
    // padding-right: toRem(48);
    position: absolute;
    bottom: toRem(24);
    width: 87%;

    @include breakpoint-down(xl) {
      width: 85%;
    }

    @include breakpoint-down(xl) {
      position: unset;
      bottom: unset;
      width: 100%;
    }

    .btn {
      @include breakpoint-down(xl) {
        font-size: toRem(14);
      }

      @include breakpoint-down(lg) {
        padding-left: toRem(15);
        padding-right: toRem(15);
        font-size: toRem(14);
      }

      @include breakpoint-down(md) {
        font-size: toRem(16);
      }
    }
  }
}
</style>