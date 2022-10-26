export default {
  getTransactionSetup: (state) => {
    return {
      name: state.transaction.name,
      type: state.transaction.type,
      parties: state.transaction.parties,
    };
  },

  getTransactionBeneficiaries: (state) => state.transaction.beneficiaries,

  getTransactionMilestones: (state) => state.transaction.milestones,

  getMilestoneRecipients: (state) => state.transaction.milestone_recipients,

  getTransactionAmount: (state) => {
    return {
      currency: state.transaction.currency,
      amount: state.transaction.amount,
      escrow_fee: state.transaction.escrow_fee,
      total_fee: state.transaction.total_fee,
    };
  },
};
