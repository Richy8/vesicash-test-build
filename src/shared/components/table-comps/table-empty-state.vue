<template>
  <div class="table-empty-state">
    <!-- MESSAGE TEXT -->
    <div class="message-text grey-600 tertiary-2-text text-center">
      {{ empty_message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TableEmptyState",

  props: {
    empty_message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.table-empty-state {
  @include flex-column-center;
  padding: toRem(30) 0;

  .message-text {
    width: 26%;

    @include breakpoint-down(lg) {
      width: 32%;
    }

    @include breakpoint-down(md) {
      width: 40%;
    }

    @include breakpoint-down(sm) {
      font-size: toRem(13.5);
      width: 60%;
    }

    @include breakpoint-down(xs) {
      font-size: toRem(13.5);
      width: 78%;
    }
  }
}
</style>