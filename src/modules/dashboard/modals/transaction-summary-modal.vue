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
        <template v-for="(data, index) in getTxnSummary">
          <ModalItem :title="data.title" :value="data.value" :key="index" />
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer" v-if="false">
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

    prepared_summary: {
      type: Array,
      default: () => [],
    },

    summary_data: {
      type: Object,
      default: () => ({}),
    },

    withdrawals: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getSummaryData() {
      delete this.summary_data.payment_made_at;
      delete this.summary_data.shipping_fee;
      delete this.summary_data.deleted_at;
      delete this.summary_data.broker_charge;
      delete this.summary_data.payment_type;
      delete this.summary_data.transaction_id;
      delete this.summary_data.disburse_currency;

      for (const prop in this.summary_data) {
        let prop_obj = {};
        prop_obj.title = prop.split("_").join(" ");
        prop_obj.value = this.summary_data[prop];

        this.summary_list.push(prop_obj);
      }

      return this.summary_list;
    },

    getTxnSummary() {
      if (this.prepared_summary.length) return this.prepared_summary;
      return this.summary_data;
    },
  },

  // watch: {
  //   summary_data: {
  //     handler(value) {
  //       console.log(value);
  //       this.processSummaryData(value);
  //     },
  //   },
  // },

  data() {
    return {
      summary_list: [],
      summary_withdrawal_list: [],
    };
  },

  methods: {
    processSummaryData(summary) {
      console.log("SUMMARY", summary);

      for (const prop in summary) {
        let prop_obj = {};
        prop_obj.title = prop.split("_").join(" ");
        prop_obj.value = summary[prop];

        this.summary_list.push(prop_obj);
      }

      console.log("SUMMARY", this.summary_list);
    },
  },
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