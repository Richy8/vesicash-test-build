<template>
  <div class="fund-info-card rounded-16 grey-10-bg border-grey-100">
    <!-- TOP ROW -->
    <div class="top-row mgb-16">
      <div class="card-title grey-900 primary-1-text">{{ card_title }}</div>
    </div>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <!-- CARD TITLE -->
      <template v-for="(card, index) in card_items">
        <div class="card-item" :key="index">
          <!-- CARD TITLE TITLE -->
          <div
            class="
              card-item-title
              text-uppercase
              grey-600
              tertiary-3-text
              mgb-8
            "
          >
            {{ card.title }}
          </div>

          <!-- CARD TITLE VALUE -->
          <div class="card-item-value grey-900 secondary-2-text">
            {{ card.value }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "FundInfoCard",

  props: {
    card_title: {
      type: String,
      default: "Disbursment details",
    },

    card_items: {
      type: Array,
      default: () => [
        {
          title: "Disbursement Type",
          value: "One-off disbursment type",
        },
      ],
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-info-card {
  margin: 0 toRem(32) toRem(34) 0;
  padding: toRem(24);

  @include breakpoint-custom-down(640) {
    margin: 0 0 toRem(24);
    padding: toRem(16);
    width: 100%;
  }

  &:last-of-type {
    margin: 0 0 toRem(34);

    @include breakpoint-custom-down(640) {
      margin: 0 0 toRem(34);
      width: 50%;
    }

    @include breakpoint-custom-down(580) {
      width: 100%;
    }
  }

  .top-row {
    .card-title {
      @include breakpoint-down(md) {
        font-size: toRem(15.45);
      }
    }
  }

  .bottom-row {
    @include flex-row-start-nowrap;

    @include breakpoint-custom-down(640) {
      @include flex-row-between-wrap;
    }

    .card-item {
      min-width: toRem(240);

      @include breakpoint-custom-down(640) {
        min-width: 40%;
      }

      @include breakpoint-custom-down(580) {
        min-width: 100%;

        &:nth-of-type(2) {
          margin-top: toRem(24);
        }
      }

      .card-item-title {
        @include breakpoint-down(md) {
          font-size: toRem(11.75);
        }
      }

      .card-item-value {
        @include breakpoint-down(md) {
          font-size: toRem(13.75);
        }
      }

      &:nth-of-type(2) {
        margin-left: toRem(50);

        @include breakpoint-custom-down(640) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>