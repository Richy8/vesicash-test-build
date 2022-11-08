<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-sm' }">
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Account details</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <ModalListItem title="Bank" :value="account.bank_name" />
        <ModalListItem title="Account number" :value="account.account_no" />
        <ModalListItem title="Account name" :value="account.account_name" />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button ref="save" class="btn btn-secondary btn-md wt-100 mgt-17">
          <span class="icon icon-trash mgr-11"></span>
          Delete account
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import ModalListItem from "@/modules/dashboard/components/modal-comps/modal-list-item";

export default {
  name: "NewNairaAccountModal",

  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    ModalCover,
    ModalListItem,
  },
};
</script>

<style lang="scss" scoped>
</style>

