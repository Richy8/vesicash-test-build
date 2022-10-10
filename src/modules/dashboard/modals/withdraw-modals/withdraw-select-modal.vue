<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Select wallet</div>
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
            label_text="Dollar wallet ($100,240)"
          />
        </div>

        <!-- NAIRA WITHDRAWAL -->
        <div>
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard2"
            label_text="Naira wallet (N6,400,000)"
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
  name: "WithdrawSelectModal",

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

  data: () => ({}),

  methods: {
    handleWalletSelection() {
      this.$emit("walletSelected");
    },
  },
};
</script>

<style>
</style>