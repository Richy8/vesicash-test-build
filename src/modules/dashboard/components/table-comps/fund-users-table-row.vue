<template>
  <tr>
    <td class="body-data" :class="`${table_name}-1`">
      Kunleafolayan@gmail.com
    </td>

    <td class="body-data" :class="`${table_name}-2`">09148585833</td>

    <td class="body-data" :class="`${table_name}-3`">Buyer</td>

    <template v-if="type !== 'single'">
      <td class="body-data" :class="`${table_name}-4`">Approve</td>
    </template>

    <td class="body-data" :class="`${table_name}-5`">
      <button class="btn btn-secondary btn-sm">Edit User</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "FundUsersTableRow",

  props: {
    table_name: {
      type: String,
      default: "",
    },

    data: {
      type: Object,
      default: () => ({}),
    },

    type: {
      type: String,
      default: "single",
    },
  },

  methods: {},
};
</script>

<style>
</style>