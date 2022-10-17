<template>
  <!-- AUTH REGISTER LANDER PAGE -->
  <AuthWrapper
    title_text="Register an account"
    meta_text="Select an account you wish to register"
  >
    <div class="auth-lander-page mgt-16 mgb-8">
      <OnboardingCard
        v-for="(account, index) in onboarding_accounts"
        :key="index"
        :account="account"
        :index="index"
        @select-onboarding-card="selectOnboardingCard"
      />
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import OnboardingCard from "@/modules/auth/components/onboarding-card";

export default {
  name: "RegisterLander",

  metaInfo: {
    title: "Register Lander",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    OnboardingCard,
  },

  data: () => ({
    //=========================================
    // AVAILABLE ONBOARDING USER ACCOUNTS
    //=========================================
    onboarding_accounts: [
      {
        title: "Personal account",
        description:
          "Suitable for personal purposes and to  perfrom some transcations",
        icon: "UserIcon",
        link: "/register/individual",
        selected: false,
      },
      {
        title: "Business account",
        description:
          "Suitable for people that have businesses and want to perform escrow duties",
        icon: "BusinessIcon",
        link: "/register/business",
        selected: false,
      },
    ],
  }),

  methods: {
    //=================================================
    // TOGGLE BETWEEN ONBOARDING ACCOUNT SELECTIONS
    //=================================================
    selectOnboardingCard($event) {
      this.onboarding_accounts.map((account) => (account.selected = false));
      this.onboarding_accounts[$event].selected = true;

      // TRANSITION TO REGISTER PAGE
      setTimeout(
        () => this.$router.push(this.onboarding_accounts[$event].link),
        700
      );
    },
  },
};
</script>

<style lang="scss" scoped>
// ================================================
// CREATED A MIXIN TO AVOID REPEATING CODE LINES
@mixin handle-extra-small-screen-view {
  @include flex-column-start-center;
  padding: 0;
  width: 100%;
}

@mixin handle-base-screen-view {
  @include flex-row-between-nowrap;
  padding: 0 toRem(25);
  width: toRem(560);
}
// ================================================

.auth-lander-page {
  @include handle-base-screen-view();

  @include breakpoint-down(xxs) {
    @include handle-extra-small-screen-view();
  }

  @include breakpoint-up(xxs) {
    @include handle-extra-small-screen-view();
  }

  @include breakpoint-up(sm) {
    width: toRem(362);
  }

  @include breakpoint-up(lg) {
    @include handle-base-screen-view();
  }
}
</style>