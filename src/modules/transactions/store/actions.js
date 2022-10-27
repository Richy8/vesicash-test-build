import $api from "@/services/service-api";

const routes = {
  all_transactions: "/transactions/listByUser",
  create_transaction: "/transactions/create",
};

export default {
  // ==================================
  // FETCH ALL USER TRANSACTIONS
  // ==================================
  async fetchTransactionsByUser(_, payload) {
    return await $api.push(routes.all_transactions, { payload });
  },
};
