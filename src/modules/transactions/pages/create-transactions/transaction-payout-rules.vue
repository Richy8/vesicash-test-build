<template>
  <div class="fund-payout-rules">
    <div class="disbursement-title h4-text grey-900 mgb-32">Payout Details</div>

    <div class="instruction-wrapper col-xl-8 mgb-12">
      <!-- INSTRUCTION TEXT -->
      <div class="instruction-text grey-900 primary-2-text mgr-5">
        Provide details for the Payout
      </div>

      <button
        class="btn btn-secondary btn-md"
        v-if="getTransactionType === 'milestone'"
        @click="addNewMilestone"
      >
        <div class="icon icon-plus"></div>
        <div class="text">Add new milestone</div>
      </button>
    </div>

    <!-- PAYOUT CARDS -->
    <div class="wrapper row">
      <div
        class="col-xl-8"
        v-for="(milestone, index) in getTransactionMilestones"
        :key="index"
      >
        <PayoutCard
          :milestone="milestone"
          :currency="getTransactionAmount.currency"
          :index="index"
        />
      </div>
    </div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      How May Any Dispute Be Handled?
    </div>

    <div class="wrapper row mgb-32">
      <div class="col-xl-8">
        <div class="row">
          <div class="col-12 col-sm-6 dispute-wrapper">
            <RadioSelectCard
              card_name="dispute"
              label_id="disputeCard1"
              label_text="Handled by the platform"
              tooltip_text="Dispute
              resolution will be handled by Vesicash."
              :is_checked="
                getTransactionSetup.dispute_handler == 'vesicash' ? true : false
              "
              @clicked="UPDATE_TRANSACTION_DISPUTE_MGT('vesicash')"
            />
          </div>

          <div class="col-12 col-sm-6 dispute-wrapper">
            <RadioSelectCard
              card_name="dispute"
              label_id="disputeCard2"
              label_text="Arbitration"
              tooltip_text="Any dispute will be handled via arbitration. Cost of which will be borne by the transacting parties."
              :is_checked="
                getTransactionSetup.dispute_handler == 'arbitration'
                  ? true
                  : false
              "
              @clicked="UPDATE_TRANSACTION_DISPUTE_MGT('arbitration')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- SUMMATION TOTAL -->
    <div class="wrapper mgb-40">
      <div class="col-xl-8">
        <SummationCard
          :milestones="getTransactionMilestones"
          :amount_data="getTransactionAmount"
        />
      </div>
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="nextProgressFlow">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "FundPayoutRules",

  components: {
    PayoutCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/payout-card"
      ),

    RadioSelectCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/radio-select-card"
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
  },

  mounted() {
    // this.loadMileStoneData();
    this.getTransactionMilestones.length
      ? this.loadAllCurrentMilestones()
      : this.loadMileStoneData();
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_MILESTONE: "transactions/UPDATE_TRANSACTION_MILESTONE",
      UPDATE_MILESTONE_RECIPIENT: "transactions/UPDATE_MILESTONE_RECIPIENT",
      UPDATE_TRANSACTION_DISPUTE_MGT:
        "transactions/UPDATE_TRANSACTION_DISPUTE_MGT",
    }),

    nextProgressFlow() {
      this.checkValidState();

      // this.$router.push({
      //   name: "TransactionConfirmPayout",
      //   query: {
      //     type: this.$route.query.type,
      //     party: this.$route.query.party,
      //   },
      // });
    },

    // ========================================================
    // CHECK IF ALL INPUT AND SELECTIONS ARE MADE
    // ========================================================
    checkValidState() {
      for (
        let index = 0;
        index < this.getTransactionMilestones.length;
        index++
      ) {
        let milestone = this.getTransactionMilestones[index];
        let payout_error = [];

        let milestone_recipients = this.getMilestoneRecipients.filter(
          (user) => user.milestone_id === milestone.id
        );

        milestone_recipients.map((user) => {
          if (!user.amount) {
            let error_obj = {};

            error_obj.name = milestone.name;
            error_obj.index = index;
            error_obj.message = `is missing a payout amount for user (${user.email_address})`;

            payout_error.push(error_obj);
          }
        });

        // DUE DATE
        if (!milestone.due_date) {
          this.logErrorMessage(milestone.name, index, "is missing a due date.");
          break;
        }

        // INSPECTION PERIOD
        else if (!Object.values(milestone.inspection_period).length) {
          this.logErrorMessage(
            milestone.name,
            index,
            "is missing an inspection period."
          );
          break;
        }

        // FETCH MILESTONE RECIPIENTS
        else if (payout_error.length) {
          this.logErrorMessage(
            payout_error[0].name,
            payout_error[0].index,
            payout_error[0].message
          );
          break;
        }

        // DISPUTE HANDLING
        else if (!this.getTransactionSetup.dispute_handler) {
          this.logErrorMessage(
            milestone.name,
            index,
            "is missing a dispute handler.",
            true
          );
          break;
        }

        // MOVE TO CONFIRM PAYOUT PAGE
        else {
          if (index + 1 === this.getTransactionMilestones.length) {
            this.$router.push({
              name: "TransactionConfirmPayout",
              query: {
                type: this.$route.query.type,
                party: this.$route.query.party,
                pay: this.$route.query.pay,
              },
            });
          }
        }
      }
    },

    // ==========================================================
    // LOG ERROR MESSAGE DEPENDING ON MILESTONE
    // ==========================================================
    logErrorMessage(
      milestone_name = "",
      milestone_index = 0,
      message = "",
      pass = false
    ) {
      let naming_intro =
        this.getTransactionType === "oneoff" || pass
          ? "Transaction"
          : milestone_name
          ? milestone_name
          : `Milestone ${milestone_index + 1}`;

      this.pushToast(`${naming_intro} ${message}`, "error");
    },

    // ============================================================
    // GENERATE A LIST OF BENEFICIARIES WHO ARE PAYOUT RECIPIENTS
    // ============================================================
    getBeneficiariesReceivingPay(milestone_id) {
      let milestone_recipients = [];

      this.getTransactionBeneficiaries
        .filter((user) => user.recipient.name === "Yes")
        .map((i) => {
          milestone_recipients.push({
            ...i,
            milestone_id,
            update_id: this.$string.getRandomString(12),
          });
        });

      return milestone_recipients;
    },

    // ==============================
    // LOAD MILESTONE DATA
    // ==============================
    loadMileStoneData() {
      let milestone_data = {};

      milestone_data.id = this.$string.getRandomString(12);
      milestone_data.name = "";
      milestone_data.due_date = "";
      milestone_data.inspection_period = {};

      this.UPDATE_TRANSACTION_MILESTONE([milestone_data]);
      this.UPDATE_MILESTONE_RECIPIENT([
        ...this.getBeneficiariesReceivingPay(milestone_data.id),
      ]);
    },

    // ==============================
    // LOAD ALL CURRENT MILESTONES
    // ==============================
    loadAllCurrentMilestones() {
      this.UPDATE_TRANSACTION_MILESTONE([...this.getTransactionMilestones]);
      this.UPDATE_MILESTONE_RECIPIENT([...this.getMilestoneRecipients]);
    },

    // ==============================
    // CREATE A NEW MILESTONE DATA
    // ==============================
    addNewMilestone() {
      let previous_milestone =
        this.getTransactionMilestones[this.getTransactionMilestones.length - 1];

      let new_milestone_data = {
        ...previous_milestone,
        id: this.$string.getRandomString(12),
      };

      this.UPDATE_TRANSACTION_MILESTONE([
        ...this.getTransactionMilestones,
        new_milestone_data,
      ]);

      this.UPDATE_MILESTONE_RECIPIENT([
        ...this.getMilestoneRecipients,
        ...this.getBeneficiariesReceivingPay(new_milestone_data.id),
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-payout-rules {
  .disbursement-title {
    @include breakpoint-down(xl) {
      @include generate-font-type("h5");
    }
  }

  .instruction-wrapper {
    @include flex-row-between-wrap;

    .btn {
      padding: toRem(8) toRem(24) toRem(8) toRem(18);

      @include breakpoint-down(xs) {
        margin-top: toRem(10);
      }

      .icon {
        font-size: toRem(14.25);
        margin-right: toRem(4);
      }
    }
  }

  .dispute-wrapper {
    @include breakpoint-down(sm) {
      &:first-of-type {
        margin-bottom: toRem(20);
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
}
</style>
