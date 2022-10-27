import $api from "@/services/service-api";

const routes = {
  login_user: "/auth/login",
  register_user: "/auth/signup",
  send_user_otp: "/auth/send_otp",
  verify_user_otp: "/auth/is_otp_valid",
  request_password: "/auth/reset-password",
  reset_password: "/auth/reset-password/change-password",
};

export default {
  // ============================================
  // LOGIN A USER INTO VESICASH ACCOUNT
  // ============================================
  async loginUser({ commit }, payload) {
    let response = await $api.push(routes.login_user, { payload });
    if (response.code === 200) commit("AUTH_SUCCESS", response.data);
    return response;
  },

  // ============================================
  // REGISTER A USER (PERSONAL / BUSINESS)
  // ============================================
  async registerUser(_, payload) {
    return await $api.push(routes.register_user, { payload });
  },

  // ============================================
  // REGISTER BULK USERS (PERSONAL / BUSINESS)
  // ============================================
  async registerBulkUsers(_, payload) {
    return await $api.push(`${routes.register_user}/bulk`, { payload });
  },

  // ============================================
  // SEND OTP TO REGISTERED USER
  // ============================================
  async sendUserOTP(_, payload) {
    return await $api.push(routes.send_user_otp, { payload });
  },

  // ============================================
  // VERIFY OTP TO SENT TP REGISTERED USER
  // ============================================
  async verifyUserOTP(_, payload) {
    return await $api.push(routes.verify_user_otp, { payload });
  },

  // ============================================
  // REQUEST A USER PASSWORD UPDATE
  // ============================================
  async requestUserPassword(_, payload) {
    return await $api.push(routes.request_password, { payload });
  },

  // ============================================
  // RESET A USER PASSWORD
  // ============================================
  async resetUserPassword(_, payload) {
    return await $api.push(routes.reset_password, { payload });
  },

  // ============================================
  // LOGOUT A USER FROM VESICASH ACCOUNT
  // ============================================
  async logOutUser({ commit }) {
    commit("AUTH_LOGOUT");
  },
};
