<template>
  <AuthWrapper title_text v-if="payment_confirmed">
    <!-- AUTH PAGE -->
    <div class="auth-page auth-payment-success">
      <!-- TITLE TEXT -->
      <div class="title-text text-center teal-900 h4-text mgb-38 mgt--15">Congratulations</div>

      <!-- BODY DATA -->
      <div class="body-data">
        <SuccessItemCard
          :info="{
            icon: 'SuccessIcon',
            title: 'Payment made successfully',
            description:
              `Your payment of ${$route.query.fee} has been made sucessfully, Please check your escrow account on your dashboard for the payment.`,
          }"
        />

        <SuccessItemCard
          :info="{
            icon: 'SuccessIcon',
            title: 'Users invited successfully',
            description:
              `${$route.query.parties} ${$route.query.parties==='all' ? 'have':'has'} been invited sucessfully into payment for ${$route.query.name}.`,
          }"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10">
        <!-- <div class="btn btn-secondary btn-md mgb-24">Download Receipt</div> -->

        <router-link to="/dashboard" class="btn btn-primary btn-md">Go to Dashboard</router-link>
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import { mapActions } from "vuex";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "PaymentSuccessful",

  metaInfo: {
    title: "Payment Successful",
    titleTemplate: "%s - Vesicash",
  },

  mounted() {
    this.confirmPayment();
  },

  data() {
    return {
      payment_confirmed: false,
    };
  },

  methods: {
    ...mapActions({
      confirmPaymentStatus: "transactions/confirmPaymentStatus",
    }),

    async confirmPayment() {
      this.togglePageLoader("Confirming payment");

      try {
        const response = await this.confirmPaymentStatus({
          reference: this.$route.query.reference,
          headless: true,
        });

        this.togglePageLoader("");

        if (response.code === 200) this.payment_confirmed = true;
        else {
          this.pushToast(response.message || "Payment failed", "error");

          // setTimeout(() => {
          //   this.$router.push("/dashboard");
          // }, 1500);
        }
      } catch (error) {
        this.togglePageLoader("");
        console.log("FAILED TO CONFIRM PAYMENT", error);

        this.pushToast("Payment failed", "error");
        // setTimeout(() => {
        //   this.$router.push("/dashboard");
        // }, 1500);
      }
    },
  },

  components: {
    AuthWrapper,
    SuccessItemCard: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/card-comps/success-item-card"
      ),
  },
};
</script>

<style lang="scss" scoped>
.auth-payment-success {
  width: toRem(520) !important;

  @include breakpoint-down(md) {
    width: toRem(480) !important;
  }

  @include breakpoint-down(sm) {
    width: 100% !important;
  }

  .title-text {
    font-size: toRem(23);

    @include breakpoint-down(xs) {
      font-size: toRem(22);
    }
  }
}
</style>