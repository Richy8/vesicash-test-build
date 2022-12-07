<template>
  <div class="dashboard-disbursement-view">
    <!-- BACK BUTTON -->
    <PageBackBtn history_mode />

    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">
      {{ getTransaction.title || "Transaction title.." }}
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
                  getTransaction.dispute_handler === 'vesicash'
                    ? 'Vesicash handles dispute'
                    : 'Arbitration',
              },
              {
                title: 'Attached Document(s)',
                value: 'No file attached',
                file: getTransaction.files.length
                  ? {
                      name: getTransaction.files[0].file_name,
                      url: getTransaction.files[0].file_url_new,
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

        <!-- USERS INVOLVED TABLE -->
        <UsersTable
          :type="getTransactionParty"
          :dataset="getTransaction.members"
          :loading="getTransactionParty.length ? false : true"
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
            v-for="(milestone, index) in getSortedMilestones"
            :key="index"
            :index="index"
            :milestone="milestone"
            :currency="getTransaction.currency"
            :parties="getTransaction.members"
            :has_actions="true"
          />
        </template>
      </div>
    </template>

    <!-- TRANSACTIONS SECTION -->
    <template name="transactions-section" v-if="false">
      <div class="section-wrapper">
        <div class="section-title">Transactions</div>

        <!-- TRANSACTIONS TABLE -->
        <DashboardTransactions />
      </div>
    </template>

    <!-- ACTIVITY SECTION -->
    <template name="activity-section" v-if="getTransactionActivities.length">
      <div class="section-wrapper">
        <div class="section-title">Activity</div>

        <div class="activity-wrapper wt-50">
          <ActivityCard :activities="getTransactionActivities" />
        </div>
      </div>
    </template>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_accept_modal">
        <AcceptTransactionModal
          :transaction="getTransactionModalProps"
          @closeTriggered="toggleAcceptModal"
        />
      </transition>

      <transition name="fade" v-if="show_payment_modal">
        <PaymentActionModal
          :transaction="getTransactionModalProps"
          @togglePaymentOptions="closePaymentOpenPaymentOption"
          @closeTriggered="togglePaymentModal"
        />
      </transition>

      <transition name="fade" v-if="show_payment_option_modal">
        <PaymentsModal
          :paymentDetails="getTransactionAmount"
          @closeTriggered="togglePaymentOptionModal"
          @initiateWireTransfer="closePaymentOpenWire"
          @initiateFWBizPayment="closePaymentOpenFWBiz"
          @initiateCardPayment="initiateCardPayment"
        />
      </transition>

      <transition name="fade" v-if="show_wire_transfer_modal">
        <WireTransferModal
          :paymentDetails="getTransactionAmount"
          @closeTriggered="toggleWireTransferModal"
          @goBackPaymentSelection="closeWTPaymentOpenPayment"
          @paid="closeWireAndOpenSuccess"
        />
      </transition>

      <transition name="fade" v-if="show_naira_transfer_modal">
        <WalletDetailsModal
          @closeTriggered="toggleNairaTransferModal"
          @goBackWalletSelection="closeNairaPaymentOpenPayment"
          @walletFunded="closeFundDetailsAndOpenSuccess"
        />
      </transition>

      <transition name="fade" v-if="show_fw_biz_modal">
        <FWBizModal
          @closeTriggered="toggleFWBizModal"
          @goBackPaymentSelection="closeFWBizOpenPayment"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PageBackBtn from "@/shared/components/page-back-btn";
import paymentHelper from "@/modules/transactions/mixins/payment-mixins";

export default {
  name: "TransactionDetails",

  mixins: [paymentHelper],

  metaInfo: {
    title: "Disbursement Details",
    titleTemplate: "%s - Vesicash",
  },

  components: {
    PageBackBtn,
    FundInfoCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/fund-info-card"
      ),

    PaymentRuleCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/payment-rule-card"
      ),

    ActivityCard: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/card-comps/activity-card"
      ),

    UsersTable: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/users-table"
      ),

    DashboardTransactions: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/dashboard-transactions"
      ),

    AcceptTransactionModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/accept-transaction-modal"
      ),

    PaymentActionModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/payment-action-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getTransactionDetails: "transactions/getTransactionDetails",
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

    getTransaction() {
      if (Object.keys(this.getTransactionDetails).length)
        return this.getTransactionDetails;
      else return this.transaction_details;
    },

    getSortedMilestones() {
      return this.getTransaction?.milestones?.sort((a, b) =>
        Number(a.index) < Number(b.index)
          ? -1
          : Number(a.index) > Number(b.index)
          ? 1
          : 0
      );
    },

    getTransactionModalProps() {
      let transaction_owner = this.getTransaction?.members[0]?.email ?? "Owner";
      let transaction_title = this.getTransaction.title;
      let transaction_amount =
        this.getTransaction?.totalAmount ?? this.getTransaction?.amount ?? 0;
      let transaction_amount_paid =
        Number(this.getTransaction?.amount_paid) ?? 0;
      let transaction_currency = this.getTransaction?.currency ?? "NGN";

      return {
        owner: transaction_owner,
        title: transaction_title,
        amount_paid: transaction_amount_paid,
        total_amount: `${this.$money.getSign(
          transaction_currency
        )}${this.$money.addComma(transaction_amount)}`,
      };
    },

    watchPaymentModalChanges() {
      const {
        show_payment_modal,
        show_payment_option_modal,
        show_naira_transfer_modal,
        show_fw_biz_modal,
      } = this;
      return {
        show_payment_modal,
        show_payment_option_modal,
        show_naira_transfer_modal,
        show_fw_biz_modal,
      };
    },

    getTransactionActivities() {
      return this.getTransaction?.activities ?? [];
    },
  },

  watch: {
    getTransaction: {
      handler() {
        this.checkIfTransactionCanStart();
      },
      immediate: true,
    },

    show_accept_modal: {
      handler(value) {
        if (!value) setTimeout(() => this.toggleAcceptModal(), 4000);
      },
    },

    watchPaymentModalChanges: {
      handler() {
        if (!this.show_payment_modal) {
          if (
            this.show_payment_option_modal ||
            this.show_wire_transfer_modal ||
            this.show_naira_transfer_modal ||
            this.show_fw_biz_modal
          )
            return;
          else setTimeout(() => this.togglePaymentModal(), 4000);
        }
      },
    },
  },

  data() {
    return {
      show_accept_modal: false,
      show_payment_modal: false,

      status: {
        sac: "sent - awaiting confirmation",
      },

      ms_key: {
        "sent-rejected": "sr",
        "accepted-funded": "af",
        "accepted-not-funded": "anf",
        "in-progress": "ip",
        delivered: "d",
        "delivered-accepted": "da",
        "delivered-rejected": "dr",
        "closed-disbursement-complete": "cdc",
        "closed-disputed": "cd",
        "closed-refunded": "cr",
        closed: "closed",
      },

      transaction_details: {
        title: "",
        currency: "",
        files: {},
        members: [],
        milestones: [],
      },
    };
  },

  created() {
    this.$bus.$on("refetchTransactionDetails", () =>
      this.fetchSingleTransaction()
    );

    // SET BACK LINK ON ROUTE
    // if (!this.$route?.query?.link) {
    //   this.$router.replace({
    //     path: `${this.$route.path}&link=${sessionStorage.getItem("back_link")}`,
    //   });
    //   // REMOVE FROM SESSION STORAGE
    //   sessionStorage.removeItem("back_link");
    // }
  },

  mounted() {
    this.fetchSingleTransaction();
  },

  methods: {
    ...mapActions({
      fetchTransactionById: "transactions/fetchTransactionById",
      updateMilestoneTransaction: "transactions/updateMilestoneTransaction",
    }),

    // TOGGLE ACCEPT TRANSACTION MODAL
    toggleAcceptModal() {
      this.show_accept_modal = !this.show_accept_modal;
    },

    // TOGGLE TRANSACTION PAYMENT MODAL
    togglePaymentModal() {
      this.show_payment_modal = !this.show_payment_modal;
    },

    // CLOSE PAYMENT MODAL AND OPEN PAYMENT OPTIONS MODAL
    closePaymentOpenPaymentOption() {
      this.show_payment_modal = false;
      this.togglePaymentOptionModal();
    },

    // FETCH SINGLE TRANSACTION
    fetchSingleTransaction() {
      this.fetchTransactionById({ transaction_id: this.$route.params.id })
        .then((response) => {
          if (response.code === 200)
            this.transaction_details = response?.data?.transaction;
        })
        .catch((err) => console.log(err));
    },

    // CHECK IF EVERY PARTY MEMBERS HAS ACCEPTED
    checkIfTransactionCanStart() {
      let { members, title, amount_paid, totalAmount, amount } =
        this.getTransaction;

      let current_user = members?.find(
        (party) => party.account_id === this.getAccountId
      );

      let first_milestone_status = this.getSortedMilestones[0]?.status;

      // CHECK IF EVERYBODY HAS ACCEPTED
      let all_accepted = this.getTransaction?.members.every(
        (party) => party.status?.toLowerCase() === "accepted"
      );

      // CHECK IF MILESTONE IS SENT - AWAITING CONFIRMATION
      if (first_milestone_status?.toLowerCase() === this.status.sac) {
        // CHECK CURRENT USER IS A BUYER
        if (current_user.role?.toLowerCase() === "buyer") {
          if (current_user.status?.toLowerCase() === "created") {
            this.togglePaymentModal();
          } else if (current_user.status?.toLowerCase() === "accepted") {
            // CHECK PAYMENT
            if (Number(amount_paid) < Number(totalAmount ?? amount)) {
              this.togglePaymentModal();
            } else {
              if (!all_accepted)
                this.pushToast(
                  "Please wait for other parties to accept transaction",
                  "success"
                );
            }
          } else this.pushToast(`${title} transacion has closed`, "error");
        }

        // FOR OTHER USER PARTY ROLE
        else {
          if (current_user.status?.toLowerCase() === "created") {
            this.toggleAcceptModal();
          } else if (current_user.status?.toLowerCase() === "accepted") {
            // CHECK IF ALL PARTY MEMBERS HAS ACCEPTED
            if (all_accepted) {
              // CHECK IF FUNDS HAS BEEN PAID
              let payment_complete =
                Number(amount_paid) >= totalAmount ? true : false;

              if (!payment_complete) {
                this.pushToast(
                  "Please wait for the buyer to make a complete payment for transaction",
                  "success"
                );
              }
            }

            // HANDLE WHEN SOME PARTY ARE YET TO ACCEPT
            else {
              this.pushToast(
                "Please wait for other parties to accept transaction",
                "success"
              );
            }
          } else this.pushToast(`${title} transacion has closed`, "error");
        }

        // TRY INITIATING ESCROW TRANSACTION
        this.initiateTransaction();
      }

      // ALERT IF MILESTONE HAS NOT BEEN FUNDED
      else if (
        first_milestone_status?.toLowerCase() === "accepted - not funded"
      ) {
        // SHOW MAKE PAYMENT MODAL FOR A BUYER
        if (current_user.role?.toLowerCase() === "buyer") {
          this.togglePaymentModal();
        }

        // FOR NON BUYER PARTY
        else {
          this.pushToast(
            `${title} transacion has not been funded yet`,
            "success"
          );
        }

        // TRY INITIATING ESCROW TRANSACTION
        this.initiateTransaction();
      }

      // ALERT IF MILESTONE HAS CLOSED
      else if (first_milestone_status?.toLowerCase().includes("closed")) {
        this.pushToast(`${title} transacion has closed`, "success");
      }
    },

    // INITIATE ESCROW TRANSACTION
    initiateTransaction() {
      let { members, type, amount_paid, totalAmount } = this.getTransaction;

      // CHECK IF ALL PARTIES HAS ACCEPTED
      let all_accepted = members.every(
        (party) => party.status?.toLowerCase() === "accepted"
      );

      // CHECK IF ONE PARTY REJECTED
      let one_rejected = members.some(
        (party) => party.status?.toLowerCase() === "rejected"
      );

      // CHECK IF PAYMENT HAS BEEN MADE
      let payment_complete = Number(amount_paid) >= totalAmount ? true : false;

      // FOR ALL ACCEPTED AND COMPLETE PAYMENT
      if (all_accepted && payment_complete) {
        this.updateMilestoneStatus(
          this.ms_key[type === "oneoff" ? "in-progress" : "accepted-funded"],
          this.getSortedMilestones,
          true
        );
      }

      // FOR ALL ACCEPTED AND INCOMPLETE PAYMENT
      else if (all_accepted && !payment_complete) {
        this.updateMilestoneStatus(
          this.ms_key["accepted-not-funded"],
          this.getSortedMilestones
        );
      }

      // FOR REJECTED CASE AND COMPLETE PAYMENT
      else if (one_rejected && payment_complete) {
        this.updateMilestoneStatus(
          this.ms_key["closed-refunded"],
          this.getSortedMilestones
        );
      }

      // FOR REJECTED CASE AND INCOMPLETE PAYMENT
      else if (one_rejected && !payment_complete) {
        this.updateMilestoneStatus(
          this.ms_key["closed"],
          this.getSortedMilestones
        );
      }
    },

    // UPDATE MILESTONE STATUS DATA
    updateMilestoneStatus(status, milestones, has_exception = false) {
      milestones.map((milestone, index) => {
        this.updateMilestoneTransaction({
          transaction_id: this.$route.params.id,
          milestone_id: milestone.milestone_id,
          account_id: this.getAccountId,
          status:
            has_exception &&
            this.getTransactionType === "milestone" &&
            index === 0
              ? this.ms_key["in-progress"]
              : status,
        })
          .then((response) => {
            if (response.code === 200) {
              if (milestones.length === index + 1) {
                // this.pushToast("Transaction has started", "success");
                setTimeout(() => this.fetchSingleTransaction(), 2000);
              }
            }
          })
          .catch((err) => console.log(err));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-disbursement-view {
  .page-title {
    font-size: toRem(22.5);

    @include breakpoint-down(md) {
      font-size: toRem(20.75);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(19);
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

  .activity-wrapper {
    @include breakpoint-down(xl) {
      width: 65%;
    }

    @include breakpoint-down(lg) {
      padding-bottom: toRem(40);
      width: 75%;
    }

    @include breakpoint-down(sm) {
      width: 100%;
    }
  }
}
</style>  