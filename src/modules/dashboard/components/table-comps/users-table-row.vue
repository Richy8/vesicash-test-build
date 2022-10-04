<template>
  <tr>
    <td class="body-data" :class="`${table_name}-1`">
      Kunleafolayan@gmail.com
    </td>

    <td class="body-data" :class="`${table_name}-2`">09148585833</td>

    <td class="body-data" :class="`${table_name}-3`">Buyer</td>

    <td class="body-data" :class="`${table_name}-4`">
      <TagCard card_text="Accepted" card_type="success" />
    </td>
  </tr>
</template>

<script>
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "UsersTableRow",

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

  methods: {},
};
</script>

<style>
</style>