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
        <!-- BACK BUTTON -->
        <PageBackBtn custom_mode @clicked="$emit('goBackAccountSelection')" />

        <div class="modal-cover-title h5-text mgt--4">Confirm transaction</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-24">
        <ModalListItem title="Amount to withdraw" value="N150,000" />
        <ModalListItem title="Withdrawal fee" value="N400" />
        <ModalListItem title="Total" value="N150,400" />
        <ModalListItem title="Country" value="United State of America" />
        <ModalListItem title="Phone number" value="08131177703" />
        <ModalListItem title="First name" value="Efemena" />
        <ModalListItem title="Last name" value="Elvis" />
        <ModalListItem title="Bank name" value="Guaranty Trust Bank" />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <router-link
          :to="{ name: 'SuccessfulWithdrawal' }"
          class="btn btn-primary btn-md wt-100"
          >Continue</router-link
        >
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "WithdrawConfirmModal",

  components: {
    ModalCover,
    PageBackBtn,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  props: {},

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss">
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;
}
</style>