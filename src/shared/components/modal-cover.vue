<template>
  <div class="modal-overlay" @click.self="selfCloseModal">
    <div class="modal-outer-container">
      <div
        :class="getModalWrapperStyle"
        class="modal-cover box-shadow-effect px-0 mx-auto"
      >
        <div class="modal-cover-body-wrapper px-0">
          <!-- DISMISS DIALOG -->
          <div
            v-if="show_close_btn"
            class="dialog-dismiss pointer index-9"
            @click="$emit('closeModal')"
            title="Close"
          >
            <div class="wrapper position-relative w-100 h-100">
              <div class="icon icon-close"></div>
            </div>
          </div>

          <!-- MODAL COVER CONTAINER  -->
          <div class="modal-cover-container" :class="modal_style.background">
            <!-- MODAL COVER HEADER -->
            <slot name="modal-cover-header"></slot>

            <!-- MODAL COVER BODY -->
            <slot name="modal-cover-body"></slot>

            <!-- MODAL COVER FOOTER  -->
            <slot name="modal-cover-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCover",

  props: {
    modal_style: {
      type: Object,
      default: () => ({
        shape: "rounded-10",
        size: "modal-sm", //Refer to Modal.scss for more modal sizes
        background: "neutral-10-bg", //Refer to Color.scss for more colors
      }),
    },

    show_close_btn: {
      type: Boolean,
      default: true,
    },

    trigger_self_close: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    getModalWrapperStyle() {
      return `${this.modal_style.shape || "rounded-16"} ${
        this.modal_style.size || "modal-sm"
      } ${this.modal_style.background || "neutral-10-bg"}`;
    },
  },

  mounted() {
    document.querySelector("body").style.overflow = "hidden";
  },

  beforeDestroy() {
    document.querySelector("body").style.overflow = "auto";
  },

  methods: {
    selfCloseModal() {
      if (this.trigger_self_close) this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss"></style>
