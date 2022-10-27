export default {
  UPDATE_CACHED_TRANSACTION: (state, payload) => {
    state.transaction = { ...payload };
  },

  UPDATE_TRANSACTION_SETUP: (state, payload) => {
    state.transaction.name = payload.transaction_name;
    state.transaction.type = payload.transaction_type;
    state.transaction.parties = payload.transaction_party;
  },

  UPDATE_TRANSACTION_BENEFICIARIES: (state, payload) => {
    state.transaction.beneficiaries = payload;
  },

  UPDATE_TRANSACTION_MILESTONE: (state, payload) => {
    state.transaction.milestones = payload;
  },

  UPDATE_TRANSACTION_DISPUTE_MGT: (state, payload) => {
    state.transaction.dispute_handler = payload;
  },

  UPDATE_MILESTONE_DATA: (
    state,
    { milestone_index, milestone_data, outer_data = {} }
  ) => {
    Object.values(outer_data).length
      ? (state.transaction[outer_data.type] = outer_data.selected)
      : state.transaction.milestones.splice(milestone_index, 1, milestone_data);
  },

  UPDATE_MILESTONE_RECIPIENT: (state, payload) => {
    state.transaction.milestone_recipients = payload;
  },

  UPDATE_RECIPIENT_AMOUNT: (state, { recipient_payload, recipient_index }) => {
    state.transaction.milestone_recipients.splice(
      recipient_index,
      1,
      recipient_payload
    );
  },

  EVALUATE_TRANSACTION_FEES: (state) => {
    let amount_list = [];

    // LOOP THROUGH ALL MILESTONES RECIPIENTS AND EXTRACT THEIR AMOUNT
    state.transaction.milestones.map((milestone) => {
      let amount = [];

      state.transaction.milestone_recipients.map((user) => {
        if (user.milestone_id === milestone.id)
          amount.push(Number(user.amount));
      });

      // REDUCE AMOUNT
      amount_list.push(amount.reduce((prev, next) => (prev += next), 0));
    });

    let sum_total = amount_list.reduce((prev, next) => (prev += next), 0);

    state.transaction.milestone_amounts = amount_list;
    state.transaction.escrow_fee = sum_total * 0.15;
    state.transaction.total_fee = sum_total + state.transaction.escrow_fee;
  },
};
