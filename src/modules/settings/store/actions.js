import $api from "@/services/service-api";

const routes = {
    user_banks: "/admin/user/fetch/bank/",
    update_user_banks: "/admin/user/update/bank",
    remove_user_bank: "/admin/user/remove/bank/",

    update_user_password: "/auth/user/security/update_password",

    request_otp: "/verification/phone/send-code",
    verify_otp: "/verification/phone/verify",
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
    // REQUEST OTP
    // ==============================
    async requestOTP(_, payload) {
        return await $api.push(routes.request_otp, { payload });
    },

    // ==============================
    // VERIFY OTP
    // ==============================
    async verifyOTP(_, payload) {
        return await $api.push(routes.verify_otp, { payload });
    },
};