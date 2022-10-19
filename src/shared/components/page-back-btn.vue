<template>
  <div class="page-back-btn mgb-24">
    <button class="btn btn-secondary btn-md" @click="goToPreviousPage">
      <!-- BUTTON ICON WRAPPER -->
      <div class="icon-wrapper position-relative mgr-4">
        <div class="icon icon-caret-left grey-500"></div>
      </div>

      <!-- BUTTON TEXT -->
      <div class="text">Back</div>
    </button>
  </div>
</template>

<script>
export default {
  name: "PageBackBtn",

  props: {
    back_link: {
      type: String,
      default: "/dashboard",
    },

    history_mode: {
      type: Boolean,
      default: false,
    },

    custom_mode: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    // ===========================================
    // HANDLES BACK PAGE REDIRECTION WHICH
    // DEFAULTS TO DASHBOAD IF NOT PROVIDED
    // ===========================================
    goToPreviousPage() {
      if (this.custom_mode) this.$emit("clicked");
      else {
        if (this.history_mode) this.$router.go(-1);
        else this.$router.push({ path: this.back_link });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-back-btn {
  .btn {
    padding: toRem(8) toRem(17) toRem(8) toRem(13);

    .icon-wrapper {
      @include draw-shape(16);

      .icon {
        @include center-placement();
        font-size: toRem(22);
      }
    }
  }
}
</style>