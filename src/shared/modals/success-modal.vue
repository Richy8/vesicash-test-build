<template>
  <ModalCover
    :show_close_btn="false"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
  >
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="success-icon-wrapper">
          <CheckIcon />
        </div>

        <div class="h4-text grey-900 text-center mgb-8">Congratulations</div>
        <div
          class="tertiary-1-text grey-900 text-center mgb-16"
        >Your document has been uploaded successfully</div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100" @click="$emit('continue')">Back to settings</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
export default {
  name: "SuccesModal",

  components: {
    ModalCover,

    CheckIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/check-icon"
      ),
  },
};
</script>

<style lang="scss" scoped>
.success-icon-wrapper {
  @include flex-column-center;
  @include draw-shape(120);
  border-radius: 50%;
  background: getColor("teal-800");
  margin: 0 auto toRem(24) auto;
}
</style>