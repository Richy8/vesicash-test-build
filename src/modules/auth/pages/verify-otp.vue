<template>
  <AuthWrapper
    title_text="Enter OTP code"
    meta_text="Enter the OTP code we sent to <br> <span class='grey-800'>Ola**@gmail.com</span>"
  >
    <!-- AUTH PAGE -->
    <div class="auth-page">
      <!-- OTP ENTRY INPUTS -->
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          v-model="otp_one"
          ref="otpOne"
        />
        <input
          type="number"
          class="form-control"
          v-model="otp_two"
          ref="otpTwo"
          :disabled="checkOTPOne"
        />
        <input
          type="number"
          class="form-control"
          v-model="otp_three"
          ref="otpThree"
          :disabled="checkOTPTwo"
        />
        <input
          type="number"
          class="form-control"
          v-model="otp_four"
          ref="otpFour"
          :disabled="checkOTPThree"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-35 mgb-10">
        <button class="btn btn-primary btn-md w-100">Verify OTP code</button>
      </div>

      <!-- HELP BLOCK TEXT -->
      <div class="help-block text-center grey-600 pointer">Resend OTP code</div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "VerifyOTP",

  metaInfo: {
    title: "Verify OTP",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
  },

  computed: {
    checkOTPOne() {
      return this.otp_one.length === 1 ? false : true;
    },

    checkOTPTwo() {
      return this.otp_two.length === 1 ? false : true;
    },

    checkOTPThree() {
      return this.otp_three.length === 1 ? false : true;
    },
  },

  watch: {
    otp_one: {
      handler(value) {
        if (value.length === 1) this.$nextTick(() => this.$refs.otpTwo.focus());
        else if (value.length > 1) this.checkPastedContent(value);
      },
    },

    otp_two: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.otpThree.focus());
      },
    },

    otp_three: {
      handler(value) {
        if (value.length === 1)
          this.$nextTick(() => this.$refs.otpFour.focus());
      },
    },

    otp_four: {
      handler(value) {
        if (value.length === 1) {
          this.$nextTick(() => this.$refs.otpFour.blur());
          this.verifyUserAccount();
        }
      },
    },
  },

  data: () => ({
    otp_one: "",
    otp_two: "",
    otp_three: "",
    otp_four: "",
  }),

  mounted() {
    // ==================================================
    // SET FIRST INPUT TO FOCUS STATE ON INITIAL MOUNT
    // ==================================================
    this.$nextTick(() => this.$refs?.otpOne?.focus());
  },

  methods: {
    // ========================================================
    // CHECK IF A VALUE WAS PASTED INTO THE FIRST INPUT FIELD
    // ========================================================
    checkPastedContent(value) {
      this.$nextTick(() => {
        let splitted = value.split("");

        this.otp_one = splitted[0] || "";
        this.otp_two = splitted[1] || "";
        this.otp_three = splitted[2] || "";
        this.otp_four = splitted[3] || "";
      });
    },

    // ===================================
    // VERIFY USER ACCOUNT OTP ENTRY
    // ===================================
    verifyUserAccount() {
      setTimeout(() => this.togglePageLoader(), 400);
      setTimeout(() => this.$router.push({ name: "VesicashDashboard" }), 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-page {
  .form-group {
    @include flex-row-center-nowrap;

    .form-control {
      padding: toRem(8) toRem(10);
      @include draw-shape(36);
      margin: 0 toRem(12);
      text-align: center;
    }
  }

  .help-block {
    @include transition(0.4s);

    &:hover {
      color: getColor("grey-800");
    }
  }
}
</style>