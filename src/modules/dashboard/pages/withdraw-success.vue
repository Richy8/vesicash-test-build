<template>
  <AuthWrapper title_text="">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-page-success">
      <SuccessIcon backgroundColor="#043B56" />

      <!-- TITLE TEXT -->
      <div class="title-text primary-1-text grey-900 mgb-8 text-center">
        Congratulations
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text tertiary-2-text grey-600 text-center">
        Your withdrawal of N150,000 has been sent to your bank account, Please
        check your bank account for details
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10 wt-100">
        <router-link to="/dashboard" class="btn btn-primary btn-md wt-100"
          >Go to Dashboard</router-link
        >
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import SuccessIcon from "@/shared/components/icon-comps/success-icon";

export default {
  name: "WithdrawSuccessful",

  metaInfo: {
    title: "Withdrawal Successful",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    SuccessIcon,
  },
};
</script>

<style lang="scss" scoped>
.auth-page-success {
  @include flex-column-center;

  svg {
    @include draw-shape(120);
    margin-bottom: toRem(24);

    @include breakpoint-down(xs) {
      @include draw-shape(115);
    }
  }

  .description-text {
    @include breakpoint-down(xs) {
      font-size: toRem(13.75);
    }
  }
}
</style>