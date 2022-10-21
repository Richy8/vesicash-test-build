<template>
  <div
    class="payment-rule-card rounded-16 teal-10-bg border-grey-100"
    :class="!has_actions && 'pb-0'"
  >
    <!-- CARD TITLE -->
    <div class="card-title grey-900 primary-2-text mgb-16">
      Milestone 1 : Initial payment
    </div>

    <!-- PAYMENT ITEMS -->
    <div class="payment-items">
      <div class="item" v-for="(item, index) in payment_rules" :key="index">
        <div class="title grey-600">{{ item.title }}</div>

        <div class="value grey-900 text-wrap">
          <template v-if="item.title === 'Status'">
            <TagCard :card_text="item.value" card_type="progress" />
          </template>
          <template v-else>{{ item.value }}</template>
        </div>
      </div>
    </div>

    <!-- USER PAYMENT DETAILS -->
    <div class="user-payment-details">
      <div class="wrapper" v-for="(_, index) in user_details" :key="index">
        <PaymentUserCard />
      </div>
    </div>

    <!-- ACTIONS ROW -->
    <template v-if="has_actions">
      <div
        class="actions-row"
        :class="$string.isOddNumber(user_details.length) && 'mgt-24'"
      >
        <button class="btn btn-primary btn-md">Approve</button>
        <button class="btn btn-secondary btn-md">Reject</button>
      </div>
    </template>
  </div>
</template>

<script>
import TagCard from "@/shared/components/card-comps/tag-card";
import PaymentUserCard from "@/modules/dashboard/components/card-comps/payment-user-card";

export default {
  name: "PaymentRuleCard",

  components: {
    TagCard,
    PaymentUserCard,
  },

  data: () => ({
    payment_rules: [
      { title: "User Details", value: "Salimadeyemi@gmail.com" },
      { title: "Amount", value: "$30,000" },
      { title: "Payment due date", value: "12th April, 2022" },
      { title: "Inspection Period", value: "4 days" },
      { title: "Status", value: "In Progress" },
    ],

    user_details: [1, 2, 3],

    has_actions: true,
  }),
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
