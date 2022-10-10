<template>
  <div class="success-item-card"></div>
</template>

<script>
export default {
  name: "SuccessItemCard",
};
</script>

<style lang="scss" scoped>
.success-item-card {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(40);

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>