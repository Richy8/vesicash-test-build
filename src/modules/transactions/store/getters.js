export default {
  getTransactionSetup: (state) => {
    return {
      name: state.transaction.name,
      type: state.transaction.type,
      parties: state.transaction.parties,
      files: state.transaction.files,
      dispute_handler: state.transaction.dispute_handler,
    };
  },

  getTransactionBeneficiaries: (state) => state.transaction.beneficiaries,

  getTransactionMilestones: (state) => state.transaction.milestones,

  getMilestoneRecipients: (state) => state.transaction.milestone_recipients,

  getTransactionAmount: (state) => {
    return {
      currency: state.transaction.currency,
      milestone_amounts: state.transaction.milestone_amounts,
      escrow_fee: state.transaction.escrow_fee,
      total_fee: state.transaction.total_fee,
      payment_amount: state.transaction.payment_amount,
    };
  },

  getTransactionDetails: (state) => state.transaction_details,
};
