<template>
  <tr @click="viewDisbursementDetails">
    <td class="body-data" :class="`${table_name}-1`">
      <div class="text mgb-6 text-no-wrap">
        Payment for landing Payment for landing
      </div>
      <div class="meta tertiary-3-text grey-600">One-off disbursment</div>
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      <div class="text mgb-6 text-no-wrap">1 on 1 party</div>
      <div class="meta tertiary-3-text grey-600">2 people</div>
    </td>

    <td class="body-data" :class="`${table_name}-3`">14th July, 2022</td>

    <td class="body-data" :class="`${table_name}-4`">
      <div class="text mgb-6 text-no-wrap">$40,000</div>
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

  methods: {
    viewDisbursementDetails() {
      this.$router.push({ name: "VesicashDisbursementDetails" });
    },
  },
};
</script>

<style>
</style>