<template>
  <div class="tools-section">
    <div class="vesicash-container">
      <div class="row">
        <!-- TOP SECTION -->
        <div class="col-12 top-section">
          <!-- TITLE TEXT -->
          <div
            class="title-text grey-900 h2-text roobert-700 text-center mgb-16"
          >
            All the tools to grow your business
          </div>

          <!-- DESCRIPTION TEXT -->
          <div
            class="
              description-text
              grey-700
              h7-text
              roobert-400
              text-center
              mgb-60
            "
          >
            Take control of your payments and make your cross-border payments
            simple and easy. Vesicash is a secure way to send and receive money
            internationally, with no hidden fees.
          </div>
        </div>

        <!-- BOTTOM SECTION -->
        <div class="col-12 bottom-section">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-4"
              v-for="(tool, index) in tools"
              :key="index"
            >
              <ToolCard :tool="tool" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolsSection",

  components: {
    ToolCard: () =>
      import(
        /* webpackChunkName: 'landing-module' */ "@/modules/landing/components/home/tool-card"
      ),
  },

  data() {
    return {
      tools: [
        {
          title: "Escrow financing",
          description: "Secure payment platform between you and third party.",
          image: "tool-card-one.png",
        },
        {
          title: "Split disbursements",
          description:
            "Seamless disbursements process between the buyer and seller",
          image: "tool-card-two.png",
        },
        {
          title: "Bulk transactions",
          description:
            "Make multiple payments to recipients in a single transaction.",
          image: "tool-card-three.png",
        },
        {
          title: "Milestone disbursements",
          description:
            "Schedule payments for when projects have been successfully delivered.",
          image: "tool-card-four.png",
        },
        {
          title: "Full team oversight",
          description:
            "Add as many parties as you need. We pay proper attention to escrow transactions to avoid error.",
          image: "tool-card-five.png",
        },
        {
          title: "Flexible role assignment & management",
          description:
            "Easily assign roles to counter parties. All parties invlove have clear goals and objectives",
          image: "tool-card-six.png",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tools-section {
  padding: toRem(110) toRem(20) toRem(60);

  @include breakpoint-down(lg) {
    padding: toRem(100) 0 toRem(60);
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0 toRem(60);
  }

  .top-section {
    @include flex-column-center;
    margin-bottom: toRem(80);

    .title-text {
      font-size: toRem(39);

      @include breakpoint-down(lg) {
        font-size: toRem(36);
      }

      @include breakpoint-down(md) {
        font-size: toRem(32);
      }

      @include breakpoint-down(sm) {
        @include font-height(32, 42);
      }
    }

    .description-text {
      font-size: toRem(18.25);
      width: 65%;

      @include breakpoint-down(lg) {
        font-size: toRem(18);
        width: 90%;
      }

      @include breakpoint-down(sm) {
        font-size: toRem(17);
        margin-bottom: toRem(-10) !important;
        width: 100%;
      }
    }
  }
}
</style>