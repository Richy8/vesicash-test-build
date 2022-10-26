<template>
  <AuthWrapper title_text="Enter new password">
    <!-- AUTH PAGE -->
    <form @submit.prevent="handleUserResetPassword" class="auth-page">
      <!-- PASSWORD INPUT -->
      <div class="form-group mgb-13">
        <BasicInput
          label_title="New password"
          label_id="password"
          input_type="password"
          is_required
          placeholder="Enter new password"
          :toggle_password="false"
          :input_value="form.password"
          :custom_style="{ input_wrapper_style: 'form-suffix' }"
          @getInputState="updateFormState($event, 'password')"
          :error_handler="{
            type: 'password',
            message: 'Password should contain at least 4 characters',
          }"
        />
      </div>

      <!-- CONFIRM PASSWORD INPUT -->
      <!-- <div class="form-group mgb-13">
        <BasicInput
          label_title="Confirm password"
          label_id="newPassword"
          input_type="password"
          is_required
          placeholder="Enter new password"
          :toggle_password="false"
          :input_value="form.confirm_password"
          :custom_style="{ input_wrapper_style: 'form-suffix' }"
          @getInputState="updateFormState($event, 'confirm_password')"
          :error_handler="{
            type: 'password',
            message: 'Password should contain at least 4 characters',
          }"
        />
      </div> -->

      <!-- PASSWORD RESET TOKEN -->
      <div class="form-group mgb-13">
        <BasicInput
          label_title="Reset Token"
          label_id="resetToken"
          is_required
          placeholder="Enter reset token"
          :input_value="form.reset_token"
          @getInputState="updateFormState($event, 'reset_token')"
          :error_handler="{
            type: 'required',
            message: 'Reset token field is required',
          }"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10">
        <button
          class="btn btn-primary btn-md w-100"
          ref="resetBtn"
          :disabled="isValidState"
        >
          Reset Password
        </button>
      </div>
    </form>
  </AuthWrapper>
</template>

<script>
import { mapActions } from "vuex";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "ResetPassword",

  metaInfo: {
    title: "ResetPassword",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    BasicInput,
  },

  computed: {
    // CHECK FORM BUTTON VALIDITY STATE
    isValidState() {
      return Object.values(this.validity).every((valid) => !valid)
        ? false
        : true;
    },
  },

  data() {
    return {
      form: {
        password: "",
        reset_token: "",
      },

      validity: {
        password: true,
        reset_token: true,
      },
    };
  },

  methods: {
    ...mapActions({ resetUserPassword: "auth/resetUserPassword" }),

    // =========================================
    // HANDLE USER CLIENT FORGOT PASSWORD BTN
    // =========================================
    handleUserResetPassword() {
      this.handleClick("resetBtn");

      let request_payload = {
        account_id: this.$route.params.account_id,
        token: this.form?.reset_token,
        password: this.form?.password,
      };

      // COMPARE PASSWORD
      // if (this.form.password !== this.form.confirm_password) {
      //   this.handleResponse("Password provided does not match");
      //   return;
      // }

      this.resetUserPassword(request_payload)
        .then((response) => {
          if (response.code === 200) {
            setTimeout(
              () =>
                this.$router.push({ name: "VesicashSuccessfulPasswordReset" }),
              2000
            );
          }

          // HANDLE NON 200 RESPONSE
          else this.handleResponse(response.message);
        })
        .catch(() =>
          this.handleResponse("Unable to reset password at this time")
        );
    },

    // ============================
    // HANDLE USER ERROR STATE
    // ============================
    handleResponse(message, state = "error") {
      this.pushToast(message, state);
      this.handleClick("resetBtn", "Reset Password", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>