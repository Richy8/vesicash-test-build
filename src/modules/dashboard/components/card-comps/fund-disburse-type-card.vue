<template>
  <div
    class="fund-disburse-type-card rounded-12 border-grey-100 pointer wt-100"
    :class="details.selected && 'fund-disburse-type-card-active'"
  >
    <div>
      <!-- TITLE TEXT -->
      <div class="title-text primary-2-text grey-900 mgb-5">
        {{ details.title }}
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text tertiary-3-text grey-600">
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

  .description-text {
    @include font-height(12.75, 18);

    @include breakpoint-down(sm) {
      @include font-height(12.25, 18);
    }
  }

  &-active {
    @extend %active-card;
  }
}
</style>
