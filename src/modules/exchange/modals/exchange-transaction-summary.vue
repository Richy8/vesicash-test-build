<template>
  <ModalCover
    show_close_btn
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="h7-text fw-semibold">Transaction summary</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <ModalListItem title="Transaction name" :value="summary.name" />
        <ModalListItem title="Initial currency" :value="summary.initial_currency" />
        <ModalListItem title="Final currency" :value="summary.final_currency" />
        <ModalListItem title="Exchange rate" :value="summary.rate" />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgt-17">
        <button class="btn btn-primary btn-md wt-100" ref="swap" @click="swapCurrency">Swap currency</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import ModalListItem from "@/modules/dashboard/components/modal-comps/modal-list-item";
export default {
  name: "ExchangeSummaryModal",

  components: {
    ModalCover,
    ModalListItem,
  },

  props: {
    summary: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    swapCurrency() {
      this.handleClick("swap");

      setTimeout(() => {
        this.$emit("swapped");
      }, 1200);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>