<template>
  <div class="progress-flow mgb-28 rounded-8 grey-50-bg">
    <!-- ITEM FLOWS -->
    <template v-for="(flow, index) in page_flows">
      <div
        class="item-flow smooth-transition"
        :key="index"
        :class="flow.state | updateFlowState"
      >
        <!-- COUNTER -->
        <div class="counter smooth-transition rounded-circle">
          <div class="count grey-600 secondary-2-text smooth-transition">
            {{ index + 1 }}
          </div>
        </div>

        <!-- COUNTER TEXT -->
        <div class="counter-text secondary-3-text grey-600 smooth-transition">
          {{ flow.title }}
        </div>

        <!-- COUNTER LINE -->
        <div
          class="counter-line smooth-transition"
          :class="index + 1 === page_flows.length && 'd-none'"
        ></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ProgressFlow",

  props: {
    flows: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: "Payment Details",
          route: "VesicashFundDetails",
          alias_route: "",
          state: "current",
        },
        {
          id: 2,
          title: "Invite Parties",
          route: "VesicashBeneficiaries",
          alias_route: "",
          state: "next",
        },
        {
          id: 3,
          title: "Payout Details",
          route: "VesicashPayoutRules",
          alias_route: "VesicashConfirmPayoutRules",
          state: "next",
        },
        {
          id: 4,
          title: "Make payment",
          route: "VesicashPayment",
          alias_route: "",
          state: "next",
        },
      ],
    },
  },

  data() {
    return {
      page_flows: this.flows,
    };
  },

  filters: {
    updateFlowState(value) {
      if (value === "previous") return "item-flow-completed";
      else if (value === "current") return "item-flow-active";
      else return null;
    },
  },

  watch: {
    $route: {
      handler(value) {
        this.reEvaluatePageFlows(value.name);
      },
      immediate: true,
    },
  },

  methods: {
    reEvaluatePageFlows(route_name) {
      let active_flow_index = this.page_flows.findIndex((flow) =>
        [flow?.route, flow?.alias_route].includes(route_name)
      );

      this.page_flows.map((flow) => {
        if (flow.id < this.page_flows[active_flow_index].id)
          flow.state = "previous";
        else if (flow.id > this.page_flows[active_flow_index].id)
          flow.state = "next";
        else flow.state = "current";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-flow {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(8) toRem(16);
  width: max-content;

  .item-flow {
    @include flex-row-start-nowrap;
    margin-right: toRem(16);

    &:last-of-type {
      margin-right: 0;
    }

    @include breakpoint-down(md) {
      margin-right: toRem(8);
    }

    .counter {
      background: getColor("neutral-10");
      @include draw-shape(30);
      position: relative;
      box-shadow: toRem(1) toRem(-1) toRem(2) rgba(168, 177, 175, 0.3),
        toRem(-1) toRem(1) toRem(2) rgba(168, 177, 175, 0.3);

      @include breakpoint-down(sm) {
        @include draw-shape(28);
      }

      .count {
        @include center-placement();
        font-size: toRem(13.5);

        @include breakpoint-down(sm) {
          font-size: toRem(12);
        }
      }
    }

    .counter-text {
      font-size: toRem(12.75);
      margin-left: toRem(8);

      @include breakpoint-down(md) {
        display: none;
      }
    }

    .counter-line {
      background-color: getColor("grey-600");
      margin-left: toRem(8);
      width: toRem(100);
      height: toRem(1);
      display: none;

      @include breakpoint-down(md) {
        display: unset;
      }

      @include breakpoint-down(sm) {
        width: toRem(50);
      }

      @include breakpoint-down(xs) {
        width: toRem(30);
      }
    }

    &-active {
      .counter {
        background: getColor("green-500");

        .count {
          color: getColor("neutral-10");
        }
      }

      .counter-text {
        color: getColor("green-700");
      }

      .counter-line {
        background-color: getColor("green-700");
      }
    }

    &-completed {
      .counter {
        background: getColor("teal-900");

        .count {
          color: getColor("neutral-10");
        }
      }

      .counter-text {
        color: getColor("teal-900");
      }

      .counter-line {
        background-color: getColor("teal-900");
      }
    }
  }
}
</style>
