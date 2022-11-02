<template>
  <ModalCover
    class="withdraw-select-modal"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Select wallet to withdraw</div>

        <div class="modal-cover-meta">Please select the wallet you wish to withdraw</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb--10 mgb-hack">
        <!-- DOLLAR WITHDRAWAL -->
        <div class="mgb-20" v-if="false">
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard1"
            :label_text="dollarBalanceText"
            @clicked="updateWalletSelection('dollar')"
            :is_checked="wallet_type === 'dollar'"
          />
        </div>

        <!-- NAIRA WITHDRAWAL -->
        <div>
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard2"
            :label_text="nairaBalanceText"
            :tooltip_text="tool_tip"
            @clicked="updateWalletSelection('naira')"
            :is_checked="wallet_type === 'naira'"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <!-- The class .raise-40 will be removed when dollar withdrawal is back -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="handleWalletSelection"
          :disabled="!wallet_type"
        >Continue</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ModalCover from "@/shared/components/modal-cover";

export default {
  name: "WithdrawSelectModal",

  components: {
    ModalCover,
    RadioSelectCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/radio-select-card"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
  },

  computed: {
    ...mapGetters({
      getNairaBalance: "dashboard/getNairaBalance",
      getDollarBalance: "dashboard/getDollarBalance",
    }),

    nairaBalanceText() {
      return `Naira wallet (&#8358;${this.$money.addComma(
        this.getNairaBalance
      )})`;
    },

    dollarBalanceText() {
      return `Dollar wallet (&#36;${this.$money.addComma(
        this.getDollarBalance
      )})`;
    },
  },

  data: () => ({
    wallet_type: "naira",
    // tool_tip:
    //   "Wallet Withdrawal Fees <br> ₦500 for ₦0 - ₦500,000 <br> ₦1,000 for #500,001 - ₦1,000,000  <br> ₦2,000 (capped) for ₦1,000,001 and above",
    tool_tip: "<b>#50.00</b> will be charged for this withdrawal.",
  }),

  methods: {
    ...mapMutations({ setWalletType: "dashboard/SET_WALLET_TYPE" }),

    updateWalletSelection(type) {
      this.wallet_type = type;
      this.setWalletType(type);
    },

    handleWalletSelection() {
      this.$emit("walletSelected");
    },
  },
};
</script>
<style  lang="scss" scoped>
.raise-40 {
  margin-top: -40px;
}

.mgb-hack {
  margin-bottom: toRem(-80) !important;
}
</style>

// <style lang="scss">
// .withdraw-select-modal {
//   .modal-cover-body {
//     overflow-y: visible;
//   }
// }
