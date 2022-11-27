import { CURRENCY_OPTIONS } from "@/modules/transactions/constants";

export default () => ({
  transaction: {
    name: "",
    type: "",
    parties: "",
    files: [],
    dispute_handler: "",

    currency: CURRENCY_OPTIONS[0],
    milestone_amounts: [],
    payment_amount: 0,
    escrow_fee: 0,
    total_fee: 0,

    beneficiaries: [],
    milestones: [],
    milestone_recipients: [],
  },

  transaction_details: {},
});
