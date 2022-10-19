<template>
  <div class="modal-list-item">
    <template v-if="loading">
      <div class="skeleton-data skeleton-loader rounded-3"></div>
      <div class="skeleton-data skeleton-loader rounded-3"></div>
    </template>

    <template v-else>
      <div class="item tertiary-2-text grey-600 text-capitalize">
        {{ title }}
      </div>
      <div class="value secondary-2-text grey-900 text-wrap">{{ value }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ModalListItem",

  props: {
    title: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-list-item {
  border-bottom: toRem(0.5) solid rgba(getColor("grey-100"), 0.8);
  border-top: toRem(0.5) solid rgba(getColor("grey-100"), 0.8);
  @include flex-row-between-nowrap;
  padding: toRem(14) toRem(4);

  &:first-of-type {
    border-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
  }

  .item {
    text-align: left;
    width: 44%;
  }

  .value {
    text-align: right;
    width: 44%;
  }

  .skeleton-data {
    width: 40%;
    height: toRem(25);
  }
}
</style>