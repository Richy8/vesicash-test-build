<template>
  <tr @click="viewTransactionDetails">
    <td class="body-data" :class="`${table_name}-1`">
      <div class="text mgb-6 text-no-wrap">
        {{ data.title }}
      </div>
      <div class="meta tertiary-3-text grey-600">{{ getTransactionType }}</div>
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      <div class="text mgb-6 text-no-wrap">1 on 1 party</div>
      <div class="meta tertiary-3-text grey-600">2 people</div>
    </td>

    <td class="body-data" :class="`${table_name}-3`">{{ getCreatedDate }}</td>

    <td class="body-data" :class="`${table_name}-4`">
      <div class="text mgb-6 text-no-wrap">
        <span v-html="$money.getSign(data.currency)"></span
        >{{ $money.addComma(data.amount) }}
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
  },

  methods: {
    viewTransactionDetails() {
      this.$router.push({ name: "TransactionDetails" });
    },
  },
};
</script>

<style>
</style>