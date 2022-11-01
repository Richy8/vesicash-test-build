<template>
  <div class="api-doc-block teal-50-bg">
    <div class="vesicash-container row">
      <!-- COPY SECTION -->
      <div class="copy-section col-12 col-sm-6">
        <div class="title-text h2-text roobert-700 grey-900 mgb-16">
          Your Payments, Your way
        </div>

        <div class="description-text h7-text roobert-400 grey-600 mgb-36">
          Experience our functionality On Platform (UI of Dashboard) Or via API
          (Code snippet)
        </div>

        <!-- DOC LINK -->
        <a href="/" class="doc-link">
          <div class="icon-wrapper rounded-circle green-500-bg mgr-8">
            <div class="icon icon-caret-right neutral-10"></div>
          </div>

          <div class="text secondary-1-text">Visit our documention</div>
        </a>
      </div>

      <!-- IMAGE SECTION -->
      <div class="image-section col-12 col-sm-6">
        <img v-lazy="loadImage('api-code-img.png', 'landing')" alt="API code" />
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

  .vesicash-container {
    @include flex-row-between-nowrap;

    .title-text {
      font-size: toRem(38);
    }

    .description-text {
      font-size: toRem(18);
      width: 80%;
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
      }
    }

    .image-section {
      position: relative;
      @include draw-shape(550, 524);

      img {
        @include set-full-bg();
      }
    }
  }
}
</style>