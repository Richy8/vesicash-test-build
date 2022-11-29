<template>
  <ModalCover
    :show_close_btn="false"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="success-icon-wrapper">
          <CheckIcon />
        </div>

        <div class="h4-text grey-900 text-center mgb-8">Congratulations</div>
        <div class="tertiary-1-text grey-900 text-center mgb-16">{{message}}</div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer footer-wrapper">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="$emit('closeTriggered')"
        >{{ main_cta_title }}</button>

        <button
          v-for="(actionOption,index) in actions"
          :key="index"
          class="btn btn-secondary btn-md wt-100"
          @click="actionOption.action"
        >{{actionOption.title}}</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
export default {
  name: "SuccesModal",

  props: {
    message: {
      type: String,
      default: "Success",
    },

    main_cta_title: {
      type: String,
      default: "Back to settings",
    },

    actions: {
      type: Array,
      default: () => [],
    },
  },

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

.footer-wrapper {
  display: flex;
  flex-direction: column;
  gap: toRem(24) 0;
}
</style>