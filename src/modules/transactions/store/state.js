import { CURRENCY_OPTIONS } from "@/modules/transactions/constants";

export default () => ({
  transaction: {
    name: "",
    type: "",
    parties: "",
    file: [],
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
});

// SAMPLE BENEFICIARY OBJECT
// {
//     id: "";
//     account_id: "";
//     email_address: "";
//     phone_number: "";
//     role: "";
//     access: "";
//     recipient: "";
//      amount: 0,
// }

// SAMPLE MILESTONE OBJECT
// {
//     id: "";
//     name: "";
//     due_date: "";
//     inspection_period: "";
// }
