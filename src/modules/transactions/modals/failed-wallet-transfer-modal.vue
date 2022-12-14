<template>
  <ModalCover
    :modal_style="{ size: 'modal-xs' }"
    @closeModal="$emit('close')"
    :show_close_btn="false"
  >
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="cross-wrapper mgb-24">
          <CrossIcon />
        </div>

        <div class="h4-text text-center mgb-8">Failed transaction</div>
        <div class="tertiary-1-text text-center grey-900 mgb-40">{{message}}</div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <router-link
          :to="{name:'VesicashDashboard',query:{fund_wallet:true}}"
          class="btn btn-md wt-100 mgb-24"
          :class="swap?'btn-primary':'btn-secondary'"
        >Fund your wallet</router-link>

        <button
          v-if="!swap"
          class="btn btn-primary btn-md wt-100"
          @click="$emit('goBackPaymentSelection')"
        >Use other payment options</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import CrossIcon from "@/shared/components/icon-comps/cross-icon";

export default {
  name: "FailedTransferModal",

  components: {
    ModalCover,
    CrossIcon,
  },

  props: {
    message: {
      type: String,
      default: "Failed to transfer money",
    },

    swap: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      name: "",
    };
  },

  methods: {
    fundWallet() {
      console.log("FUNDING");
    },
  },
};
</script>

<style lang="scss" scoped>
.cross-wrapper {
  @include draw-shape(120);
  @include flex-column-center;
  border-radius: 50%;
  background: getColor("red-50");
  margin: auto;
}
</style>