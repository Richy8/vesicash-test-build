<template>
  <div class="api-doc-block teal-50-bg">
    <div class="vesicash-container">
      <div class="row">
        <!-- COPY SECTION -->
        <div class="copy-section col-12 col-md-6 mb-5 mb-md-0">
          <div class="title-text h2-text roobert-700 grey-900 mgb-16">
            Your Transactions, Your Way
          </div>

          <div class="description-text h7-text roobert-400 grey-600 mgb-36">
            Experience our functionality On Platform Or via API
          </div>

          <!-- DOC LINK -->
          <a href="https://vesicash.com/developers" class="doc-link">
            <div class="icon-wrapper rounded-circle green-500-bg mgr-8">
              <div class="icon icon-caret-right neutral-10"></div>
            </div>

            <div class="text secondary-1-text">Explore our documentation</div>
          </a>
        </div>

        <!-- IMAGE SECTION -->
        <div class="col-12 col-md-6">
          <div class="image-section position-relative w-100">
            <img
              v-lazy="loadImage('api-code-img.png', 'landing')"
              alt="API code"
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
  name: "APIDocBlock",
};
</script>

<style lang="scss" scoped>
.api-doc-block {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .row {
    @include flex-row-between-wrap;

    .title-text {
      font-size: toRem(38);

      @include breakpoint-down(lg) {
        @include font-height(32, 40);
      }

      @include breakpoint-down(sm) {
        @include font-height(30, 40);
      }
    }

    .description-text {
      font-size: toRem(18);
      width: 80%;

      @include breakpoint-down(lg) {
        font-size: toRem(17.5);
        width: 95%;
      }

      @include breakpoint-down(sm) {
        font-size: toRem(16);
        width: 100%;
      }
    }

    .doc-link {
      @include flex-row-start-nowrap;
      width: max-content;

      .icon-wrapper {
        @include draw-shape(24);
        position: relative;

        .icon {
          @include center-placement();
          margin-left: toRem(1);
          font-size: toRem(23);
        }
      }

      .text {
        @include breakpoint-down(lg) {
          font-size: toRem(15);
        }
      }
    }

    .image-section {
      position: relative;
    }
  }
}
</style>