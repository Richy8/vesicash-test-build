<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-xs' }">
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="trash-wrapper">
          <TrashIcon />
        </div>

        <div class="text-center h4-text grey-900">Delete user</div>
        <div
          class="text-center tertiary-1-text mgb-22 mgt-5 grey-900"
        >Are you sure you want to delete user?</div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <div class="button-wrapper">
          <button class="btn btn-sm btn-secondary" @click="$emit('closeTriggered')">Cancel</button>
          <button class="btn btn-sm btn-alert">Delete</button>
        </div>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import TrashIcon from "@/shared/components/icon-comps/trash-icon";

export default {
  name: "DeletePromptModal",

  components: {
    ModalCover,
    TrashIcon,
  },

  methods: {},
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
