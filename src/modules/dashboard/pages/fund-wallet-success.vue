<template>
  <AuthWrapper title_text="">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-page-success">
      <WarningIcon v-if="$route.query.currency === 'NGN'" />
      <SuccessIcon backgroundColor="#043B56" v-else />

      <!-- TITLE TEXT -->
      <div class="title-text primary-1-text grey-900 mgb-8 text-center">
        {{ getTitle }}
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text tertiary-2-text grey-600 text-center">
        {{ getDescription }}
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
import WarningIcon from "@/shared/components/icon-comps/warning-icon";

export default {
  name: "FundWalletSuccess",

  metaInfo: {
    title: "Wallet Funded Successfully",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    SuccessIcon,
    WarningIcon,
  },

  computed: {
    getTitle() {
      return this.$route.query.currency === "NGN"
        ? "Confirming your payment"
        : "Payment confirmed";
    },

    getDescription() {
      return this.$route.query.currency === "NGN"
        ? `Please wait while we confirm the payment that you have made, if your payment is sucessful, it will reflect on your dashboard`
        : `Your dollar wallet funding was completed successfully`;
    },
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
    width: 90%;

    @include breakpoint-down(xs) {
      font-size: toRem(13.75);
    }
  }
}
</style>