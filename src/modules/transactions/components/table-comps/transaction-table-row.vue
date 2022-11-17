<template>
  <tr @click="viewTransactionDetails">
    <td class="body-data" :class="`${table_name}-1`">
      <div class="text mgb-6 text-no-wrap">
        {{ data.title }}
      </div>
      <div class="meta tertiary-3-text grey-600">{{ getTransactionType }}</div>
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      <div class="text mgb-6 text-no-wrap">{{ getPartyCount }} party</div>
      <div class="meta tertiary-3-text grey-600">
        {{ data.parties.length }} people
      </div>
    </td>

    <td class="body-data" :class="`${table_name}-3`">{{ getCreatedDate }}</td>

    <td class="body-data" :class="`${table_name}-4`">
      <div class="text mgb-6 text-no-wrap">
        {{ $money.getSign(data.currency)
        }}{{ $money.addComma(getTotalTransactionAmount) }}
      </div>
      <div class="meta tertiary-3-text grey-600">$0 paid</div>
    </td>

    <td class="body-data" :class="`${table_name}-5`">
      <TagCard card_text="In Progress" card_type="progress" />
    </td>

    <td class="body-data" :class="`${table_name}-6`">
      <button class="btn btn-secondary btn-sm">View</button>
    </td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex";
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "DisbursementTableRow",

  components: {
    TagCard,
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
      let { d3, m4, y1 } = this.$date
        .formatDate(this.data.due_date_formatted)
        .getAll();

      return `${d3} ${m4}, ${y1}`;
    },

    getTransactionType() {
      return this.data.type === "oneoff"
        ? "One-off disbursement"
        : "Milestone disbursement";
    },

    getPartyCount() {
      return this.data.parties.length === 2 ? "1 on 1" : "Multi";
    },

    getTotalTransactionAmount() {
      return this.data.milestones.length
        ? this.data.milestones.reduce(
            (total, count) => (total += Number(count.amount)),
            0
          )
        : this.data.amount;
    },
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_DETAILS: "transactions/UPDATE_TRANSACTION_DETAILS",
    }),

    viewTransactionDetails() {
      this.updateTransactionDetails(this.data);

      this.$router.push({
        name: "TransactionDetails",
        query: {
          type: this.data.type,
          party: this.data.parties.length === 2 ? "single" : "multiple",
        },
      });
    },

    // UPDATE TRANSACTION DETAILS STATE
    updateTransactionDetails(payload) {
      this.UPDATE_TRANSACTION_DETAILS(payload);
    },
  },
};
</script>

<style>
</style>