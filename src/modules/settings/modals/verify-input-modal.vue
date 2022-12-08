<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    class="verify-input-modal"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Verify {{ email ? 'email address':'phone number' }}</div>
        <div
          class="tertiary-2-text w-75 grey-600 mgt-5"
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
        <button
          ref="continue"
          class="btn btn-primary btn-md wt-100"
          @click="requestOTP"
          :disabled="isDisabled"
        >Continue</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";
import { mapActions } from "vuex";

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

    input: {
      type: String,
      default: "",
    },
  },

  computed: {
    isDisabled() {
      return this.email
        ? this.validity.email_address
        : this.validity.phone_number;
    },
  },

  watch: {
    input: {
      handler(data) {
        if (this.email) {
          this.form.email_address = data;
          this.validity.email_address = !data;
        } else {
          this.form.phone_number = data;
          this.validity.phone_number = !data;
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      form: {
        email_address: "",
        phone_number: "",
      },

      validity: {
        email_address: true,
        phone_number: true,
      },
    };
  },

  methods: {
    ...mapActions({
      sendUserOTP: "settings/requestOTP",
      sendEmailOTP: "settings/requestEmailOTP",
      // sendEmailOTP: "auth/sendUserOTP",
    }),

    requestOTP() {
      this.handleClick("continue");

      let request_payload = {
        account_id: this.getAccountId,
        phone_number: this.form.phone_number,
      };

      let request_email_otp_payload = {
        account_id: this.getAccountId,
        email_address: this.form.email_address,
        email: this.form.email_address,
      };

      const payload = this.email ? request_email_otp_payload : request_payload;
      const action = this.email ? "sendEmailOTP" : "sendUserOTP";
      const input_type = this.email
        ? this.form.email_address
        : this.form.phone_number;

      this[action](payload)
        .then((response) => {
          this.handleClick("continue", "Continue", false);

          if (response.code === 200) {
            this.pushToast(
              `An OTP code has been sent to ${input_type}`,
              "success"
            );
            this.$emit(
              "continue",
              this.email ? this.form.email_address : this.form.phone_number
            );
          } else {
            this.pushToast(response.message, "error");
          }
        })
        .catch(() => {
          this.handleClick("continue", "Continue", false);
          this.pushToast("Unable to generate an OTP code", "error");
        });
    },
  },
};
</script>


<style lang="scss">
.verify-input-modal {
  .modal-cover-body {
    min-height: 14vh;
  }
}
</style>