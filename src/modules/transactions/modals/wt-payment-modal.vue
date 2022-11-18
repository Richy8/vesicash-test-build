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
        <div class="modal-cover-title">
          <!-- BACK BUTTON -->
          <PageBackBtn custom_mode @clicked="$emit('goBackPaymentSelection')" />Pay by wire transfer
        </div>

        <div class="modal-cover-meta">
          Please pay the amount below and fill in the payment details for us to
          confirm your payment
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- MODAL ITEMS WRAPPER -->
        <div class="modal-items-wrapper">
          <ModalListItem title="Amount to pay" :value="getAmount" />
        </div>

        <div class="modal-items-wrapper">
          <!-- NAIRA WALLET TYPE -->
          <template v-if="loading">
            <ModalListItem loading />
            <ModalListItem loading />
            <ModalListItem loading />
          </template>

          <template v-else>
            <ModalListItem title="Bank name" value="Providus bank" />
            <ModalListItem title="Beneficiary name" value="Vesicsh innovative tech lTD" />
            <ModalListItem title="Beneficiary account number" value="1300390961" />
            <ModalListItem title="Bank identifier/Swift code" value="UMPLNGLA" />
            <ModalListItem title="Address" value="Plot 54, Adetokumbo Adedamola street" />
            <ModalListItem title="City" value="Lagos" />
            <ModalListItem title="Country" value="Nigeria" />
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100" @click="$emit('paid')">I have paid already</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "WTPaymentModal",

  components: {
    ModalCover,
    PageBackBtn,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  props: {
    paymentDetails: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getAmount() {
      const currency = this.paymentDetails?.currency?.slug;
      const sign = this.$money.getSign(currency);
      return `${sign}${this.paymentDetails.total_fee}`;
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    ...mapActions({}),
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  max-height: 53vh;
  overflow-y: auto;

  .modal-items-wrapper {
    border: toRem(1) dashed getColor("green-500");
    background: getColor("green-10");
    padding: toRem(2) toRem(18);
    border-radius: toRem(12);
    margin-bottom: toRem(24);
  }
}
</style>