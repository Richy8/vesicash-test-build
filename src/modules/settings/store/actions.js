import $api from "@/services/service-api";

const routes = {
    update_user_banks: '/admin/user/update/bank'
};

export default {
    // ==============================
    // ADD BANK ACCOUNT
    // ==============================

    async addNewBank(_, payload) {
        return await $api.push(routes.update_user_banks, { payload });
    },
}