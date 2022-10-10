<template>
  <div class="modal-list-item">
    <div class="item tertiary-2-text grey-600">{{ title }}</div>
    <div class="value secondary-2-text grey-900">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "ModalListItem",

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-list-item {
  border-bottom: toRem(0.5) solid getColor("grey-100");
  border-top: toRem(0.5) solid getColor("grey-100");
  @include flex-row-between-nowrap;
  padding: toRem(14) toRem(4);

  .item {
    text-align: left;
    width: 44%;
  }

  .value {
    text-align: right;
    width: 44%;
  }
}
</style>