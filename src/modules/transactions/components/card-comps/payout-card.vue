<template>
  <div class="payout-card rounded-16 border-grey-100">
    <!-- CARD TITLE -->
    <div
      class="card-title primary-2-text grey-900 mgb-24"
      v-if="getTransactionType === 'milestone'"
    >
      {{ getMilestoneName }}
    </div>

    <!-- PAYOUT INPUTS -->
    <div class="payout-inputs">
      <div class="row">
        <!-- PAYMENT CURRENCY -->
        <div class="col-12 col-sm-6" v-if="index === 0">
          <div class="form-group">
            <label class="form-label"> Select payment currency </label>
            <DropSelectInput
              :pre_select="currency"
              @selectedOption="
                updateUserSelection('currency', $event, currency_options, true)
              "
              placeholder="Select currency"
              :options="currency_options"
            />
          </div>
        </div>

        <!-- MILESTONE NAME -->
        <div
          class="col-12 col-sm-6"
          :class="getTransactionType === 'oneoff' && 'invisible'"
        >
          <div class="form-group">
            <BasicInput
              label_title="Milestone name"
              label_id="milestoneName"
              :input_value="milestone.name || form.milestone_name"
              placeholder="What milestone is this?"
              @getInputState="updateUserInput('name', $event.value)"
            />
          </div>
        </div>

        <!-- HOLDING INVISIBLE SPACE -->
        <div
          class="col-12 col-sm-6"
          :class="index > 0 ? 'invisible' : 'd-none'"
        ></div>

        <!-- RECIPIENTS DATA -->
        <template v-for="(user, user_index) in loadCurrentMilestoneRecipients">
          <div class="col-12 col-sm-6" :key="`${user_index}a`">
            <div class="form-group">
              <BasicInput
                label_title="Recipient’s email"
                label_id="userEmail1"
                input_type="email"
                :input_value="user.email_address"
                is_disabled
              />
            </div>
          </div>

          <div class="col-12 col-sm-6" :key="`${user_index}b`">
            <div class="form-group">
              <BasicInput
                label_title="Amount"
                label_id="amount"
                input_type="number"
                is_required
                placeholder="0.00"
                :currency="currency.name"
                :input_value="user.amount"
                :custom_style="{
                  input_wrapper_style: 'form-prefix form-prefix-right',
                }"
                @getInputState="
                  updateUserRecipientAmount($event.value, user.update_id)
                "
                :error_handler="{
                  type: 'required',
                  message: 'Amount field is required',
                }"
              />
            </div>
          </div>
        </template>

        <!-- PAYMENT DUE DATE -->
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <BasicInput
              label_title="Due date"
              label_id="dueDate"
              input_type="date"
              :input_value="milestone.due_date || form.due_date"
              placeholder="Select date"
              is_required
              @getInputState="updateUserInput('due_date', $event.value)"
            />
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label class="form-label"> Inspection period (Days) </label>
            <DropSelectInput
              :pre_select="milestone.inspection_period"
              @selectedOption="
                updateUserSelection(
                  'inspection_period',
                  $event,
                  inspection_options
                )
              "
              placeholder="Select inspection period"
              :options="inspection_options"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CURRENCY_OPTIONS,
  INSPECTION_OPTIONS,
} from "@/modules/transactions/constants";
import { mapGetters, mapMutations } from "vuex";
import BasicInput from "@/shared/components/form-comps/basic-input";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "PayoutCard",

  components: {
    BasicInput,
    DropSelectInput,
  },

  props: {
    index: {
      type: Number,
    },

    milestone: {
      type: Object,
      default: () => ({}),
    },

    currency: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters({
      getMilestoneRecipients: "transactions/getMilestoneRecipients",
    }),

    // =============================================
    // GET THE TRANSACTION PARTY TYPE FROM ROUTE
    // =============================================
    getTransactionParty() {
      return this.$route.query.party ? this.$route.query.party : "single";
    },

    // ===================================================
    // GET THE TRANSACTION DISBURSEMENT TYPE FROM ROUTE
    // ===================================================
    getTransactionType() {
      return this.$route.query.type ? this.$route.query.type : "oneoff";
    },

    // ===================================================
    // GET THE TRANSACTION MILESTONE NAME
    // ===================================================
    getMilestoneName() {
      return this.milestone.name
        ? this.milestone.name
        : `Milestone ${this.index + 1}`;
    },

    loadCurrentMilestoneRecipients() {
      return this.getMilestoneRecipients.filter(
        (recipient) => recipient.milestone_id === this.milestone.id
      );
    },
  },

  data: () => ({
    currency_options: CURRENCY_OPTIONS,
    inspection_options: INSPECTION_OPTIONS,

    form: {
      milestone_name: "",
      due_date: "",
      inspection_period: "",
    },
  }),

  methods: {
    ...mapMutations({
      UPDATE_MILESTONE_DATA: "transactions/UPDATE_MILESTONE_DATA",
      UPDATE_RECIPIENT_AMOUNT: "transactions/UPDATE_RECIPIENT_AMOUNT",
      EVALUATE_TRANSACTION_FEES: "transactions/EVALUATE_TRANSACTION_FEES",
    }),

    updateUserSelection(type, value, options, outer = false) {
      let selected = options.find((option) => option.id === value);

      let milestone_data = { ...this.milestone };
      milestone_data[type] = selected;

      let outer_data = outer ? { type, selected } : {};

      this.UPDATE_MILESTONE_DATA({
        milestone_index: this.index,
        milestone_data,
        outer_data,
      });
    },

    updateUserInput(type, value) {
      let milestone_data = { ...this.milestone };
      milestone_data[type] = value;

      this.UPDATE_MILESTONE_DATA({
        milestone_index: this.index,
        milestone_data,
      });
    },

    updateUserRecipientAmount(value, update_id) {
      let recipient_index = this.getMilestoneRecipients.findIndex(
        (user) => user.update_id == update_id
      );

      let recipient_payload = {
        ...this.getMilestoneRecipients[recipient_index],
      };
      recipient_payload.amount = value;

      this.UPDATE_RECIPIENT_AMOUNT({ recipient_payload, recipient_index });

      // RE-EVALUATE TOTAL FEE
      // this.EVALUATE_TRANSACTION_FEES();
    },
  },
};
</script>

<style lang="scss" scoped>
.payout-card {
  margin-bottom: toRem(15);
  padding: toRem(24);
  padding-bottom: toRem(5);

  @include breakpoint-down(sm) {
    padding: toRem(16);
  }

  &:last-of-type {
    margin-bottom: toRem(32);
  }

  .payout-inputs {
    .row {
      @include flex-row-between-wrap;
    }
  }
}
</style>
