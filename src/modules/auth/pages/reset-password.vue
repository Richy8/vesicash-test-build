<template>
  <AuthWrapper title_text="Enter new password">
    <!-- AUTH PAGE -->
    <div class="auth-page">
      <!-- PASSWORD INPUT -->
      <div class="form-group mgb-13">
        <div class="form-label" for="password">Password</div>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter new password"
        />
      </div>

      <!-- CONFIRM PASSWORD INPUT -->
      <div class="form-group mgb-13">
        <div class="form-label" for="confirmPassword">Confirm Password</div>
        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          placeholder="Confirm new password"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10">
        <button
          class="btn btn-primary btn-md w-100"
          @click="handlePasswordReset"
        >
          Reset Password
        </button>
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "ResetPassword",

  metaInfo: {
    title: "ResetPassword",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
  },

  methods: {
    handlePasswordReset() {
      this.$router.push({ name: "VesicashSuccessfulPasswordReset" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>