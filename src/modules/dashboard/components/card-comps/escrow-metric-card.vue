<template>
  <div class="escrow-metric-card rounded-12 border-green-100 green-10-bg">
    <!-- TITLE TEXT -->
    <div class="title-text tertiary-2-text grey-700 mgb-2">In Escrow</div>

    <div class="escrow-balance-block">
      <div class="balance-block">
        <div class="border-bottom-grey-100">
          <div class="loading-amount-value rounded-3 skeleton-loader mgb-16" v-if="loading_wallet"></div>

          <div class="amount-value mgb-8" v-else>
            <span>{{$money.getSign("dollar")}}{{ $money.addComma(getEscrowDollar.split(".")[0])}}</span>
            <span class="amount-zero">.{{ getEscrowDollar.split(".")[1] || "00" }}</span>
          </div>
        </div>

        <div class="third-balance">
          <div class="loading-amount-value rounded-3 skeleton-loader mgb-16" v-if="loading_wallet"></div>
          <div class="amount-value mgb-8" v-else>
            <span>{{$money.getSign("naira")}}{{ getEscrowNaira.split(".")[0]}}</span>
            <span class="amount-zero">.{{ getEscrowNaira.split(".")[1]}}</span>
          </div>

          <div class="balance-meta title-description grey-700 secondary-3-text">Escrow balance</div>
        </div>
      </div>

      <div class="balance-block">
        <div class="border-bottom-grey-100">
          <div class="loading-amount-value rounded-3 skeleton-loader mgb-16" v-if="loading_wallet"></div>
          <div class="amount-value mgb-8" v-else>
            <span>£0</span>
            <span class="amount-zero">.00</span>
          </div>
        </div>

        <div>
          <div class="loading-amount-value rounded-3 skeleton-loader mgb-16" v-if="loading_wallet"></div>

          <div class="amount-value mgb-8" v-else>
            <span>---------</span>
            <!-- <span class="amount-zero">.00</span> -->
          </div>

          <div class="balance-meta title-description grey-700 secondary-3-text"></div>
        </div>
      </div>
    </div>

    <!-- AMOUNT VALUE IN DOLLARS -->
    <!-- <template v-if="loading_wallet">
      <div class="loading-amount-value rounded-3 skeleton-loader mgb-16"></div>
    </template>-->

    <!-- <template v-else>
      <div class="amount-value mgb-8 border-bottom-grey-100">
        {{ $money.getSign('dollar') }}{{ $money.addComma(getEscrowDollar.split(".")[0])
        }}
        <span class="amount-zero">.{{ getEscrowDollar.split(".")[1] || "00" }}</span>
      </div>
    </template>-->

    <!-- AMOUNT VALUE IN NAIRA -->
    <!-- <template v-if="loading_wallet">
      <div class="loading-amount-value rounded-3 skeleton-loader mgb-12"></div>
    </template>-->

    <!-- <template v-else>
      <div class="amount-value">
        {{ $money.getSign('naira') }}{{ getEscrowNaira.split(".")[0]
        }}
        <span class="amount-zero">.{{ getEscrowNaira.split(".")[1] }}</span>
      </div>
    </template>-->

    <!-- TITLE DESCRIPTION -->
    <!-- <div class="title-description secondary-3-text grey-700">Escrow balance</div> -->
  </div>
</template>

<script>
export default {
  name: "EscrowMetricCard",

  props: {
    escrow_balance: {
      type: Array,
      default: () => [],
    },

    loading_wallet: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    getEscrowNaira() {
      return this.escrow_balance[0].value;
    },

    getEscrowDollar() {
      return this.escrow_balance[1].value;
    },
  },
};
</script>

<style  lang="scss" scoped>
.escrow-metric-card {
  padding: toRem(14) toRem(24);
  width: toRem(380);
  max-width: 100%;

  @include breakpoint-custom-down(530) {
    width: 100%;
  }

  .escrow-balance-block {
    @include flex-row-start-wrap;

    .balance-block {
      width: 50%;
      padding: 0 toRem(16);
      border-left: toRem(1) solid getColor("grey-100");

      &:first-of-type {
        padding-left: 0;
        border-left: 0;
      }

      @include breakpoint-down(xxs) {
        width: 100%;
        border-left: 0;
        padding-left: 0;

        .third-balance {
          border-bottom: toRem(1) solid getColor("grey-100");
          padding-bottom: toRem(16);
        }
      }

      .balance-meta {
        min-height: toRem(17);
      }
    }
  }

  .title-text {
    @include breakpoint-down(xs) {
      font-size: toRem(11.75);
    }
  }

  .amount-value {
    @include generate-font-type("h4");
    color: getColor("teal-800");
    padding: toRem(10) 0 toRem(8) 0;
    font-size: toRem(23.5);
    margin: 0 !important;

    @include breakpoint-down(lg) {
      @include generate-font-type("primary-1");
      padding-bottom: toRem(12.75);
      font-size: toRem(18.5);
    }

    @include breakpoint-custom-down(700) {
      font-size: toRem(16);
    }

    .amount-zero {
      font-size: toRem(18);

      @include breakpoint-custom-down(700) {
        font-size: toRem(16);
      }
    }
  }

  .loading-amount-value {
    @include draw-shape(120, 32);
    margin-top: toRem(5);
  }
}
</style>