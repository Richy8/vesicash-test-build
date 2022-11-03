import $api from "@/services/service-api";

const routes = {
    all_transactions: "/transactions/listByUser",
    create_transaction: "/transactions/create",
    send_transaction: "/transactions/send",
    start_card_payment: "/payment/pay",
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

    // ==================================
    // CREATE A USER TRANSACTION
    // ==================================
    async createUserTransaction(_, payload) {
        return await $api.push(routes.create_transaction, { payload });
    },

    // ==================================
    // SEND CREATED TRANSACTION TO USER
    // ==================================
    async sendUserTransaction(_, payload) {
        return await $api.push(routes.send_transaction, { payload });
    },

    // ==================================
    // START CARD PAYMENT
    // ==================================
    async startCardPayment(_, payload) {
        return await $api.push(routes.start_card_payment, { payload });
    },
};