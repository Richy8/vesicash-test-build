<template>
  <AuthWrapper title_text="">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-page-success">
      <WarningIcon />

      <!-- TITLE TEXT -->
      <div class="title-text primary-1-text grey-900 mgb-8 text-center">
        Wallet funding failed
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text tertiary-2-text grey-600 text-center">
        Your dollar wallet funding was unsuccessful, please try again.
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
import WarningIcon from "@/shared/components/icon-comps/warning-icon";

export default {
  name: "FundWalletError",

  metaInfo: {
    title: "Wallet Funding failed",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    WarningIcon,
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