import $api from "@/services/service-api";

const routes = {
    user_banks: "/admin/user/fetch/bank/",
    update_user_banks: "/admin/user/update/bank",
    remove_user_bank: "/admin/user/remove/bank/",
    fetch_connected_users: "/admin/fetch-users-by-business",
    delete_connected_user: "/admin/user/delete",

    request_otp: "/verification/phone/send-code",
    verify_otp: "/verification/phone/verify",
    request_email_otp: "/verification/email",
    verify_email_otp: "/verification/email/verify",

    update_user_password: "/auth/user/security/update_password",
    update_profile: "/admin/user/update/account",
    update_business_info: "/admin/business/profile/update",

    fetch_verifications: "/verification/fetch",

    verify_document: "/verification/id/verify",
    verify_bvn: "/verification/bvn/verify",

    generate_api_keys: "/admin/tokens/generate",
};

export default {
    // ==============================
    // FETCH BANK ACCOUNTS
    // ==============================

    async fetchAllBanks({ commit }, account_id) {
        const response = await $api.push(
            `${routes.user_banks}${account_id}?array=true`, {}
        );

        if (response.code === 200) commit("SET_BANK_ACCOUNTS", response.data);

        return response;
    },

    // ==============================
    // ADD BANK ACCOUNT
    // ==============================

    async addNewBank(_, payload) {
        return await $api.push(routes.update_user_banks, { payload });
    },

    // ==============================
    // REMOVE BANK ACCOUNT
    // ==============================

    async removeUserBank(_, payload) {
        return await $api.push(routes.remove_user_bank, { payload });
    },

    // ==============================
    // UPDATE PASSWORD
    // ==============================
    async updateUserPassword(_, payload) {
        return await $api.push(routes.update_user_password, { payload });
    },

    // ==============================
    // REQUEST PHONE OTP
    // ==============================
    async requestOTP(_, payload) {
        return await $api.push(routes.request_otp, { payload });
    },

    // ==============================
    // REQUEST EMAIL OTP
    // ==============================
    async requestEmailOTP(_, payload) {
        return await $api.push(routes.request_email_otp, { payload });
    },

    // ==============================
    // VERIFY PHONE OTP
    // ==============================
    async verifyOTP(_, payload) {
        return await $api.push(routes.verify_otp, { payload });
    },

    // ==============================
    // VERIFY EMAIL OTP
    // ==============================
    async verifyEmailOTP(_, payload) {
        return await $api.push(routes.verify_email_otp, { payload });
    },

    // ==============================
    // UPDATE PROFILE
    // ==============================
    async saveUserProfile(_, payload) {
        return await $api.push(routes.update_profile, { payload });
    },

    // ==============================
    // GENERATE API KEYS
    // ==============================
    async generateAPIkeys({ commit }, payload) {
        const response = await $api.push(routes.generate_api_keys, { payload });
        if ([201, 200].includes(response.code))
            commit("SET_API_KEYS", response.data.V_PUBLIC_KEY);
        return response;
    },

    // ==============================
    // FETCH USER VERIFICATIONS
    // ==============================
    async fetchUserVerifications({ commit }, payload) {
        const response = await $api.push(routes.fetch_verifications, { payload });
        if (response.code == 200) commit("SET_VERIFICATIONS", response.data);
        return response;
    },

    // ==============================
    // VERIFY DOCUMENT
    // ==============================
    async verfiyUserDocument(_, payload) {
        const response = await $api.push(routes.verify_document, { payload });
        return response;
    },

    // ==============================
    // VERIFY BVN
    // ==============================
    async verfiyUserBVN(_, payload) {
        const response = await $api.push(routes.verify_bvn, { payload });
        return response;
    },

    // ==============================
    // UPDATE BUSINESS INFO
    // ==============================
    async updateUserBusinessInfo(_, payload) {
        const response = await $api.push(routes.update_business_info, { payload });
        return response;
    },

    // ==============================
    // FETCH CONNECTED USERS
    // ==============================
    async fetchConnectedUsers({ commit }, payload) {
        const response = await $api.push(routes.fetch_connected_users, { payload });
        if (response.code === 200) commit("SAVE_CONNECTED_USERS", response.data);
        return response;
    },

    // ==============================
    // DELETE CONNECTED USER
    // ==============================
    async deleteConnectedUser(_, payload) {
        const response = await $api.push(routes.delete_connected_user, { payload });
        return response;
    },
};