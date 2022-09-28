<template>
  <AuthWrapper :title_text="`Register a ${getAccount} account`">
    <!-- AUTH PAGE -->
    <div class="auth-page">
      <!-- BUSINESS NAME INPUT -->
      <div class="form-group" v-if="getAccount === 'business'">
        <div class="form-label" for="businessName">Business name</div>
        <input
          type="text"
          id="businessName"
          class="form-control"
          placeholder="Enter your business name"
        />
      </div>

      <!-- FULLNAME INPUT -->
      <div class="form-group">
        <div class="form-label" for="fullName">Name</div>
        <input
          type="text"
          id="fullName"
          class="form-control"
          placeholder="Your full name"
        />
      </div>

      <!-- EMAIL ADDRESS INPUT -->
      <div class="form-group">
        <div class="form-label" for="emailAddress">Email address</div>
        <input
          type="email"
          id="emailAddress"
          class="form-control"
          placeholder="Enter email address"
        />
      </div>

      <!-- PHONE INPUT -->
      <div class="form-group">
        <div class="form-label" for="phoneNumber">Phone number</div>

        <div class="form-prefix">
          <input
            type="number"
            id="phoneNumber"
            class="form-control"
            placeholder="Enter your phone number"
          />

          <!-- PREFIX AREA -->
          <div class="prefix-select-area">
            <img v-lazy="loadFalseImage('flag.png')" alt="" />
            <div class="icon icon-caret-fill-down"></div>
          </div>
        </div>
      </div>

      <!-- PASSWORD INPUT -->
      <div class="form-group">
        <div class="form-label" for="password">Password</div>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Enter password"
        />
      </div>

      <!-- BUTTON AREA -->
      <div class="btn-area mgt-35 mgb-10">
        <button class="btn btn-primary btn-md w-100">Register</button>
      </div>

      <!-- HELP BLOCK TEXT -->
      <div class="help-block text-center">
        Already have an account?
        <router-link to="/login" class="fw-medium">Login</router-link>
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import AuthWrapper from "@/modules/auth/components/auth-wrapper";

export default {
  name: "Register",

  metaInfo: {
    title: "Register",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    AuthWrapper,
  },

  computed: {
    // ========================================
    // GET THE CURRENT SELECTED ACCOUNT TYPE
    // ========================================
    getAccount() {
      return this.account_type.includes(this.$route.params.account)
        ? this.$route.params.account
        : "personal";
    },
  },

  data: () => ({
    account_type: ["personal", "business"],
  }),
};
</script>

<style lang="scss" scoped>
</style>