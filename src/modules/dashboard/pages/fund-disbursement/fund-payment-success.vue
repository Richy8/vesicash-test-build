<template>
  <AuthWrapper title_text="">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-payment-success">
      <!-- TITLE TEXT -->
      <div class="title-text text-center teal-900 h4-text mgb-38 mgt--15">
        Congratulations
      </div>

      <!-- BODY DATA -->
      <div class="body-data">
        <SuccessItemCard
          :info="{
            icon: 'SuccessIcon',
            title: 'Payment made successfully',
            description:
              'Your payment of $50,000 has been made sucessfully, Please check your escrow account on your dashboard for the payment.',
          }"
        />

        <SuccessItemCard
          :info="{
            icon: 'SuccessIcon',
            title: 'Users invited successfully',
            description:
              'Awotundebangalee@gmail.com has been invited sucessfully into Payment for landing pages.',
          }"
        />
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

export default {
  name: "PaymentSuccessful",

  metaInfo: {
    title: "Payment Successful",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    SuccessItemCard: () =>
      import(
        /* webpackChunkName: 'dashboard-module' */ "@/modules/dashboard/components/card-comps/success-item-card"
      ),
  },
};
</script>

<style lang="scss" scoped>
.auth-payment-success {
  width: toRem(520) !important;

  .title-text {
    font-size: toRem(23);
  }
}
</style>