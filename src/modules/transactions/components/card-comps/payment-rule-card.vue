<template>
  <div
    class="payment-rule-card rounded-16 teal-10-bg border-grey-100"
    :class="!has_actions && 'pb-4'"
  >
    <!-- CARD TITLE -->
    <div
      class="card-title grey-900 primary-2-text mgb-16"
      v-if="getTransactionType === 'milestone'"
    >
      {{ getMilestoneName }}
    </div>

    <!-- PAYMENT ITEMS -->
    <div class="payment-items">
      <div class="item" v-for="(item, index) in loadPaymentRules" :key="index">
        <div class="title grey-600">{{ item.title }}</div>

        <div class="value grey-900 text-wrap">
          <template v-if="item.title === 'Status'">
            <TagCard
              :card_text="item.value"
              :card_type="item.value | getStatusColor(status_colors)"
            />
          </template>

          <template v-else> <div v-html="item.value"></div></template>
        </div>
      </div>
    </div>

    <!-- USER PAYMENT DETAILS -->
    <div class="user-payment-details" v-if="getTransactionParty === 'multiple'">
      <div
        class="wrapper"
        v-for="(user, index) in loadCurrentMilestoneRecipients"
        :key="index"
      >
        <PaymentUserCard
          :payment_details="[
            {
              title: 'User Details',
              value: user.email_address || user.email,
              has_sign: false,
            },
            { title: 'Amount', value: user.amount, has_sign: true },
          ]"
          :currency="currency"
        />
      </div>
    </div>

    <!-- ACTIONS ROW -->
    <template v-if="has_actions">
      <div
        class="actions-row"
        :class="$string.isOddNumber(user_details.length) && 'mgt-24'"
      >
        <!-- APPROVAL ROLE -->
        <template v-if="userAccess.approve">
          <!-- APPROVAL OPTIONS -->
          <template
            v-if="['in progress', 'delivered'].includes(getMilestoneStatus)"
          >
            <button
              class="btn btn-primary btn-md"
              :disabled="getMilestoneStatus === 'delivered' ? false : true"
            >
              Approve
            </button>

            <button
              class="btn btn-secondary btn-md"
              :disabled="getMilestoneStatus === 'delivered' ? false : true"
            >
              Reject
            </button>
          </template>

          <!-- DATE RENEWAL OPTIONS -->
          <template v-if="getMilestoneStatus === 'delivered - rejected'">
            <button
              class="btn btn-primary btn-md"
              @click="toggleRenewDateModal"
            >
              Renew Date
            </button>

            <button class="btn btn-secondary btn-md">Close</button>
          </template>
        </template>

        <!-- MARK AS DONE ROLE -->
        <template v-if="userAccess.mark_as_done">
          <template
            v-if="
              ['in progress', 'delivered - rejected'].includes(
                getMilestoneStatus
              )
            "
          >
            <button class="btn btn-primary btn-md">Mark as done</button>
            <button class="btn btn-secondary btn-md">Reject</button>
          </template>
        </template>
      </div>
    </template>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_renew_modal">
        <RenewDateModal @closeTriggered="toggleRenewDateModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TagCard from "@/shared/components/card-comps/tag-card";
import PaymentUserCard from "@/modules/transactions/components/card-comps/payment-user-card";

