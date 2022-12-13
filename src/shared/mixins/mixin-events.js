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
    togglePageLoader(message = "") {
      this.$bus.$emit("toggle-page-loader", message);
    },

    showPageLoader(message = "") {
      this.$bus.$emit("show-page-loader", message);
    },

    hidePageLoader() {
      this.$bus.$emit("hide-page-loader");
    },

    // ===========================================
    // UPDATE USER INPUT FORM AND VALIDITY STATE
    // ===========================================
    updateFormState(data, type) {
      this.form[type] = data?.value;
      this?.validity ? (this.validity[type] = data?.validity) : null;
    },
  },
};

export { MixinEvents };
