<template>
  <div
    class="pay-type-card rounded-12 border-grey-100 pointer smooth-transition"
    @click="handleCardSelection"
  >
    <!-- LEFT SECTION -->
    <div class="left-section">
      <!-- ICON CARD -->
      <div class="icon-card position-relative rounded-circle teal-50-bg">
        <component :is="payment.icon" />
      </div>

      <!-- CARD INFO -->
      <div class="card-info">
        <!-- CARD TITLE -->
        <div class="card-title primary-1-text grey-900 mgb-4">{{ payment.title }}</div>

        <!-- CARD DESCRIPTION -->
        <div class="card-description tertiary-2-text grey-600">{{ payment.description }}</div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right-section">
      <div class="icon icon-caret-right grey-500"></div>
    </div>
  </div>
</template>

<script>
import CreditCardIcon from "@/shared/components/icon-comps/credit-card-icon";
import ArrowRightIcon from "@/shared/components/icon-comps/arrow-right-icon";
import BusinessIcon from "@/shared/components/icon-comps/business-icon";
import EmptyWalletIcon from "@/shared/components/icon-comps/empty-wallet-icon";

export default {
  name: "PayTypeCard",

  components: {
    CreditCardIcon,
    ArrowRightIcon,
    BusinessIcon,
    WalletIcon: EmptyWalletIcon,
  },

  props: {
    payment: {
      type: Object,
      default: () => ({
        id: 1,
        icon: "CreditCardIcon",
        title: "Pay with card",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit consectetur.",
        action_type: "route",
        action: "",
      }),
    },
  },

  methods: {
    handleCardSelection() {
      if (this.payment.action_type === "route") {
        this.$router.push({ name: this.payment.action });
      } else this.$emit("payTypeClicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-type-card {
  @include flex-row-between-nowrap;
  padding: toRem(14) toRem(16);
  margin-bottom: toRem(24);

  @include breakpoint-down(sm) {
    padding: toRem(14);
  }

  &:hover {
    background: rgba(getColor("grey-10"), 0.85);
    transform: scale(1.02);
  }

  .left-section {
    @include flex-row-start-nowrap;
    align-items: flex-start;

    .icon-card {
      @include draw-shape(48);
      margin-right: toRem(16);

      @include breakpoint-down(sm) {
        margin-right: toRem(12);
      }

      svg {
        @include center-placement();
        @include draw-shape(25);
      }
    }

    .card-title {
      @include breakpoint-down(sm) {
        font-size: toRem(15.25);
      }
    }

    .card-description {
      @include breakpoint-down(sm) {
        font-size: toRem(13.5);
      }
    }
  }

  .right-section {
    @include draw-shape(24);
    margin-left: toRem(14);
    position: relative;

    .icon {
      @include center-placement();
      font-size: toRem(28);
    }
  }
}
</style>