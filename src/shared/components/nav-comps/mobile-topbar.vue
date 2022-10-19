<template>
  <div class="mobile-topbar neutral-10-bg w-100 index-9">
    <!-- HAMBURGER ICON -->
    <div
      class="icon icon-hamburger grey-500 pointer"
      @click="toggleSidebar"
    ></div>

    <!-- TITLE TEXT -->
    <div class="title-text primary-1-text grey-900">Dashboard</div>
  </div>
</template>

<script>
export default {
  name: "mobileTopbar",

  methods: {
    toggleSidebar() {
      this.$bus.$emit("show-sidebar");
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-topbar {
  border-bottom: toRem(0.5) solid getColor("grey-100");
  padding: toRem(16) toRem(32);
  position: fixed;
  display: none;

  @include breakpoint-down(lg) {
    @include flex-row-start-nowrap;
    padding: toRem(16) toRem(24);
  }

  @include breakpoint-down(sm) {
    padding: toRem(16);
  }

  .icon {
    margin-right: toRem(24);
    font-size: toRem(25);

    @include breakpoint-down(sm) {
      margin-right: toRem(22);
    }
  }
}
</style>