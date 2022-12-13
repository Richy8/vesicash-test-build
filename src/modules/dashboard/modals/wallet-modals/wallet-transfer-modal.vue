<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
    :show_close_btn="false"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <!-- BACK BUTTON -->
        <PageBackBtn custom_mode @clicked="$emit('goBackOptionSelection')" />

        <div class="modal-cover-title h5-text mgt--4">Transfer from wallet</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-24">
        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-24">
          <SumTotalDisplayCard
            :total_text="getBalanceTitle"
            :total_value="getWalletBalance"
            use_custom_style
          />
        </div>

        <!-- AMOUNT TO WITHDRAW -->
        <div class="form-group">
          <BasicInput
            label_title="Amount to transfer"
            label_id="amount"
            :input_value="form.amount"
            input_type="number"
            is_required
            placeholder="0.00"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            :currency="withdrawalCurrency"
            class="form-prefix-right"
            @getInputState="updateFormState($event, 'amount')"
            :error_handler="{
              type: 'required',
              message: 'Enter an amount',
            }"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="$emit('transfer',form.amount)"
          :disabled="continueDisabled"
          ref="continue"
        >Continue</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";
import FormHelper from "@/modules/auth/mixins/auth-helper";

export default {
  name: "WalletTransferModal",

  mixins: [FormHelper],

  components: {
    ModalCover,
    PageBackBtn,

    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/sum-total-display-card"
      ),

    BasicInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/form-comps/basic-input"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },

    currency: {
      type: String,
      default: "naira",
    },
  },

  mounted() {
    this.fetchUserWalletBalance();
  },

  computed: {
    ...mapGetters({
      getWalletType: "dashboard/getWalletType",
      getNairaBalance: "dashboard/getNairaBalance",
      getDollarBalance: "dashboard/getDollarBalance",
    }),

    isNaira() {
      return ["naira", "NGN", "ng", "₦"].includes(this.currency);
    },

    withdrawalCurrency() {
      // const currency = this.getWalletType === "naira" ? "NGN" : "USD";
      const currency = this.isNaira ? "NGN" : "USD";
      return `${currency} (${this.$money.getSign(this.getWalletType)})`;
    },

    getBalanceTitle() {
      // this.getWalletType === "naira"
      return this.isNaira ? "Naira balance" : "Dollar balance";
    },

    getWalletBalance() {
      const balance = this.isNaira
        ? this.getNairaBalance
        : this.getDollarBalance;

      return `${this.$money.getSign(this.getWalletType)}${this.$money.addComma(
        balance
      )}`;
    },

    continueDisabled() {
      if (!this.form.amount) return true;
      return false;
    },
  },

  data: () => ({
    amount: "",

    form: {
      amount: "",
    },

    validity: {
      form: true,
    },

    accounts: [],
  }),

  methods: {
    ...mapActions({
      fetchWalletBalance: "dashboard/getWalletBalance",
    }),

    fetchUserWalletBalance() {
      let request_payload = {
        account_id: this.getAccountId,
      };

      this.fetchWalletBalance(request_payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-data {
  max-height: 60vh;
  overflow-y: auto;
  height: toRem(20);
  width: 100%;
}

.account-holder-section {
  overflow: auto;
  height: auto;
  max-height: 27vh;

  &::-webkit-scrollbar {
    width: toRem(3.5);
  }

  &::-webkit-scrollbar-track {
    border-radius: toRem(5);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: toRem(5);
    background: getColor("green-100");
  }
}
</style>