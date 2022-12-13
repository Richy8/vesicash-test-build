<template>
  <div>
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
            description: `Your payment of <b>${$route.query.fee}</b> has been made sucessfully, Please check your escrow account on your dashboard for the payment.`,
          }"
          />

          <SuccessItemCard
            :info="{
            icon: 'SuccessIcon',
            title: 'Users invited successfully',
            description: `${$route.query.parties} ${
              $route.query.parties === 'All' ? 'parties have' : 'has'
            } been invited sucessfully into transaction for ${
              $route.query.name
            }.`,
          }"
          />
        </div>

        <!-- BUTTON AREA -->
        <div class="btn-area mgt-30 mgb-10">
          <!-- <div class="btn btn-secondary btn-md mgb-24">Download Receipt</div> -->

          <a
            class="btn btn-primary btn-md"
            :href="$route.query.redirect"
            v-if="$route.query.redirect"
          >Continue transaction</a>

          <router-link v-else to="/dashboard" class="btn btn-primary btn-md">Go to Dashboard</router-link>
        </div>
      </div>
    </AuthWrapper>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_failed_modal">
        <FailedPaymentModal @confirmed="showSuccessState" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import FailedPaymentModal from "@/modules/transactions/modals/failed-payment-modal";

export default {
  name: "PaymentSuccessful",

  metaInfo: {
    title: "Payment Successful",
    titleTemplate: "%s - Vesicash",
  },

  mounted() {
    if (this.$route.query.reference) this.confirmPayment();
    else this.payment_confirmed = true;
  },

  data() {
    return {
      show_failed_modal: false,
      payment_confirmed: false,
    };
  },

  methods: {
    ...mapActions({
      confirmPaymentStatus: "transactions/confirmPaymentStatus",
    }),

    retryConfrimation() {
      this.confirmPayment();
    },

    async confirmPayment() {
      this.showPageLoader("Confirming payment");

      try {
        const response = await this.confirmPaymentStatus({
          reference: this.$route.query.reference,
          fund_wallet: true,
          headless: true,
        });

        this.hidePageLoader();

        if (response.code === 200) this.payment_confirmed = true;
        else {
          // this.pushToast(response.message || "Payment failed", "error");

          this.show_failed_modal = true;
        }
      } catch (error) {
        this.hidePageLoader();
        console.log("FAILED TO CONFIRM PAYMENT", error);
        // this.show_failed_modal = true;

        // this.pushToast(
        //   "Failed to verify payment. Reload to try again",
        //   "error"
        // );
      }
    },

    showSuccessState() {
      this.show_failed_modal = false;
      this.payment_confirmed = true;
    },
  },

  components: {
    FailedPaymentModal,
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