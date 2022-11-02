<template>
  <ModalCover
    :show_close_btn="false"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
    class="verify-input-modal"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div
          class="modal-cover-title text-center mgt-5"
        >Verify {{ email ? 'email address':'phone number' }}</div>
        <div
          class="tertiary-2-text text-center grey-600 mgy-7"
        >An OTP code will be sent to the {{ email ? 'email address':'phone number' }} you have provided</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="position-relative">
          <BasicInput
            v-if="email"
            input_type="email"
            is_required
            placeholder="Enter your email address"
            :input_value="form.email_address"
            @getInputState="updateFormState($event, 'email_address')"
            :error_handler="{
            type: 'email',
            message: 'Email address is not valid',
          }"
          />

          <BasicInput
            v-else
            input_type="number"
            :input_value="form.phone_number"
            is_phone_type
            is_required
            placeholder="Enter your phone number"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            @getInputState="updateFormState($event, 'phone_number')"
            :error_handler="{
            type: 'phone',
            message: 'Phone number is not valid',
          }"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100" @click="$emit('continue')">Continue</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "VerifyInputModal",

  components: {
    ModalCover,
    BasicInput,
  },

  props: {
    email: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        email_address: "",
        phone_number: "",
      },

      validity: {
        email_address: "",
        phone_number: "",
      },
    };
  },

  methods: {},
};
</script>


<style lang="scss">
.verify-input-modal {
  .modal-cover-body {
    min-height: 14vh;
  }
}
</style>