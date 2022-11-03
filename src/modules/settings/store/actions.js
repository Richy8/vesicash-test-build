import $api from "@/services/service-api";

const routes = {
    user_banks: "/admin/user/fetch/bank/",
    update_user_banks: "/admin/user/update/bank",
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
};