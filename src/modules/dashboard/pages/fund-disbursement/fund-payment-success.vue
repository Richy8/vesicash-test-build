<template>
  <AuthWrapper title_text="">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-payment-success">
      <!-- TITLE TEXT -->
      <div class="title-text text-center teal-900 h4-text mgb-38 mgt--15">
        Congratulations
      </div>

      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae omnis
      illum quaerat earum recusandae quas voluptate laboriosam corrupti, culpa
      nostrum accusantium eligendi quidem similique eius ipsam neque sapiente
      ratione odio ut magni iure dolores dolore! Eos inventore quasi quo quidem
      placeat, eveniet maxime harum non voluptatem at, fugit quibusdam! Quasi
      nesciunt sapiente doloribus ipsa ad illum molestiae dolorum at odit

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
  name: "PaymentSuccessful",

  metaInfo: {
    title: "Payment Successful",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    SuccessIcon,
  },
};
</script>

<style lang="scss" scoped>
.auth-payment-success {
  width: toRem(420) !important;

  .title-text {
    font-size: toRem(23);
  }
}
</style>