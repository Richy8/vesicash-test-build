<template>
  <div class="alert-wrapper">
    <span class="icon icon-info green-600 tertiary-1-text"></span>
    <div
      class="tertiary-1-text grey-900"
    >Please ensure the date of birth you are providing is equal to the date of birth on your BVN(Bank verification number)</div>
  </div>
</template>

<script>
export default {
  name: "InfoAlertCard",
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
  padding: toRem(16);
  background: getColor("grey-10");
  border-radius: toRem(8);
  @include flex-row-start-nowrap;
  align-items: flex-start;
  gap: toRem(8);

  .icon-info {
    font-size: toRem(18);
  }

  .icon-wrapper {
    @include draw-shape(24);
    @include flex-column-center;
    border-radius: 50%;
  }
}
</style>