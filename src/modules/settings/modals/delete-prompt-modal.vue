<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-xs' }">
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="trash-wrapper">
          <TrashIcon />
        </div>

        <div class="text-center h4-text grey-900">Delete user</div>
        <div class="text-center tertiary-1-text mgb-22 mgt-5 grey-900">
          Are you sure you want to delete
          <b>{{ name ? name :'user' }}</b>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <div class="button-wrapper">
          <button class="btn btn-sm btn-secondary" @click="$emit('closeTriggered')">Cancel</button>
          <button class="btn btn-sm btn-alert" ref="delete" @click="deleteUser">Delete</button>
        </div>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import TrashIcon from "@/shared/components/icon-comps/trash-icon";

export default {
  name: "DeletePromptModal",

  props: {
    id: {
      type: [Number, String],
      default: "",
    },

    name: {
      type: String,
      default: "",
    },
  },

  components: {
    ModalCover,
    TrashIcon,
  },

  methods: {
    ...mapActions({
      deleteConnectedUser: "settings/deleteConnectedUser",
      fetchConnectedUsers: "settings/fetchConnectedUsers",
    }),

    async fetchUsers(message, type) {
      await this.fetchConnectedUsers({ business_id: this.getBusinessId });
      this.pushToast(message, type);
      this.$emit("closeTriggered");
    },

    async deleteUser() {
      if (!this.id) return;

      this.handleClick("delete");

      try {
        const response = await this.deleteConnectedUser({
          account_id: this.id,
        });

        const type = response.code === 200 ? "success" : "error";

        if (response.code === 200) this.fetchUsers(response.message, type);
        else {
          this.handleClick("delete", "Delete", false);
          this.pushToast(response.message, type);
        }
      } catch (err) {
        console.log("ERROR DELETING USER", err);
        this.pushToast("Failed to delete user", "error");
        this.handleClick("delete", "Delete", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.trash-wrapper {
  @include draw-shape(112);
  @include flex-column-center;
  margin: toRem(36) auto toRem(24) auto;
  border-radius: 50%;
  background: getColor("grey-50");
}

.button-wrapper {
  @include flex-row-start-nowrap;
  gap: toRem(24);

  .btn {
    width: 100%;
  }

  @include breakpoint-custom-down(790) {
    @include flex-row-start-wrap;

    .btn-secondary {
      order: 2;
    }

    .btn-primary-error {
      order: 1;
    }
  }
}

.btn-alert {
  background-color: getColor("red-500") !important;
  border: none !important;
  color: #ffffff !important;
  &:hover {
    background-color: getColor("red-600") !important;
  }
  &:focus {
    background-color: getColor("red-700") !important;
  }
}
</style>
