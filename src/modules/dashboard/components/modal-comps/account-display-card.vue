<template>
  <div
    class="account-display-card border-grey-100 rounded-12 pointer"
    :class="card_detail.selected && 'account-display-card-active'"
    @click="$emit('selectAccount', index)"
  >
    <!-- ACCOUNT DETAILS -->
    <div class="account-section">
      <div class="top primary-1-text mgb-5 grey-900">
        {{ card_detail.account_name }}
      </div>

      <!-- BOTTOM -->
      <div class="bottom grey-600 tertiary-3-text">
        <div class="item">{{ card_detail.account_no }}</div>

        <div class="dot" v-if="card_detail.bank_name"></div>
        <div class="item">{{ card_detail.bank_name }}</div>

        <div class="dot" v-if="card_detail.bank_id"></div>
        <div class="item">{{ card_detail.bank_id }}</div>
      </div>
    </div>

    <!-- SELECTED TOGGLER -->
    <div class="selection position-relative rounded-circle">
      <div class="icon smooth-transition" v-if="card_detail.selected">
        <SuccessIcon />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDisplayCard",

  components: {
    SuccessIcon: () =>
      import(
        /* webpackChunkName: 'shared-mmodule' */ "@/shared/components/icon-comps/success-icon"
      ),
  },

  props: {
    index: Number,

    card_detail: {
      type: Object,
      default: () => ({
        account_name: "Awotunde bangalee",
        account_no: "01398595485",
        bank_name: "GtBank",
        sort_code: "2020300440",
        selected: false,
      }),
    },
  },

  computed: {
    getBankId() {
      return this.card_detail.bank_id.toString().length < 3
        ? `0${this.card_detail.bank_id}`
        : this.card_detail.bank_id;
    },
  },
};
</script>

<style lang="scss" scoped>
.account-display-card {
  @include flex-row-between-nowrap;
  padding: toRem(14) toRem(16);
  @include transition(0.4s);
  align-items: flex-start;
  margin-bottom: toRem(12);
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background-color: getColor("green-50");
    border-color: getColor("green-500");
  }

  .account-section {
    .top {
      font-size: toRem(15.75);
    }

    .bottom {
      @include flex-row-start-nowrap;

      .dot {
        background-color: getColor("grey-300");
        @include draw-shape(4);
        margin: 0 toRem(8);
      }
    }
  }

  .selection {
    border: toRem(1) solid getColor("grey-200");
    @include draw-shape(24);

    .icon {
      @include center-placement();
    }
  }

  &-active {
    background-color: getColor("green-50");
    border-color: getColor("green-500");
  }
}
</style>