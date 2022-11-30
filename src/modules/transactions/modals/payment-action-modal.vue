<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :show_close_btn="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header"></template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-20">
        <!-- ICON WRAPPER -->
        <div class="icon-wrapper rounded-circle teal-50-bg mgt-10 mgb-24">
          <MoneyIcon fill />
        </div>

        <!-- TITLE TEXT -->
        <div class="title-text fw-600 grey-900 text-center h5-text mgb-8 w-100">
          Make Payment
        </div>

        <!-- DESCRIPTION TEXT -->
        <div class="description-text text-center tertiary-1-text">
          <!-- IF AMOUNT PAID IS 0 -->
          <template v-if="transaction.amount_paid === 0">
            <!-- IF OWNER OF TRANSACTION -->
            <template v-if="getTransactionInfo.is_owner">
              A payment of
              {{ transaction.total_amount }} for
              {{ transaction.title }}
              transaction, is currently pending.
            </template>

            <!-- IF NOT OWNER OF TRANSACTION -->
            <template v-else>
              {{ transaction.owner }} invited you to make a payment of
              {{ transaction.total_amount }} for
              {{ transaction.title }} transaction
            </template>
          </template>

          <template v-else>
            A complete payment for
            {{ transaction.title }} transaction of

            {{ transaction.total_amount.slice(0, 1)
            }}{{ $money.addComma(getTransactionInfo.balance_amount) }}

            is currently pending.
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100 mgb-4"
          @click="makePaymentForTransaction"
        >
          Make Payment
        </button>

        <button
          class="btn btn-secondary btn-md wt-100 mgt-18"
          v-if="!getTransactionInfo.is_owner"
        >
          Reject
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import MoneyIcon from "@/shared/components/icon-comps/money-icon";
import ModalCover from "@/shared/components/modal-cover";

export default {
  name: "PaymentActionModal",

  components: {
    ModalCover,
    MoneyIcon,
  },

  props: {
    transaction: {
      type: Object,
      default: () => ({
        owner: "",
        title: "",
        amount_paid: "",
        total_amount: "",
      }),
    },
  },

  computed: {
    getTransactionInfo() {
      let is_owner = this.getUser.email === this.transaction.owner;

      let total_amount = Number(
        this.transaction.total_amount.slice(1)?.split(",").join("")
      );

      let balance_amount = total_amount - this.transaction.amount_paid;

      return {
        is_owner,
        balance_amount,
      };
    },
  },

  methods: {
    makePaymentForTransaction() {
      // CHECK IF USER HAS ALREADY ACCEPTED TRANSACTION
      // TOGGLE MAKE PAYMENT OPTIONS
      this.$emit("togglePaymentOptions");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  @include flex-column-center;

  .icon-wrapper {
    @include flex-column-center;
    @include draw-shape(115);
    position: relative;

    svg {
      @include draw-shape(64);
    }
  }

  .description-text {
    @include font-height(14.75, 24);
    width: 90%;
  }
}
</style>