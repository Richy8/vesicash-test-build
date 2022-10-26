<template>
  <div class="row justify-content-between border">
    <div class="col-12 col-sm-6">
      <div class="form-group">
        <BasicInput
          label_title="Recipient’s email"
          label_id="userEmail1"
          input_type="email"
          :input_value="recipient.email_address"
          is_disabled
        />
      </div>
    </div>

    <div class="col-12 col-sm-6">
      <div class="form-group">
        <BasicInput
          label_title="Amount"
          label_id="amount"
          input_type="number"
          is_required
          placeholder="0.00"
          :currency="currency.name"
          :input_value="recipient.amount"
          :custom_style="{
            input_wrapper_style: 'form-prefix form-prefix-right',
          }"
          @getInputState="updateUserRecipientData($event.value)"
          :error_handler="{
            type: 'required',
            message: 'Amount field is required',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "RecipientTransactionRow",

  components: {
    BasicInput,
  },

  props: {
    recipient_index: {
      type: Number,
    },

    recipient: {
      type: Object,
      default: () => ({}),
    },

    currency: {
      type: Object,
      default: () => ({}),
    },

    milestone_id: {
      type: String,
    },
  },

  computed: {
    ...mapGetters({
      getTransactionMilestones: "transactions/getTransactionMilestones",
    }),
  },

  methods: {
    ...mapMutations({
      UPDATE_MILESTONE_DATA: "transactions/UPDATE_MILESTONE_DATA",
      UPDATE_MILESTONE_RECIPIENT: "transactions/UPDATE_MILESTONE_RECIPIENT",
      UPDATE_TRANSACTION_MILESTONE: "transactions/UPDATE_TRANSACTION_MILESTONE",
      EVALUATE_TRANSACTION_FEES: "transactions/EVALUATE_TRANSACTION_FEES",
    }),

    updateUserRecipientData(value) {
      let recipient_data = { ...this.recipient };
      recipient_data.amount = value;

      let milestone_data_index = this.getTransactionMilestones.findIndex(
        (milestone) => milestone.id === this.milestone_id
      );

      this.getTransactionMilestones[milestone_data_index].recipients.splice(
        this.recipient_index,
        1,
        recipient_data
      );

      this.UPDATE_TRANSACTION_MILESTONE([...this.getTransactionMilestones]);
    },
  },
};
</script>

<style>
</style>