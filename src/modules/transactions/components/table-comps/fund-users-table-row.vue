<template>
  <tr>
    <td class="body-data" :class="`${table_name}-1`">
      {{ data.email_address }}
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      {{ data.phone_number }}
    </td>

    <td class="body-data text-capitalize" :class="`${table_name}-3`">
      {{ data.role.name }}
    </td>

    <template v-if="type !== 'single'">
      <td class="body-data text-capitalize" :class="`${table_name}-4`">
        {{ data.access.name }}
      </td>
      <td class="body-data text-capitalize" :class="`${table_name}-5`">
        {{ data.recipient.name }}
      </td>
    </template>

    <td class="body-data" :class="`${table_name}-6`">
      <button class="btn btn-secondary btn-sm" @click="toggleEditModal">
        Edit User
      </button>
    </td>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_edit_modal">
        <EditUserModal
          :type="type"
          :user_data="data"
          @closeTriggered="toggleEditModal"
        />
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
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/edit-user-modal"
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