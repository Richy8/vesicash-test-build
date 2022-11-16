<template>
  <div class="business-area-section teal-900-bg">
    <div class="vesicash-container">
      <div class="row">
        <!-- COPY SECTION -->
        <div class="copy-section col-12 col-md-6">
          <!-- TITLE TEXT -->
          <div class="title-text h2-text roobert-700 neutral-10 mgb-18">
            Take your business to the next level
          </div>

          <!-- DESCRIPTION TEXT -->
          <div class="description-text h7-text roobert-400 neutral-10 mgb-40">
            With Vesicash, you can explore new possibilities to power your
            business - without worrying about the risks. Our suite of products
            are designed to give you the power to control your cash flow and
            grow your business. Use cases include:
          </div>

          <!-- BUSINESS AREAS -->
          <div class="business-areas row">
            <div
              class="business-unit col-12 col-md-6"
              v-for="(business, index) in business_areas"
              :key="index"
            >
              <div class="icon-wrapper">
                <SuccessIcon />
              </div>

              <div class="text tertiary-1-text roobert-400 neutral-10">
                {{ business }}
              </div>
            </div>
          </div>
        </div>

        <!-- IMAGE SECTION -->
        <div class="col-12 col-md-6">
          <div class="image-section position-relative w-100">
            <img
              v-lazy="loadImage('product-img.png', 'landing')"
              alt="Product Image"
              class="wt-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BusinessAreaSection",

  components: {
    SuccessIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/success-icon"
      ),
  },

  data() {
    return {
      business_areas: [
        "International Fund Settlement",
        "Business procurements & International Trade",
        "Fund Management",
        "Aviation",
        "Real estate",
        "M & A",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.business-area-section {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .vesicash-container {
    .copy-section {
      .title-text {
        font-size: toRem(39);
        width: 90%;

        @include breakpoint-down(md) {
          font-size: toRem(36);
          width: 100%;
        }

        @include breakpoint-down(sm) {
          @include font-height(32, 44);
        }

        @include breakpoint-down(xs) {
          @include font-height(30, 42);
        }
      }

      .description-text {
        font-size: toRem(17.75);
        width: 82%;

        @include breakpoint-down(lg) {
          font-size: toRem(17.5);
        }

        @include breakpoint-down(md) {
          font-size: toRem(17);
          width: 100%;
        }

        @include breakpoint-down(sm) {
          font-size: toRem(16);
          width: 100%;
        }
      }

      .business-areas {
        @include flex-row-start-wrap;
        align-items: flex-start;
        width: 95%;

        .business-unit {
          @include flex-row-start-nowrap;
          align-items: flex-start;
          margin-bottom: toRem(24);

          .icon-wrapper {
            margin-right: toRem(16);
          }

          .text {
            @include breakpoint-down(md) {
              font-size: toRem(15);
            }
          }
        }
      }
    }
  }
}
</style>