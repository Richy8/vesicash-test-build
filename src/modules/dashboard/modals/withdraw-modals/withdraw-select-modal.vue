<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-xs' }">
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
            :label_text="dollarBalanceText"
            @clicked="updateWalletSelection('dollar')"
          />
        </div>

        <!-- NAIRA WITHDRAWAL -->
        <div>
          <RadioSelectCard
            card_name="wallet"
            label_id="walletCard2"
            :label_text="nairaBalanceText"
            @clicked="updateWalletSelection('naira')"
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
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/card-comps/radio-select-card"
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
    wallet_type: "",
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

<style></style>
