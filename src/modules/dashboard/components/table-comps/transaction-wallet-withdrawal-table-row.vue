<template>
  <tr @click="toggleTransactionSummaryModal">
    <td class="body-data" :class="`${table_name}-1`">{{ getCreatedDate }}</td>

    <td class="body-data text-no-wrap" :class="`${table_name}-2`">{{ data.disbursement_id }}</td>

    <td class="body-data" :class="`${table_name}-3`">{{ data.recipient_id }}</td>

    <td
      class="body-data"
      :class="`${table_name}-4`"
    >{{ data.currency === "USD" ? "Dollar" : "Naira" }}</td>

    <td class="body-data" :class="`${table_name}-5`">
      <span v-html="$money.getSign(data.currency)"></span>
      {{ $money.addComma(data.amount) }}
    </td>

    <td class="body-data" :class="`${table_name}-6`">
      <TagCard
        :card_text="data.status === 'failed' ? 'Failed' : 'Completed'"
        :card_type="data.status === 'failed'? 'error' : 'success'"
      />
    </td>

    <td class="body-data" :class="`${table_name}-7`">
      <button class="btn btn-secondary btn-sm">View</button>
    </td>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_transaction_summary_modal">
        <TransactionSummaryModal
          withdrawals
          type="wallet"
          :summary_data="data"
          @closeTriggered="toggleTransactionSummaryModal"
        />
      </transition>
    </portal>
  </tr>
</template>

<script>
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "TransactionWalletWthdrawalTableRow",

  components: {
    TagCard,

    TransactionSummaryModal: () =>
      import(
        /* webpackChunkName: "dashboard-table-module" */ "@/modules/dashboard/modals/transaction-summary-modal"
      ),
  },

  props: {
    table_name: {
      type: String,
      default: "",
    },

    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getCreatedDate() {
      let { d3, m4, y1 } = this.$date.formatDate(this.data.created_at).getAll();

      return `${d3} ${m4}, ${y1}`;
    },
  },

  data: () => ({
    show_transaction_summary_modal: false,
  }),

  methods: {
    toggleTransactionSummaryModal() {
      this.show_transaction_summary_modal =
        !this.show_transaction_summary_modal;
    },
  },
};
</script>

<style>
</style>