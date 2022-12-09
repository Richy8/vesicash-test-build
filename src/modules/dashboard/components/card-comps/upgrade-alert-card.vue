<template>
  <div class="alert-card-wrapper">
    <div class="icon icon-info yellow-500 mgr-8"></div>
    <div>
      <div class="secondary-1-text grey-900"></div>
      <div
        class="tertiary-2-text grey-600 mgb-8"
      >Your account is limited, Please upgrade your account to enjoy vesicash without limits</div>

      <router-link
        class="btn btn-sm btn-secondary d-inline-block"
        to="/settings/profile"
      >Upgrade Account</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpgradeAlertCard",
};
</script>

<style lang="scss" scoped>
.alert-card-wrapper {
  padding: toRem(16);
  border-radius: toRem(8);
  background: getColor("yellow-50");
  @include flex-row-start-start-nowrap;

  .icon-wrapper {
    @include draw-shape(24);
    @include flex-column-center;
    border-radius: 50%;
    background: getColor("yellow-500");
  }

  .icon {
    font-size: toRem(18);
  }
}
</style>