import $api from "@/services/service-api";

const routes = {
  wallet_balance: "/admin/account/wallet",
  dollar_funding: "/payment/pay/headless",
  naira_wallet: "/payment/payment_account/list",
};

export default {
  // ==================================
  // GET APPLICATION WALLET BALANCE
  // ==================================
  async getWalletBalance(_, payload) {
    return await $api.push(routes.wallet_balance, { payload });
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
};
