import $api from "@/services/service-api";

const routes = {
    wallet_balance: "/admin/account/wallet",
    dollar_funding: "/payment/pay/headless",
    naira_wallet: "/payment/payment_account/list",
    verify_payment: "/payment/payment_account/verify",
    wallet_transactions: "/payment/list/wallet_funding",
    wallet_withdrawals: "/payment/list/wallet_withdrawals",
    bank_details: "/admin/user/fetch/bank",
    withdraw: "/payment/disbursement/wallet/withdraw",
};

export default {
    // ==================================
    // GET APPLICATION WALLET BALANCE
    // ==================================
    async getWalletBalance({ commit }, payload) {
        const response = await $api.push(routes.wallet_balance, { payload });
        if (response.code === 200)
            commit("SET_WALLET_BALANCES", response.data.wallets);
        return response;
    },

    // =============================================
    // INITIATE AYMENT GATEWAY FOR DOLLAR FUNDING
    // =============================================
    async initiateDollarFunds(_, payload) {
        return await $api.push(routes.dollar_funding, { payload });
    },

    // ====================================
    // FETCH NAIRA WALLET BANK DETAILS
    // ====================================
    async fetchNairaWalletBankDetails(_, payload) {
        return await $api.push(routes.naira_wallet, { payload });
    },

    // ====================================
    // VERIFY USER ACCOUNT PAYMENT
    // ====================================
    async verifyPaymentAccount(_, payload) {
        return await $api.push(routes.verify_payment, { payload });
    },

    // =====================================
    // FETCH ALL USER WALLET FUNDING TRANSACTIONS
    // =====================================
    async fetchWalletTransactions(_, { account_id, page }) {
        return await $api.push(
            `${routes.wallet_transactions}/${account_id}?page=${page}`, {}
        );
    },

    // =====================================
    // FETCH ALL USER WALLET WITHDRAWALS TRANSACTIONS
    // =====================================
    async fetchWalletWithdrawals(_, { account_id, page }) {
        return await $api.push(
            `${routes.wallet_withdrawals}/${account_id}?page=${page}`, {}
        );
    },

    // =====================================
    // FETCH USER BANK DETAILS
    // =====================================
    async fetchBankDetails(_, account_id) {
        return await $api.push(
            `${routes.bank_details}/${account_id}?array=true`, {}
        );
    },

    // =====================================
    // FETCH USER BANK DETAILS
    // =====================================
    async withdraw(_, payload) {
        return await $api.push(routes.withdraw, { payload });
    },
};