<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-md' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Transaction summary</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <ModalItem title="Amount Paid" value="$100,000" />
        <ModalItem title="Disbursement Name" value="Payment for landing page" />
        <ModalItem title="Date of Transaction" value="24th Apr 2022" />

        <ModalItem title="Amount Paid" value="$100,000" />
        <ModalItem title="Disbursement Name" value="Payment for landing page" />
        <ModalItem title="Date of Transaction" value="24th Apr 2022" />

        <ModalItem title="Amount Paid" value="$100,000" />
        <ModalItem title="Disbursement Name" value="Payment for landing page" />
        <ModalItem title="Date of Transaction" value="24th Apr 2022" />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md mgr-24">Download receipt</button>

        <button class="btn btn-secondary btn-md" v-if="type === 'disbursement'">
          Go to disbursements
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import ModalItem from "@/modules/dashboard/components/modal-comps/modal-item";

export default {
  name: "TransactionSummaryModal",

  components: {
    ModalCover,
    ModalItem,
  },

  props: {
    type: {
      type: String,
      default: "disbursement",
    },
  },

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  @include flex-row-between-wrap;
  align-items: flex-start;
}

.modal-cover-footer {
  @include flex-row-start-wrap;

  .btn {
    @include breakpoint-down(sm) {
      margin-bottom: toRem(20);
      width: 100%;

      &:first-of-type {
        margin-right: 0 !important;
      }

      &:last-of-type {
        margin-bottom: toRem(10);
      }
    }
  }
}
</style>