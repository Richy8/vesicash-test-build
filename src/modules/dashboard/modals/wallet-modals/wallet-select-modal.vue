<template>
  <ModalCover
    class="wallet-select-modal"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Select wallet to fund</div>

        <div class="modal-cover-meta">Please select the wallet you wish to fund</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb--10 mgb-hack">
        <!-- DOLLAR FUNDING -->
        <div class="mgb-20" v-if="false">
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard1"
            label_text="Fund dollar wallet"
            @clicked="selected_wallet = 'dollar'"
          />
        </div>

        <!-- NAIRA FUNDING -->
        <div>
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard2"
            label_text="Fund naira wallet"
            :tooltip_text="tool_tip"
            @clicked="selected_wallet = 'naira'"
            :is_checked="selected_wallet === 'naira' ? true : false"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100 mgt-50"
          @click="handleWalletSelection"
          :disabled="selected_wallet.length ? false : true"
        >Continue</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";

export default {
  name: "WalletSelectModal",

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

  data: () => ({
    selected_wallet: "naira",
    // tool_tip:
    //   "Fund wallet Charges <br> ₦500 for ₦0 - ₦500,000 <br> ₦1,000 for ₦500,001 - ₦1,000,000  <br> ₦2,000 (capped) for ₦1,000,001 and above",
    tool_tip:
      "<table class='table f-size-13 grey-700'><thead><tr><td>Fund amount range</td><td>Charges</td></tr></thead><tbody><tr><td>₦1,000 - ₦500,000</td><td>₦500</td></tr><tr><td>₦500,001 - ₦1,000,000</td><td>₦1,000</td></tr><tr><td>₦1,000,001 and above</td><td>₦2,000 (capped)</td></tr></tbody></table> Minimum wallet funding amount is <b>₦1,000</b>. Do not send below this amount.",
  }),

  methods: {
    handleWalletSelection() {
      this.$emit("walletSelected", this.selected_wallet);
    },
  },
};
</script>

<style lang="scss" scoped>
.mgb-hack {
  margin-bottom: toRem(-125) !important;
}
</style>

<style lang="scss">
// .wallet-select-modal {
//   .modal-cover-body {
//     overflow-y: visible;
//   }
// }
</style>