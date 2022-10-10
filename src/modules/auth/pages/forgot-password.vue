<template>
  <AuthWrapper
    title_text="Forgot password"
    meta_text="Please enter your registered email address  <br> that is associated with your account. "
  >
    <!-- AUTH PAGE -->
    <div class="auth-page">
      <!-- EMAIL ADDRESS INPUT -->
      <div class="form-group">
        <div class="form-label" for="emailAddress">Email address</div>
        <input
          type="email"
          id="emailAddress"
          class="form-control"
          placeholder="Enter email address"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10">
        <button
          class="btn btn-primary btn-md w-100"
          @click="handleForgotPassword"
        >
          Continue
        </button>
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "ForgotPassword",

  metaInfo: {
    title: "Forgot Password",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
  },

  methods: {
    handleForgotPassword() {
      this.$router.push({ name: "VesicashResetPassword" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>