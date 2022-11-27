<template>
  <div class="confirm-fund-payout">
    <div class="disbursement-title h4-text grey-900 mgb-32">
      Confirm details for:
      <br />
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
                  getTransactionType === 'oneoff'
                    ? 'One-off disbursement type'
                    : 'Milestone disbursement type',
              },
              {
                title: 'Transacting Parties',
                value:
                  getTransactionParty === 'single'
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
                file: getTransactionSetup.files.length
                  ? {
                      name: getTransactionSetup.files[0].name,
                      url: getTransactionSetup.files[0].url,
                    }
                  : null,
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
          :type="getTransactionParty"
          :dataset="getTransactionBeneficiaries"
          :loading="false"
          :evaluate_cta="true"
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
      <button
        class="btn btn-primary btn-md"
        ref="createEscrowBtn"
        @click="createTransaction"
      >
        Create escrow
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

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

    // ===================================================
    // GET THE TRANSACTION DISBURSEMENT TYPE FROM ROUTE
    // ===================================================
    getTransactionType() {
      return this.$route.query.type ? this.$route.query.type : "oneoff";
    },

    // =============================================
    // GET THE TRANSACTION PARTY TYPE FROM ROUTE
    // =============================================
    getTransactionParty() {
      return this.$route.query.party ? this.$route.query.party : "single";
    },

    // =============================================
    // GET THE TRANSACTION PAYMENT TYPE
    // =============================================
    userCanMakePayment() {
      return this.$route.query.pay ? true : false;
    },
  },

  mounted() {
    // this.togglePageLoader("Creating escrow transaction");
  },

  methods: {
    ...mapActions({
      registerBulkUsers: "auth/registerBulkUsers",
      createUserTransaction: "transactions/createUserTransaction",
      sendUserTransaction: "transactions/sendUserTransaction",
    }),

    ...mapMutations({
      UPDATE_TRANSACTION_BENEFICIARIES:
        "transactions/UPDATE_TRANSACTION_BENEFICIARIES",
      UPDATE_MILESTONE_RECIPIENT: "transactions/UPDATE_MILESTONE_RECIPIENT",
    }),

    createTransaction() {
      this.handleClick("createEscrowBtn");
      this.togglePageLoader("Creating escrow transaction");
      this.signupBulkUsers();
    },

    // =======================================
    // SIGNUP ALL USERS WITHOUT ACCOUNT ID
    // =======================================
    async signupBulkUsers() {
      let signup_payload = [];
      let users = this.getTransactionBeneficiaries.filter(
        (user) => !user.account_id
      );

      // console.log(users);

      users.map((user) => {
        signup_payload.push({
          account_type: "individual",
          email_address: user.email_address,
          country: user.country?.toLowerCase(),
          phone_number: user.phone_number,
        });
      });

      if (signup_payload.length) {
        this.registerBulkUsers({ bulk: signup_payload })
          .then((response) => {
            // console.log("RESPONSE", response);

            // RETRY BULK UPLOAD IF IT RETURNS 500 RESPONSE
            if (response.code === 500) {
              this.signupBulkUsers();
              return false;
            }

            let user_payload = [];
            let updated_beneficiaries = [];
            let updated_recipients = [];

            let cloned_beneficiaries = [...this.getTransactionBeneficiaries];
            let cloned_recipients = [...this.getMilestoneRecipients];

            // CREATE NEW USER PAYLOAD
            response.data?.bulk.map((user) => {
              user_payload.push({
                account_id: user.account_id,
                email_address: user.email_address ?? user.email,
              });
            });

            this.updateUserData(
              cloned_beneficiaries,
              updated_beneficiaries,
              user_payload
            );

            this.updateUserData(
              cloned_recipients,
              updated_recipients,
              user_payload
            );

            this.UPDATE_TRANSACTION_BENEFICIARIES(updated_beneficiaries);
            this.UPDATE_MILESTONE_RECIPIENT(updated_recipients);

            setTimeout(() => this.setupAndCreateTransaction(), 300);
            return true;
          })
          .catch(() => {
            this.handleEscrowError("An error occured while creating users");
            return false;
          });
      } else {
        setTimeout(() => this.setupAndCreateTransaction(), 300);
      }
    },

    // =======================================
    // HELPER FUNCTION TO UPDATE USER STATE
    // =======================================
    updateUserData(list, store, user_payload) {
      list.map((user) => {
        let user_index = user_payload.findIndex(
          (u) => u.email_address === user.email_address
        );

        if (user_index !== -1)
          user.account_id = user_payload[user_index].account_id;

        store.push(user);
      });
    },

    // ================================================
    // SETUP UP THE TRANSACTION PAYLOAD AND CREATE IT
    // ================================================
    setupAndCreateTransaction() {
      let transaction_payload = {};

      transaction_payload.title = this.getTransactionSetup.name;
      transaction_payload.currency =
        this.getTransactionAmount.currency?.name.split(" ")[0];

      transaction_payload.type = this.getTransactionSetup.type;
      transaction_payload.amount = this.getTransactionAmount.total_fee;

      transaction_payload.files = this.getTransactionSetup.files;
      transaction_payload.dispute_handler =
        this.getTransactionSetup.dispute_handler;
      transaction_payload.source = "api";

      // GENERATE PARTIES PAYLOAD
      let parties_payload = [];

      this.getTransactionBeneficiaries.map((user) => {
        let party_obj = {};

        party_obj.account_id = user.account_id;
        party_obj.role = user.role?.name.toLowerCase();
        party_obj.status = user.status;
        party_obj.access_level = {
          can_view: true,
          can_receive: user.recipient.name === "Yes" ? true : false,
          mark_as_done: user.access.name === "Mark as done" ? true : false,
          approve: user.access.name === "Approve" ? true : false,
        };

        parties_payload.push(party_obj);
      });

      // SETUP MILESTONE PAYLOAD FOR ALL TRANSACTION
      let milestone_payload = [];

      this.getTransactionMilestones.map((milestone, index) => {
        let milestone_obj = {};

        milestone_obj.title = milestone.name
          ? milestone.name
          : `Milestone ${index + 1}`;

        milestone_obj.status = milestone.status;

        milestone_obj.amount =
          this.getTransactionAmount.milestone_amounts[index];

        milestone_obj.inspection_period =
          milestone.inspection_period.name.split(" ")[0];
        milestone_obj.due_date = milestone.due_date;

        // FETCH MILESTONE RECIPIENTS
        let milestone_recipients = this.getMilestoneRecipients.filter(
          (user) => user.milestone_id === milestone.id
        );

        let recipients_payload = [];
        milestone_recipients.map((user) => {
          let recipient_obj = {};

          recipient_obj.account_id = user.account_id;
          recipient_obj.amount = Number(user.amount);

          // PUSH RECIPIENT OBJECT INTO THE RECIPIENT PAYLOAD
          recipients_payload.push(recipient_obj);
        });

        milestone_obj.recipients = recipients_payload;

        // PUSH MILESTONE OBJECT INTO THE MILESTONE PAYLOAD
        milestone_payload.push(milestone_obj);
      });

      // UPDATE PARTIES AND MILESTONE DATA
      transaction_payload.parties = parties_payload;
      transaction_payload.milestones = milestone_payload;

      // CALL AN API TO CREATE TRANSACTION
      setTimeout(() => this.createMyTransaction(transaction_payload), 300);
    },

    // ================================================
    // CREATE MY TRANSACTION
    // ================================================
    createMyTransaction(transaction_payload) {
      this.createUserTransaction(transaction_payload)
        .then((response) => {
          // console.log(response);

          if (response.code === 200) {
            let transaction_id = response?.data?.transaction?.transaction_id;
            this.sendOutCreatedTransaction(transaction_id);
          } else {
            this.pushToast(
              "Transaction cannot be created at this time",
              "error"
            );
            this.handleClick("createEscrowBtn", "Create Escrow", false);
            this.togglePageLoader("");
            return false;
          }
        })
        .catch(() => {
          this.handleEscrowError("An error occured while creating escrow");
          this.handleClick("createEscrowBtn", "Create Escrow", false);
          this.togglePageLoader("");
          return false;
        });
    },

    // ================================================
    // SEND OUT CREATED TRANSACTION TO USERS INVOLVED
    // ================================================
    sendOutCreatedTransaction(transaction_id) {
      let request_payload = { transaction_id };

      this.sendUserTransaction(request_payload)
        .then((response) => {
          if (response.code === 200) {
            this.togglePageLoader("");
            this.pushToast("Escrow created successfully", "success");

            setTimeout(() => {
              if (this.$route.query.pay) {
                this.$router.push({
                  name: "TransactionPayment",
                  query: {
                    type: this.$route.query.type,
                    party: this.$route.query.party,
                    transaction_id,
                    name: this.$route.query.name,
                    parties: this.$route.query.parties,
                    fee: this.$route.query.fee,
                  },
                });
              } else this.$router.push({ name: "VesicashDashboard" });
            }, 2000);
          }
        })
        .catch(() => {
          this.handleEscrowError(
            "An error occured while inviting users to escrow"
          );
          this.togglePageLoader("");
          return false;
        });
    },

    // =================================
    // HANDLE ESCROW CREATION ERROR
    // =================================
    handleEscrowError(message) {
      this.pushToast(message, "error");
      this.handleClick("createEscrowBtn", "Create escrow", false);
      this.togglePageLoader("");
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
