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
        ].innerHTML = `<div class="icon-dotted-roller gfont-17 mgr-10 animate"></div>${text}`;
      } else {
        this.$refs[ref].innerHTML = `${text}`;
        this.$refs[ref].disabled = false;
      }
    },

    // POP UP ALERT
    pushAlert(message, type) {
      this.$bus.$emit("show_response_alert", {
        message,
        type,
      });
    },
  },
};

export { MixinEvents };
