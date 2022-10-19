<template>
  <div
    class="fund-disburse-type-card rounded-12 border-grey-100 pointer wt-100"
    :class="details.selected && 'fund-disburse-type-card-active'"
    @click="$emit('updateSelection', { type: details.type, index })"
  >
    <div>
      <!-- TITLE TEXT -->
      <div class="title-text primary-1-text grey-900 mgb-5">
        {{ details.title }}
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text tertiary-2-text grey-600">
        {{ details.description }}
      </div>
    </div>

    <!-- SELECTED INDICATOR -->
    <div class="selected-indicator smooth-transition" v-if="details.selected">
      <SuccessIcon />
    </div>
  </div>
</template>

<script>
import SuccessIcon from "@/shared/components/icon-comps/success-icon";

export default {
  name: "FundDisburseTypeCard",

  components: {
    SuccessIcon,
  },

  props: {
    index: Number,

    details: {
      type: Object,
      default: () => ({
        title: "One off disbursement type",
        description:
          "Suitable for people that want to do one off payment to people",
        selected: false,
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
%active-card {
  background-color: getColor("green-50");
  border-color: getColor("green-500");
}

.fund-disburse-type-card {
  @include flex-row-between-nowrap;
  align-items: flex-start;
  padding: toRem(14) toRem(16);
  @include transition(0.4s);
  margin-bottom: toRem(24);
  position: relative;

  &:hover {
    transform: scale(1.02);
    @extend %active-card;
  }

  .selected-indicator {
    svg {
      @include draw-shape(24);
    }
  }

  .title-text {
    font-size: toRem(15.5);

    @include breakpoint-down(xs) {
      font-size: toRem(15);
    }
  }

  .description-text {
    font-size: toRem(13.75);

    @include breakpoint-down(xs) {
      @include font-height(13.25, 19);
    }
  }

  &-active {
    @extend %active-card;
  }
}
</style>
