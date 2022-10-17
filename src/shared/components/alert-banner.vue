<template>
  <div class="alert-banner smooth-transition neutral-10" :class="renderAlertBg">
    <!-- STATUS TEXT -->
    <div class="status-text secondary-1-text mgb-4 text-capitalize">
      {{ status }}
    </div>

    <!-- MESSAGE TEXT -->
    <div class="message-text tertiary-1-text">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertBanner",

  props: {
    message: String,
    status: String, //Error or Success
  },

  computed: {
    renderAlertBg() {
      return this.status === "success" ? "green-600-bg" : "red-500-bg";
    },
  },

  mounted() {
    setTimeout(() => this.dismissAlert(), 4500);
  },

  methods: {
    dismissAlert() {
      this.$bus.$emit("toggle-alert-banner", {});
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-banner {
  padding: toRem(16);
  width: toRem(410);
  position: fixed;
  top: toRem(20);
  right: toRem(15);
  z-index: 999;
  animation: slide-right 0.75s linear forwards;

  @include breakpoint-down(xs) {
    width: 92%;
  }

  .status-text {
    font-size: toRem(15.5);
  }

  .message-text {
    font-size: toRem(14.75);
  }
}
</style>