<template>
  <tr @click="toggleTransactionSummaryModal">
    <td class="body-data" :class="`${table_name}-1`">{{ getCreatedDate }}</td>

    <td class="body-data text-no-wrap" :class="`${table_name}-2`">
      {{ data.payment_id }}
    </td>

    <td class="body-data" :class="`${table_name}-3`">
      {{ data.user_details.email }}
    </td>

    <!-- <td class="body-data" :class="`${table_name}-4`">
      {{ data.currency === "USD" ? "Dollar" : "Naira" }}
    </td> -->

    <td class="body-data" :class="`${table_name}-4`">
      {{ $money.getSign(data.currency)
      }}{{ $money.addComma(data.total_amount) }}
    </td>

    <td class="body-data" :class="`${table_name}-5`">
      <TagCard
        :card_text="data.is_paid ? 'Completed' : 'Failed'"
        :card_type="data.is_paid ? 'success' : 'error'"
      />
    </td>

    <td class="body-data" :class="`${table_name}-6`">
      <button class="btn btn-secondary btn-sm">View</button>
    </td>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_transaction_summary_modal">
        <TransactionSummaryModal
          type="wallet"
          :summary_data="getSummaryData"
          @closeTriggered="toggleTransactionSummaryModal"
        />
      </transition>
    </portal>
  </tr>
</template>

<script>
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "TransactionWalletTableRow",

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
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.data.created_at)
        .getAll();

      return `${m4} ${d3}, ${y1} ${h01}:${b2}${a0}`;
    },

    getSummaryData() {
      return [
        {
          title: "Transaction date",
          value: this.getCreatedDate,
        },
        {
          title: "Payment id",
          value: this.data.payment_id,
        },
        {
          title: "Currency",
          value: this.data.currency,
        },
        {
          title: "Total amount",
          value: `${this.$money.getSign(
            this.data.currency
          )}${this.$money.addComma(Number(this.data.total_amount))}`,
        },
        {
          title: "Amount funded",
          value: `${this.$money.getSign(
            this.data.currency
          )}${this.$money.addComma(
            Number(this.data.total_amount) - Number(this.data.escrow_charge)
          )}`,
        },
        {
          title: "Funding charge",
          value: `${this.$money.getSign(
            this.data.currency
          )}${this.$money.addComma(this.data.escrow_charge)}`,
        },
        {
          title: "Account email",
          value: this.data.user_details.email,
        },
        {
          title: "Business id",
          value: this.data.business_id,
        },
        {
          title: "Transaction status",
          value: this.data.is_paid ? "Completed" : "Failed",
        },
      ];
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