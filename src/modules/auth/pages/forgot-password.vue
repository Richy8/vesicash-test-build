<template>
  <AuthWrapper
    title_text="Forgot password"
    meta_text="Please enter your registered email address  <br> that is associated with your account. "
  >
    <!-- AUTH PAGE -->
    <form @submit.prevent="handleUserForgotPassword" class="auth-page">
      <!-- EMAIL ADDRESS INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="Email address"
          label_id="emailAddress"
          input_type="email"
          is_required
          placeholder="Enter email address"
          :input_value="form.email_address"
          @getInputState="updateFormState($event, 'email_address')"
          :error_handler="{
            type: 'email',
            message: 'Email address is not valid',
          }"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-30 mgb-10">
        <button
          class="btn btn-primary btn-md w-100"
          ref="forgotPasswordBtn"
          :disabled="isValidState"
        >
          Continue
        </button>
      </div>
    </form>
  </AuthWrapper>
</template>

<script>
import { mapActions } from "vuex";
import FormHelper from "@/modules/auth/mixins/auth-helper";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "ForgotPassword",

  metaInfo: {
    title: "Forgot Password",
    titleTemplate: "%s - Vesicash",
  },

  mixins: [FormHelper],

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
        email_address: "",
      },

      validity: {
        email_address: true,
      },
    };
  },

  methods: {
    ...mapActions({ requestUserPassword: "auth/requestUserPassword" }),

    // =========================================
    // HANDLE USER CLIENT FORGOT PASSWORD BTN
    // =========================================
    handleUserForgotPassword() {
      this.handleClick("forgotPasswordBtn");

      this.requestUserPassword(this.form)
        .then((response) => {
          console.log(response);
          if (response.code === 200) {
            this.handleResponse(
              "A password reset link has been sent to your email",
              "success"
            );

            // RESET EMAIL FIELD
            this.form.email_address = "";
            setTimeout(() => this.$router.push("/login"), 2500);
          }

          // HANDLE NON 200 RESPONSE
          else this.handleResponse("Email address provided, is not valid");
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
      this.handleClick("forgotPasswordBtn", "Continue", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>