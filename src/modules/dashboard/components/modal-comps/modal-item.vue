<template>
  <div class="modal-item">
    <!-- TITLE TEXT -->
    <div class="title-text grey-600 tertiary-3-text text-uppercase mgb-8">
      {{ title }}
    </div>

    <!-- VALUE TEXT -->
    <div class="value-text grey-900 secondary-2-text">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "ModalItem",

  props: {
    title: {
      type: [String, Number],
      required: true,
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-item {
  margin-bottom: toRem(32);
  width: 32%;

  @include breakpoint-down(sm) {
    width: 48%;
  }
}
</style>