export default {
  name: "PaymentRuleCard",

  components: {
    TagCard,
    PaymentUserCard,

    RenewDateModal: () =>
      import(
        /* webpackChunkName: "transactions-modal-module" */ "@/modules/transactions/modals/renew-date-modal"
      ),
  },

  props: {
    index: {
      type: Number,
    },

    milestone: {
      type: Object,
      default: () => ({}),
    },

    parties: {
      type: Array,
      default: () => [],
    },

    currency: {
      type: [Object, String],
    },

    has_actions: {
      type: Boolean,
      default: false,
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
      return this.milestone.name || this.milestone.title
        ? this.milestone.name || this.milestone.title
        : `Milestone ${this.index + 1}`;
    },

    // ===================================================
    // GET ALL USERS IN MILESTONE RCEIVING FUNDS
    // ===================================================
    loadCurrentMilestoneRecipients() {
      if (this.getMilestoneRecipients.length)
        return this.getMilestoneRecipients.filter(
          (recipient) => recipient.milestone_id === this.milestone.id
        );
      else return this.milestone.recipients;
    },

    // ===================================================
    // GET CURRENT MILESTONE STATUS
    // ===================================================
    getMilestoneStatus() {
      return (this.milestone?.status ?? this.status.SAC).toLowerCase();
    },

    // ===================================================
    // GET PAYMENT RULES FOR CURRENT MILESTONE
    // ===================================================
    loadPaymentRules() {
      let milestone_date = `${this.milestone?.due_date.split(" ")[0]} 00:00:00`;

      let { d3, m4, y1 } = this.$date.formatDate(milestone_date).getAll();

      if (this.getTransactionParty === "single") {
        return [
          {
            title: "User Details",
            value:
              this.loadCurrentMilestoneRecipients[0].email_address ??
              this.loadCurrentMilestoneRecipients[0].email,
          },
          {
            title: "Amount",
            value: `${this.$money.getSign(
              this.currency?.slug ?? this.currency
            )}${this.$money.addComma(
              this.loadCurrentMilestoneRecipients[0].amount
            )}`,
          },
          {
            title: "Payment due date",
            value: `${d3} ${m4}, ${y1}`,
          },
          {
            title: "Inspection Period",
            value:
              this.milestone.inspection_period?.name ??
              `${this.milestone.inspection_period} ${
                this.milestone.inspection_period === 1 ? "day" : "days"
              }`,
          },
          this.$route.name === "TransactionDetails" && {
            title: "Status",
            value: this.getMilestoneStatus,
          },
        ];
      } else {
        return [
          { title: "Payment due date", value: `${d3} ${m4}, ${y1}` },
          {
            title: "Inspection Period",
            value:
              this.milestone.inspection_period?.name ??
              `${this.milestone.inspection_period} ${
                this.milestone.inspection_period === 1 ? "day" : "days"
              }`,
          },
          this.$route.name === "TransactionDetails" && {
            title: "Status",
            value: this.getMilestoneStatus,
          },
        ];
      }
    },

    // ===================================================
    // GET USER ACCESS LEVELS CAPABILITIES
    // ===================================================
    userAccess() {
      if (this.parties.length) {
        return this.parties.find(
          (party) => party.account_id === this.getAccountId
        )?.access_level;
      } else return false;
    },
  },

  filters: {
    getStatusColor(status, status_colors) {
      return status_colors[status?.toLowerCase()] || "error";
    },
  },

  data: () => ({
    user_details: [],
    show_renew_modal: false,

    status: {
      SAC: "Sent - Awaiting Confirmation",
    },

    status_colors: {
      "sent - awaiting confirmation": "progress",
      "sent - Rejected": "error",
      "accepted - not funded": "error",
      "accepted - funded": "okay",
      draft: "okay",
      "in progress": "progress",
      delivered: "okay",
      "delivered - accepted": "success",
      "delivered - rejected": "error",
      "closed - disbursement complete": "success",
      completed: "success",
      "closed - refunded": "error",
      "closed - not funded": "error",
      closed: "error",
    },
  }),

  mounted() {
    this.notifyBuyerOfPendingAction();
  },

  methods: {
    // TOGGLE RENEWAL DATE MODAL
    toggleRenewDateModal() {
      this.show_renew_modal = !this.show_renew_modal;
    },

    // NOTIFY BUYER TO WAIT FOR SELLER TO MARK AS DONE
    notifyBuyerOfPendingAction() {
      // CHECK IF USER HAS BUYER ROLE
      let current_user_role = this.parties?.find(
        (party) => party.account_id === this.getAccountId
      ).role;

      // CHECK IF ALL PARTIES HAS ACCEPTED
      let all_accepted = this.parties?.every(
        (party) => party.status?.toLowerCase() === "accepted"
      );

      // CHECK FOR A TRANSACTION WITH IN PROGRESS STATUS
      if (
        this.milestone.status.toLowerCase() === "in progress" &&
        current_user_role.toLowerCase() === "buyer" &&
        all_accepted
      ) {
        this.pushToast(
          `Please wait for the seller to mark ${this.milestone.title} transaction as done`,
          "success"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-rule-card {
  padding: toRem(24);
  margin-bottom: toRem(16);

  &:last-of-type {
    margin-bottom: 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(16);
  }

  .card-title {
    @include breakpoint-down(md) {
      margin-bottom: toRem(24) !important;
    }
  }

  .payment-items {
    @include flex-row-start-wrap;
    align-items: flex-start;

    .item {
      margin-bottom: toRem(26);
      margin-right: toRem(50);
      min-width: toRem(140);

      @include breakpoint-down(md) {
        padding-right: toRem(20);
        margin-right: unset;
        min-width: 50%;
        width: 50%;
      }

      &:first-of-type {
        min-width: toRem(180);

        @include breakpoint-down(md) {
          min-width: unset;
        }
      }

      &:last-of-type {
        margin-right: 0;
      }

      .title {
        @include generate-font-type("tertiary-3");
        text-transform: uppercase;
        margin-bottom: toRem(8);

        @include breakpoint-down(sm) {
          font-size: toRem(11.75);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(11.5);
        }
      }

      .value {
        @include generate-font-type("secondary-2");

        @include breakpoint-down(sm) {
          font-size: toRem(13.5);
        }
      }
    }
  }

  .user-payment-details {
    @include flex-row-between-wrap;
    align-items: flex-start;

    .wrapper {
      margin-bottom: toRem(24);
      width: 48%;

      &:last-of-type {
        margin-bottom: 0;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }

  .actions-row {
    @include flex-row-start-wrap;
    // margin-top: toRem(24);

    .btn {
      &:first-of-type {
        padding: toRem(8) toRem(50);
        margin-right: toRem(24);

        @include breakpoint-down(sm) {
          padding: toRem(8) toRem(34);
          margin-right: toRem(16);
        }
      }

      &:last-of-type {
        padding: toRem(8) toRem(34);
      }
    }
  }
}
</style>
