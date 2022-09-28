<template>
  <div
    class="
      onboarding-card
      position-relative
      pointer
      rounded-8
      smooth-transition
    "
    :class="account.selected && 'onboarding-card-active'"
    @click="$emit('select-onboarding-card', index)"
  >
    <!-- SELECTED INDICATOR -->
    <div class="selected-indicator smooth-transition" v-if="account.selected">
      <SuccessIcon />
    </div>

    <!-- CARD ICON -->
    <div class="card-icon mgb-15">
      <img
        v-lazy="loadImage(account.icon)"
        :alt="`Vesicash ${account.title}`"
      />
    </div>

    <!-- CARD TITLE -->
    <div class="card-title text-center primary-2-text grey-900 mgb-6">
      {{ account.title }}
    </div>

    <!-- CARD DESCRIPTION -->
    <div class="card-description text-center tertiary-3-text grey-600">
      {{ account.description }}
    </div>
  </div>
</template>

<script>
import SuccessIcon from "@/shared/components/icons/success-icon";

export default {
  name: "OnboardingCard",

  components: { SuccessIcon },

  props: {
    index: Number,
    account: Object,
  },
};
</script>

<style lang="scss" scoped>
%active-card-state {
  background-color: getColor("green-50");
  border: toRem(1) solid getColor("green-500") !important;
}

// CREATED A MIXIN TO AVOID REPEATING CODE LINES
@mixin handle-extra-small-screen-view {
  margin-bottom: toRem(24);
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.onboarding-card {
  border: toRem(1) solid getColor("grey-100");
  padding: toRem(30) toRem(18) toRem(24);
  @include flex-column-center;
  width: toRem(220);

  @include breakpoint-down(xxs) {
    @include handle-extra-small-screen-view();
  }

  @include breakpoint-up(xxs) {
    @include handle-extra-small-screen-view();
  }

  @include breakpoint-up(lg) {
    width: toRem(220);
    margin-bottom: 0;
  }

  &:hover {
    @extend %active-card-state;
  }

  .selected-indicator {
    position: absolute;
    right: toRem(16);
    top: toRem(12);

    svg {
      @include draw-shape(18);
    }
  }

  .card-icon {
    img {
      @include draw-shape(46);
    }
  }

  .card-description {
    @include font-height(12.35, 18);
  }

  &-active {
    @extend %active-card-state;
  }
}
</style>