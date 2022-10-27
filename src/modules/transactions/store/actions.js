import $api from "@/services/service-api";

const routes = {
    all_transactions: "transactions/listByUser",
};

export default {
    // ==================================
    // FETCH ALL USER TRANSACTIONS
    // ==================================
    async fetchTransactionsByUser(_, { payload, page, limit = 20 }) {
        return await $api.push(
            `${routes.all_transactions}?limit=${limit}&page=${page}`, {
                payload,
            }
        );
    },
};