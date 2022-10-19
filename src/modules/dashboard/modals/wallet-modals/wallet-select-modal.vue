<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Select wallet to fund</div>

        <div class="modal-cover-meta">
          Please select the wallet you wish to fund
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb--10">
        <!-- DOLLAR WITHDRAWAL -->
        <div class="mgb-20">
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard1"
            label_text="Fund dollar wallet"
            @clicked="selected_wallet = 'dollar'"
          />
        </div>

        <!-- NAIRA WITHDRAWAL -->
        <div>
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard2"
            label_text="Fund naira wallet"
            @clicked="selected_wallet = 'naira'"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="handleWalletSelection"
          :disabled="selected_wallet.length ? false : true"
        >
          Continue
        </button>
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
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/radio-select-card"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
  },

  data: () => ({
    selected_wallet: "",
  }),

  methods: {
    handleWalletSelection() {
      this.$emit("walletSelected", this.selected_wallet);
    },
  },
};
</script>

<style>
</style>