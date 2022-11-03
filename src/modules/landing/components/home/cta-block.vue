<template>
  <div class="cta-block teal-900-bg">
    <div class="vesicash-container">
      <!-- HEADER TEXT -->
      <div
        class="header-text text-center h1-text roobert-700 neutral-10 mgb-32"
      >
        Ready to grow your <br />
        business to the next level
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text text-center h7-text grey-200 mgb-50">
        Let’s help you with all the tools you need to take your business to the
        next level
      </div>

      <!-- BUTTON ROW -->
      <div class="button-row">
        <a
          href="https://vesicash.com/contact"
          class="btn btn-secondary btn-md mgr-16"
          >Contact Sales</a
        >
        <router-link to="/register-lander" class="btn btn-primary btn-md mgl-16"
          >Create an account</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTABlock",
};
</script>

<style lang="scss" scoped>
.cta-block {
  padding: toRem(120) 0;

  .vesicash-container {
    @include flex-column-center;

    .header-text {
      @include font-height(62, 75);
    }

    .description-text {
      font-size: toRem(18);
      width: 45%;
    }

    .button-row {
      @include flex-row-center-nowrap;

      .btn-secondary {
        padding: toRem(12) toRem(50);
      }

      .btn-primary {
        padding: toRem(14) toRem(35);
      }
    }
  }
}
</style>