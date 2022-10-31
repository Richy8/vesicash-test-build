<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :show_close_btn="false"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">
          <!-- BACK BUTTON -->
          <PageBackBtn custom_mode @clicked="$emit('goBackPaymentSelection')" />

          Pay with flutterwave business
        </div>

        <div class="modal-cover-meta">
          You will be redirected to the flutterwave business dashboard to make
          your payment
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- MODAL ITEMS WRAPPER -->
        <div class="modal-items-wrapper green-10-bg rounded-12 mgb-24">
          <!-- NAIRA WALLET TYPE -->
          <template v-if="loading">
            <ModalListItem loading />
            <ModalListItem loading />
            <ModalListItem loading />
          </template>

          <template v-else>
            <ModalListItem title="Amount to pay" value="₦4000" />
            <ModalListItem title="Merchant ID" value="6868107" />
            <ModalListItem
              title="Merchant name"
              value="Vesicash innovative Technologies"
            />
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100">
          Pay with flutterwave
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "FWBusinessModal",

  components: {
    ModalCover,
    PageBackBtn,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    ...mapActions({}),

    // ========================================================
    // HANDLE FETCHING OF FLUTTER WAVE BUSINESS ACCOUNT DETAILS
    // ========================================================
    handleFetchingFWBizAccount() {},

    handlePaymentError(message) {
      this.pushToast(message, "error");
      this.handleClick("fundBtn", "Make payment", false);
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