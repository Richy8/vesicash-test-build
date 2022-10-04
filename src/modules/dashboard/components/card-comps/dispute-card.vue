<template>
  <label :for="label_id" class="dispute-card rounded-8 border-grey-100 w-100">
    <!-- SELECT AREA -->
    <div class="select-area">
      <input type="radio" :id="label_id" name="dispute" class="mgr-8" />
      <div class="text grey-900 tertiary-2-text">Vesicash handles dispute</div>
    </div>

    <div class="helper-icon"></div>
  </label>
</template>

<script>
export default {
  name: "DisputeCard",

  props: {
    label_id: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-card {
  padding: toRem(8) toRem(16);
  cursor: pointer;

  @include breakpoint-down(sm) {
    padding: toRem(8) toRem(13);
  }

  .select-area {
    @include flex-row-start-nowrap;
    align-items: center;
  }
}
</style>