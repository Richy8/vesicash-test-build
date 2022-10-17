// ==================================================
// A SIMPLE APPLICATION LEVEL MIXIN TO HANDLE
// BUTTON CLICKS AND PUSH ALERTS MESSAGES
// ==================================================

const MixinEvents = {
  methods: {
    handleClick(ref, text = "Please wait...", processing = true) {
      if (processing) {
        this.$refs[ref].disabled = true;
        this.$refs[
          ref
        ].innerHTML = `<div class="icon-spinner f-size-19 mgr-10 animate"></div>${text}`;
      } else {
        this.$refs[ref].innerHTML = `${text}`;
        this.$refs[ref].disabled = false;
      }
    },

    // ==========================================
    // MIXIN TO HANDLE TOAST NOTIFICATION
    // ==========================================
    pushToast(message, status) {
      this.$bus.$emit("toggle-alert-banner", {
        message,
        status,
      });
    },

    // ==========================================
    // MIXIN TO HANDLE PAGE LOADER INITIATION
    // ==========================================
    togglePageLoader() {
      this.$bus.$emit("toggle-page-loader");
    },
  },
};

export { MixinEvents };
