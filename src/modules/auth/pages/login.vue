<template>
  <AuthWrapper title_text="Login to your account">
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

      <!-- PASSWORD INPUT -->
      <div class="form-group">
        <div class="form-label" for="password">Password</div>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter password"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-35 mgb-10">
        <button class="btn btn-primary btn-md w-100">Login to account</button>
      </div>

      <!-- HELP BLOCK TEXT -->
      <div class="help-block text-center">
        Don’t have an account?
        <router-link to="/register-lander" class="fw-medium"
          >Register</router-link
        >
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "Login",

  metaInfo: {
    title: "Login",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
  },
};
</script>

<style lang="scss" scoped>
</style>