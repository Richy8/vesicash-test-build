<template>
  <tr>
    <td class="body-data" :class="`${table_name}-1`">
      {{ data.email }}
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      {{ data.phone_number || "No phone number" }}
    </td>

    <td class="body-data text-capitalize" :class="`${table_name}-3`">
      {{ data.role }}
    </td>

    <template v-if="type !== 'single'">
      <td class="body-data text-capitalize" :class="`${table_name}-4`">
        {{ getAccessLevel }}
      </td>
      <td class="body-data text-capitalize" :class="`${table_name}-5`">
        {{ data.access_level.can_receive ? "Yes" : "No" }}
      </td>
    </template>

    <td class="body-data" :class="`${table_name}-6`">
      <TagCard :card_text="data.status" :card_type="getTagColor" />
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

    type: {
      type: String,
      default: "single",
    },

    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getAccessLevel() {
      if (this.data.access_level.approve) return "Approve";
      else if (this.data.access_level.mark_as_done) return "Mark as done";
      else return "View";
    },

    getTagColor() {
      let { status } = this.data;

      if (status.toLowerCase() === "created") return "okay";
      else if (status.toLowerCase() === "accepted") return "success";
      else return "error";
    },
  },

  methods: {},
};
</script>

<style>
</style>