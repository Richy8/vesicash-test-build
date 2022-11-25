<template>
  <AuthWrapper
    :title_text="`Register a ${
      getAccount === 'individual' ? 'personal' : 'business'
    } account`"
  >
    <!-- AUTH PAGE -->
    <form @submit.prevent="handleUserRegister" class="auth-page">
      <!-- BUSINESS NAME INPUT -->
      <div class="form-group" v-if="getAccount === 'business'">
        <BasicInput
          label_title="Business name"
          label_id="businessName"
          :input_value="form.business_name"
          placeholder="What is your business called?"
          @getInputState="updateFormState($event, 'business_name')"
          :error_handler="{
            type: 'required',
            message: 'Business name is a required field',
          }"
        />
      </div>

      <!-- FIRSTNAME INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="First name"
          label_id="firstName"
          :input_value="form.firstname"
          is_required
          placeholder="Your first name"
          @getInputState="updateFormState($event, 'firstname')"
          :error_handler="{
            type: 'single',
            message: 'First name should contain at least 2 characters',
          }"
        />
      </div>

      <!-- LASTNAME INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="Surname"
          label_id="lastName"
          :input_value="form.lastname"
          is_required
          placeholder="Your last name"
          @getInputState="updateFormState($event, 'lastname')"
          :error_handler="{
            type: 'single',
            message: 'Last name should contain at least 2 characters',
          }"
        />
      </div>

      <!-- EMAIL ADDRESS INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="Email address"
          label_id="emailAddress"
          input_type="email"
          :input_value="form.email_address"
          is_required
          placeholder="Enter email address"
          @getInputState="updateFormState($event, 'email_address')"
          :error_handler="{
            type: 'email',
            message: 'Email address is not valid',
          }"
        />
      </div>

      <!-- PHONE INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="Phone number"
          label_id="phoneNumber"
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

      <!-- PASSWORD INPUT -->
      <div class="form-group">
        <BasicInput
          label_title="Password"
          label_id="password"
          input_type="password"
          :input_value="form.password"
          is_required
          placeholder="Enter password"
          :custom_style="{ input_wrapper_style: 'form-suffix' }"
          @getInputState="updateFormState($event, 'password')"
          :error_handler="{
            type: 'password',
            message: 'Password should contain at least 4 characters',
          }"
        />
      </div>

      <!-- TERMS AND CONDITION -->
      <div class="form-group">
        <div class="d-flex justify-content-start align-items-center">
          <input type="checkbox" v-model="accept_terms" class="mgr-10" />

          <div class="tertiary-2-text grey-900">
            I agree to
            <a href="https://vesicash.com/legal">Terms and Conditions</a>
          </div>
        </div>
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-35 mgb-10">
        <button
          class="btn btn-primary btn-md w-100"
          ref="registerBtn"
          :disabled="isValidState"
        >Register</button>
      </div>

      <!-- HELP BLOCK TEXT -->
      <div class="help-block text-center">
        Already have an account?
        <router-link to="/login" class="fw-medium">Login</router-link>
      </div>
    </form>
  </AuthWrapper>
</template>

<script>
import { mapActions } from "vuex";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "Register",

  metaInfo: {
    title: "Register",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
    BasicInput,
  },

  computed: {
    // GET THE CURRENT SELECTED ACCOUNT TYPE
    getAccount() {
      return this.account_type.includes(this.$route?.params?.account)
        ? this.$route?.params?.account
        : "individual";
    },

    // CHECK FORM BUTTON VALIDITY STATE
    isValidState() {
      if (this.getAccount === "individual") {
        delete this.validity.business_name;
      }

      return Object.values(this.validity).every((valid) => !valid) &&
        this.accept_terms
        ? false
        : true;
    },
  },

  data() {
    return {
      account_type: ["individual", "business"],

      form: {
        business_name: "",
        account_type: this.$route?.params?.account ?? "individual",
        firstname: "",
        lastname: "",
        email_address: "",
        phone_number: "",
        country: "",
        password: "",
      },

      validity: {
        business_name: true,
        account_type: false,
        firstname: true,
        lastname: true,
        email_address: true,
        phone_number: true,
        country: false,
        password: true,
      },

      accept_terms: false,
      user_details: {},
    };
  },

  created() {
    // ==========================================
    // UPDATE USER SELECTED COUNTRY STATE
    // ==========================================
    this.$bus.$on(
      "update-country-state",
      (country) => (this.form.country = country.toLowerCase())
    );
  },

  methods: {
    ...mapActions({
      registerUser: "auth/registerUser",
      sendUserOTP: "auth/sendUserOTP",
    }),

    // ===========================================
    // HANDLE USER CLIENT REGISTRATION
    // ===========================================
    handleUserRegister() {
      this.handleClick("registerBtn");

      // REMOVE BUSINESS NAME FROM INDIVIDUAL SIGNUP
      if (this.getAccount === "individual") {
        delete this.form.business_name;
      }

      this.registerUser(this.form)
        .then((response) => {
          if (response.code === 200) {
            // CHECK FOR EXISTING PHONE NUMBER
            if (response?.data?.existing === "phone") {
              this.handleSignupError("Phone number entered, already exist!");
            }

            // CHECK FOR EXISTING EMAIL ADDRESS
            else if (response?.data?.existing === "email") {
              this.handleSignupError("Email address entered, already exist!");
            }

            // SEND OUT USER OTP CODE AND REDIRECT TO OTP PAGE
            else {
              this.user_details = response?.data?.user ?? {};
              this.handleOTPInitiation(); // SEND USER OTP
            }
          }

          // HANDLE NON 200 RESPONSE
          else this.handleSignupError();
        })
        .catch(() => this.handleSignupError());
    },

    // =======================================
    // HANDLE SIGNUP ERROR RESPONSE FLOW
    // =======================================
    handleSignupError(message = "Unable to create your account at this time") {
      this.pushToast(message, "error");

      // REVERT BUTTON STATE TO DEFAULT STATE
      setTimeout(
        () => this.handleClick("registerBtn", "Register", false),
        1000
      );
    },

    // =======================================
    // HANDLE THE INITIATION OF USER OTP
    // =======================================
    handleOTPInitiation() {
      let request_payload = { account_id: this.user_details?.account_id };

      this.sendUserOTP(request_payload)
        .then(() => this.handleOTPRedirect())
        .catch(() => this.handleOTPRedirect());
    },

    // =====================================
    // HANDLE USER OTP REDIRECT
    // =====================================
    handleOTPRedirect() {
      this.handleClick("registerBtn", "Register", false);
      this.pushToast("Your vesicash account has been created", "success");

      setTimeout(() => {
        this.$router.push({
          name: "VesicashVerifyOTP",
          params: { account_id: this.user_details?.account_id },
          query: { user_email: this.user_details?.email_address },
        });
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
