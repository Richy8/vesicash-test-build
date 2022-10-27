<template>
  <div class="confirm-fund-payout">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Confirm details for:<br />
      {{ getTransactionSetup.name }}
    </div>

    <!-- FUND DETAILS SECTION -->
    <template name="fund-details-section">
      <div class="fund-details-section row">
        <!-- DISBURSEMENT DETAILS -->
        <div class="col-12 col-xl-6">
          <FundInfoCard
            card_title="Disbursement details"
            :card_items="[
              {
                title: 'Disbursement Type',
                value:
                  getTransactionSetup.type === 'oneoff'
                    ? 'One-off disbursement type'
                    : 'Milestone disbursement type',
              },
              {
                title: 'Transacting Parties',
                value:
                  getTransactionSetup.party === 'single'
                    ? 'Two parties'
                    : 'Multiple parties',
              },
            ]"
          />
        </div>

        <!-- DISPUTE HANDLING -->
        <div class="col-12 col-xl-5">
          <FundInfoCard
            card_title="Dispute handling"
            :card_items="[
              {
                title: 'Dispute Type',
                value:
                  getTransactionSetup.dispute_handler === 'vesicash'
                    ? 'Vesicash handles dispute'
                    : 'Arbitration',
              },
              {
                title: 'Attached Document(s)',
                value: 'No file attached',
                file: null,
              },
            ]"
          />
        </div>
      </div>
    </template>

    <!-- USERS INVOLVED SECTION -->
    <template name="users-involved-section">
      <div class="section-wrapper">
        <div class="section-title">Users Involved</div>

        <!-- FUND USERS INVOLVED TABLE -->
        <FundUsersTable
          :type="getTransactionSetup.party"
          :dataset="getTransactionBeneficiaries"
          :loading="false"
        />
      </div>
    </template>

    <!-- PAYMENT RULES SECTION -->
    <template name="payment-rules-section">
      <div class="section-wrapper">
        <div class="section-title">Payment Rules</div>

        <!-- PAYMENT RULES CARD -->
        <template>
          <PaymentRuleCard
            v-for="(milestone, index) in getTransactionMilestones"
            :key="index"
            :index="index"
            :milestone="milestone"
            :currency="getTransactionAmount.currency"
          />
        </template>
      </div>
    </template>

    <!-- SUMMATION TOTAL -->
    <div class="wrapper mgb-40">
      <div class="col-xl-9">
        <SummationCard
          :milestones="getTransactionMilestones"
          :amount_data="getTransactionAmount"
        />
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="createTransaction">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConfirmFundPayoutRules",

  components: {
    FundInfoCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/fund-info-card"
      ),

    FundUsersTable: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/fund-users-table"
      ),

    PaymentRuleCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/payment-rule-card"
      ),

    SummationCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/summation-card"
      ),
  },

  computed: {
    ...mapGetters({
      getTransactionSetup: "transactions/getTransactionSetup",
      getTransactionBeneficiaries: "transactions/getTransactionBeneficiaries",
      getTransactionMilestones: "transactions/getTransactionMilestones",
      getTransactionAmount: "transactions/getTransactionAmount",
      getMilestoneRecipients: "transactions/getMilestoneRecipients",
    }),
  },

  methods: {
    ...mapActions({ registerBulkUsers: "auth/registerBulkUsers" }),

    createTransaction() {
      this.signupBulkUsers();
      // this.$router.push({ name: "TransactionPayment" });
    },

    // =======================================
    // SIGNUP ALL USERS WITHOUT ACCOUNT ID
    // =======================================
    signupBulkUsers() {
      let signup_payload = [];

      let users = this.getTransactionBeneficiaries.filter(
        (user) => !user.account_id
      );

      users.map((user) => {
        signup_payload.push({
          account_type: "individual",
          email_address: user.email_address,
          country: user.country,
          phone: user.phone_number,
        });
      });

      console.log(signup_payload);

      this.registerBulkUsers({ bulk: signup_payload })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-fund-payout {
  .disbursement-title {
    @include breakpoint-down(xl) {
      @include generate-font-type("h5");
    }
  }

  .fund-details-section {
    @include flex-row-start-wrap;
  }

  .section-wrapper {
    margin-bottom: toRem(34);

    .section-title {
      @include generate-font-type("primary-1");
      color: getColor("grey-900");
      margin-bottom: toRem(8);
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
}
</style>
