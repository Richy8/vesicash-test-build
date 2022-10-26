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
   
  },

  EVALUATE_TRANSACTION_FEES: (state) => {
    let amount_list = [];

    // LOOP THROUGH ALL MILESTONES RECIPIENTS AND EXTRACT THEIR AMOUNT
    state.transaction.milestones.map((milestone) => {
      milestone.recipients.map((user) => amount_list.push(user.amount));
    });

    let amount_to_pay = amount_list.reduce(
      (prev, next) => (prev += Number(next)),
      0
    );

    state.transaction.amount = amount_to_pay;
    state.transaction.escrow_fee = amount_to_pay * 0.15;
    state.transaction.total_fee = amount_to_pay + state.transaction.escrow_fee;
  },
};
