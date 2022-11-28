<template>
  <tr>
    <td class="body-data grey-900" :class="`${table_name}-1`">{{ getName }}</td>

    <td class="body-data grey-900" :class="`${table_name}-2`">{{ data.email_address }}</td>

    <!-- <td class="body-data grey-900" :class="`${table_name}-3`">{{ data.password }}</td> -->

    <td class="body-data" :class="`${table_name}-4`">
      <button class="btn btn-sm btn-secondary" @click="toggleDeleteModal">
        <span class="icon icon-trash mgr-8"></span>
        <span class="secondary-3-text grey-900">Delete User</span>
      </button>
    </td>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_delete_user_modal">
        <DeletePromptModal
          @closeTriggered="toggleDeleteModal"
          :name="getName"
          :id="data.account_id"
        />
      </transition>
    </portal>
  </tr>
</template>

<script>
import DeletePromptModal from "@/modules/settings/modals/delete-prompt-modal";
export default {
  name: "UserTableRow",

  components: {
    DeletePromptModal,
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
    getName() {
      const { data } = this;
      if (data.lastname || data.firstname)
        return `${data.lastname} ${data.firstname}`;
      else if (data.username) return data.username;
      else return data.email_address;
    },
  },

  data() {
    return {
      show_delete_user_modal: false,
    };
  },

  methods: {
    toggleDeleteModal() {
      this.show_delete_user_modal = !this.show_delete_user_modal;
    },
  },
};
</script>

<style>
</style>