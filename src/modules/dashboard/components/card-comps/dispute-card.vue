<template>
  <label :for="label_id" class="dispute-card rounded-8 border-grey-100 w-100">
    <!-- SELECT AREA -->
    <div class="select-area">
      <input type="radio" :id="label_id" name="dispute" class="mgr-8" />
      <div class="text grey-900 tertiary-2-text">{{ label_text }}</div>
    </div>

    <div class="helper-icon pointer">
      <div class="icon icon-question-circle green-500"></div>
    </div>

    <!-- BOTTOM TOOLTIP -->
    <div class="tooltip-wrapper wt-100 position-absolute">
      <div class="tooltip-data wt-100 grey-10-bg rounded-8">
        Information to be passed to the audience
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: "DisputeCard",

  props: {
    label_id: {
      type: String,
    },

    label_text: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-card {
  @include flex-row-between-nowrap;
  padding: toRem(8) toRem(16);
  @include transition(0.4s);
  position: relative;
  cursor: pointer;

  &:hover {
    border: toRem(1) solid getColor("green-200");
    background: getColor("green-10");
  }

  @include breakpoint-down(sm) {
    padding: toRem(8) toRem(13);
  }

  .select-area {
    @include flex-row-start-nowrap;
    align-items: center;
  }

  .tooltip-wrapper {
    left: 0;
    top: 40%;
    visibility: hidden;

    .tooltip-data {
      position: relative;
      border: toRem(1) solid getColor("grey-100");
      @include generate-font-type("tertiary-2");
      padding: toRem(14) toRem(16);

      &:before {
        content: "";
        position: absolute;
        top: toRem(-9);
        right: toRem(17);
        @include draw-shape(18);
        transform: rotate(45deg);
        background: getColor("grey-10");
        border-top: toRem(1) solid getColor("grey-100");
        border-left: toRem(1) solid getColor("grey-100");
      }
    }
  }

  .helper-icon {
    .icon {
      font-size: toRem(21.5);
      pointer-events: none;
    }

    &:hover ~ .tooltip-wrapper {
      top: 117%;
      visibility: visible;
    }
  }
}
</style>