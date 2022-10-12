<template>
  <tr @click="viewTransactionDetail">
    <td class="body-data" :class="`${table_name}-1`">4th July, 2022</td>

    <td class="body-data text-no-wrap" :class="`${table_name}-2`">
      1124949599
    </td>

    <td class="body-data" :class="`${table_name}-3`">Awo Bangalee</td>

    <td class="body-data" :class="`${table_name}-4`">Dollar</td>

    <td class="body-data" :class="`${table_name}-5`">$10,000</td>

    <td class="body-data" :class="`${table_name}-6`">
      <TagCard card_text="Completed" card_type="success" />
    </td>

    <td class="body-data" :class="`${table_name}-7`">
      <button class="btn btn-secondary btn-sm">View</button>
    </td>
  </tr>
</template>

<script>
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "TransactionWalletTableRow",

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

  methods: {
    viewTransactionDetail() {
      this.$bus.$emit("showTransactionSummary");
    },
  },
};
</script>

<style>
</style>