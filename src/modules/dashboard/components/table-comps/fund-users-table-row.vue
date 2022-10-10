<template>
  <tr>
    <td class="body-data" :class="`${table_name}-1`">
      Kunleafolayan@gmail.com
    </td>

    <td class="body-data" :class="`${table_name}-2`">09148585833</td>

    <td class="body-data" :class="`${table_name}-3`">Buyer</td>

    <template v-if="type !== 'single'">
      <td class="body-data" :class="`${table_name}-4`">Approve</td>
      <td class="body-data" :class="`${table_name}-5`">No</td>
    </template>

    <td class="body-data" :class="`${table_name}-6`">
      <button class="btn btn-secondary btn-sm" @click="toggleEditModal">
        Edit User
      </button>
    </td>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_edit_modal">
        <EditUserModal :type="type" @closeTriggered="toggleEditModal" />
      </transition>
    </portal>
  </tr>
</template>

<script>
export default {
  name: "FundUsersTableRow",

  components: {
    EditUserModal: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/modals/edit-user-modal"
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

    type: {
      type: String,
      default: "single",
    },
  },

  data: () => ({
    show_edit_modal: false,
  }),

  methods: {
    toggleEditModal() {
      this.show_edit_modal = !this.show_edit_modal;
    },
  },
};
</script>

<style>
</style>