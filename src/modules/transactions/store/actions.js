import $api from "@/services/service-api";

const routes = {
  all_transactions: "/transactions/listByUser",
  fetch_single_transaction: "/transactions/listById/",
  create_transaction: "/transactions/create",
  send_transaction: "/transactions/send",
  start_card_payment: "/payment/pay",
  confirm_payment_status: "/payment/pay/status",
  update_party_status: "/transactions/parties/update-status",
  update_milestone_status: "/transactions/updateStatus",
  renew_milestone_date: "/transactions/approve/due_date_extension",
};

export default {
  // ==================================
  // FETCH ALL USER TRANSACTIONS
  // ==================================
  async fetchTransactionsByUser(_, { payload, page, limit = 20 }) {
    return await $api.push(
      `${routes.all_transactions}?limit=${limit}&page=${page}`,
      {
        payload,
      }
    );
  },

  // ==================================
  // FETCH TRANSACTION BY ID
  // ==================================
  async fetchTransactionById(_, { transaction_id }) {
    return await $api.push(
      `${routes.fetch_single_transaction}${transaction_id}`,
      {}
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

  // ==================================
  // CONFIRM PAYMENT STATUS
  // ==================================
  async confirmPaymentStatus(_, payload) {
    return await $api.push(routes.confirm_payment_status, { payload });
  },

  // ==================================
  // UPDATE TRANSACTION PARTY STATUS
  // ==================================
  async updateTransactionParty(_, payload) {
    return await $api.push(routes.update_party_status, { payload });
  },

  // ======================================
  // UPDATE MILESTONE TRANSACTION STATUS
  // ======================================
  async updateMilestoneTransaction(_, payload) {
    return await $api.push(routes.update_milestone_status, { payload });
  },

  // ======================================
  // RENEW MILESTONE TRANSACTION DATE
  // ======================================
  async renewMilestoneDate(_, payload) {
    return await $api.push(routes.renew_milestone_date, { payload });
  },
};
