<template>
  <div class="fund-details">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Add Transaction Details
    </div>

    <!-- TRANSACTION NAME -->
    <div class="row mgb-10">
      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
        <div class="form-group">
          <BasicInput
            label_title="Transaction name"
            label_id="transactionName"
            is_required
            placeholder="Please give this transaction a name"
            :input_value="getTransactionSetup.name || form.transaction_name"
            @getInputState="updateFormState($event, 'transaction_name')"
            :error_handler="{
              type: 'required',
              message: 'Transaction name is required',
            }"
          />
        </div>
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div class="disbursement-type-title grey-900 primary-1-text mgb-10">
      How many people are transacting?
    </div>

    <!-- TRANSACTING PARTY SELECTIONS -->
    <div class="disbursement-type-selections row mgb-8">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in transacting_party"
        :key="index"
      >
        <FundDisburseTypeCard
          :key="index"
          :details="fund"
          :index="index"
          @updateSelection="updateUserSelection"
        />
      </div>
    </div>

    <!-- DISBURSEMENT TYPE TITLE -->
    <div class="disbursement-type-title grey-900 primary-1-text mgb-10">
      How will this payment be disbursed?
    </div>

    <!-- DISBURSEMENT TYPE SELECTIONS -->
    <div class="disbursement-type-selections row mgb-12">
      <div
        class="col-12 col-sm-6 col-lg-5 col-xl-4"
        v-for="(fund, index) in disbursement_types"
        :key="index"
      >
        <FundDisburseTypeCard
          :details="fund"
          :index="index"
          @updateSelection="updateUserSelection"
        />
      </div>
    </div>

    <!-- DISPUTE POLICY -->
    <template>
      <div class="disbursement-type-title grey-900 primary-1-text mgb-10">
        Attach a contract or document (Optional)
      </div>

      <div class="col-12 col-lg-10 col-xl-8 mgb-40">
        <ContractUploadCard />
      </div>
    </template>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button
        class="btn btn-primary btn-md"
        :disabled="isDisabled"
        @click="nextProgressFlow"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "TransactionSetup",

  components: {
    BasicInput,
    FundDisburseTypeCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/fund-disburse-type-card"
      ),
    ContractUploadCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/contract-upload-card"
      ),
  },

  computed: {
    ...mapGetters({ getTransactionSetup: "transactions/getTransactionSetup" }),

    isDisabled() {
      return Object.values(this.form).every((valid) => valid?.length)
        ? false
        : true;
    },
  },

  watch: {
    getTransactionSetup: {
      handler(value) {
        let transaction_type = value.type;
        let transaction_party = value.parties;

        this.form.transaction_name = value.name;
        this.form.transaction_type = value.type;
        this.form.transaction_party = value.parties;

        this.disbursement_types.map((data) =>
          data.slug === transaction_type
            ? (data.selected = true)
            : (data.selected = false)
        );

        this.transacting_party.map((data) =>
          data.slug === transaction_party
            ? (data.selected = true)
            : (data.selected = false)
        );
      },
      immediate: true,
    },
  },

  data() {
    return {
      disbursement_types: [
        {
          title: "One off disbursement",
          slug: "oneoff",
          description:
            "Your payment will be released in a single disbursement according to payout rules.",
          type: "disbursement",
          selected: false,
        },
        {
          title: "In Milestones",
          slug: "milestone",
          description:
            "Your payment will be released in multiple disbursements based on agreed milestones.",
          type: "disbursement",
          selected: false,
        },
      ],

      transacting_party: [
        {
          title: "Two parties",
          slug: "single",
          description:
            "An escrow transaction involving just two parties/entities (buyer and seller).",
          type: "transactions",
          selected: false,
        },
        {
          title: "Multiple parties",
          slug: "multiple",
          description:
            "Provides involvement for a minimum of 3 parties. Set commissions and control access.",
          type: "transactions",
          selected: false,
        },
      ],

      form: {
        transaction_name: "",
        transaction_party: "",
        transaction_type: "",
      },

      validity: {
        transaction_name: true,
        transaction_party: true,
        transaction_type: true,
      },
    };
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_SETUP: "transactions/UPDATE_TRANSACTION_SETUP",
    }),

    nextProgressFlow() {
      this.UPDATE_TRANSACTION_SETUP(this.form);

      this.$router.push({
        name: "TransactionParties",
        query: {
          type: this.form.transaction_type,
          party: this.form.transaction_party,
        },
      });
    },

    updateUserSelection(data) {
      if (data.type === "disbursement") {
        this.disbursement_types.map((item) => (item.selected = false));
        this.disbursement_types[data.index].selected = true;
        this.form.transaction_type = this.disbursement_types[data.index].slug;
      } else {
        this.transacting_party.map((item) => (item.selected = false));
        this.transacting_party[data.index].selected = true;
        this.form.transaction_party = this.transacting_party[data.index].slug;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.disbursement-title {
  @include breakpoint-down(xl) {
    @include generate-font-type("h5");
  }
}

.disbursement-type-title {
  @include breakpoint-down(xs) {
    font-size: toRem(15.75);
  }
}

.disbursement-type-selections {
  @include flex-row-start-wrap;
  align-items: flex-start;

  .col-4 {
    margin-right: toRem(20);

    @include breakpoint-down(lg) {
      margin-right: 0;
    }

    @include breakpoint-down(md) {
      margin-right: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}

.action-row {
  padding-bottom: toRem(55);

  .btn {
    padding: toRem(9) toRem(24);
    width: toRem(260);

    @include breakpoint-down(xs) {
      width: 100%;
    }
  }
}
</style>
