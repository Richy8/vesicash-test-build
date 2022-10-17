<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">
          Fund <span class="text-capitalize">{{ wallet_type }}</span> wallet
        </div>

        <div class="modal-cover-meta">
          Please send the amount you wish to fund to the Bank account details
          listed below
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb--10">
        <!-- MODAL ITEMS WRAPPER -->
        <div class="modal-items-wrapper green-10-bg rounded-12 mgb-24">
          <!-- BANK DETAILS -->
          <template v-for="(data, index) in getWalletInfo">
            <ModalListItem
              :title="data.title"
              :value="data.value"
              :key="index"
            />
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="handleFundSuccess"
        >
          I have funded
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import { NAIRA_WALLET, DOLLAR_WALLET } from "@/utilities/constant";

export default {
  name: "WalletDetailsModal",

  components: {
    ModalCover,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  props: {
    wallet_type: {
      type: String,
      default: "naira",
    },
  },

  computed: {
    getWalletInfo() {
      return this.wallet_type === "naira" ? NAIRA_WALLET : DOLLAR_WALLET;
    },
  },

  data: () => ({}),

  methods: {
    handleFundSuccess() {
      this.$emit("walletFunded");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;

  .modal-items-wrapper {
    border: toRem(1) dashed getColor("green-500");
    padding: toRem(2) toRem(18);
  }
}
</style>