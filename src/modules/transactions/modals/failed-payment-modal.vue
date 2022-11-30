<template>
  <ModalCover :modal_style="{ size: 'modal-xs' }" :show_close_btn="false">
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="cross-wrapper mgb-24">
          <CrossIcon />
        </div>

        <div class="h4-text text-center mgb-8">Failed transaction</div>
        <div class="tertiary-1-text text-center grey-900 mgb-40">
          Your transaction of
          <b>{{$route.query.fee}}</b> could not be confirmed, please confirm again.
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-secondary btn-md wt-100 mgb-24"
          ref="confirm"
          @click="confirmPayment"
        >Confirm again</button>

        <router-link class="btn btn-primary btn-md wt-100" to="/dashboard">Go to dashboard</router-link>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import CrossIcon from "@/shared/components/icon-comps/cross-icon";

export default {
  name: "FailedPaymentModal",

  components: {
    ModalCover,
    CrossIcon,
  },

  props: {},

  data() {
    return {
      name: "",
    };
  },

  methods: {
    ...mapActions({
      confirmPaymentStatus: "transactions/confirmPaymentStatus",
    }),

    async confirmPayment() {
      this.handleClick("confirm");

      try {
        const response = await this.confirmPaymentStatus({
          reference: this.$route.query.reference,
          fund_wallet: true,
          headless: true,
        });

        this.handleClick("confirm", "Confirm again", false);

        if (response.code === 200) this.$emit("confirmed");
        else {
          this.pushToast(response.message || "Payment failed", "error");
        }
      } catch (error) {
        this.handleClick("confirm", "Confirm again", false);
        console.log("FAILED TO CONFIRM PAYMENT", error);

        this.pushToast(
          "Failed to verify payment. Reload to try again",
          "error"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cross-wrapper {
  @include draw-shape(120);
  @include flex-column-center;
  border-radius: 50%;
  background: getColor("red-50");
  margin: auto;
}
</style>