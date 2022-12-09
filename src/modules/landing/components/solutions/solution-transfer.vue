<template>
  <div class="solution-transfer teal-50-bg">
    <div class="vesicash-container">
      <div class="row">
        <!-- IMAGE SECTION -->
        <div class="img-section col-12 col-md-6">
          <div class="position-relative w-100">
            <img
              v-lazy="loadImage('solution-img-one.png', 'landing')"
              alt="Vesicash-transfer-funds"
              class="wt-100"
            />
          </div>
        </div>

        <!-- COPY SECTION -->
        <div class="copy-section col-12 col-md-6 mb-5 mb-md-0">
          <div class="title-text h2-text roobert-700 grey-900 mgb-16">Transfer funds worldwide</div>

          <div class="description-text h7-text roobert-400 grey-600 mgb-40">
            Withdraw money from a linked bank account or send money to over 50
            countries with just a few clicks.
          </div>

          <!-- CREATE ACCOUNT -->
          <router-link
            to="/register-lander"
            class="btn btn-primary btn-md roobert-500"
            style="width: max-content"
          >Create an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionTransfer",
};
</script>

<style lang="scss" scoped>
.solution-transfer {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .row {
    @include flex-row-between-wrap;

    .img-section {
      @include breakpoint-down(md) {
        order: 2;
      }
    }

    .copy-section {
      padding-left: toRem(32);

      @include breakpoint-down(lg) {
        padding-left: toRem(16);
      }

      @include breakpoint-down(md) {
        padding-left: toRem(16);
        order: 1;
      }

      .title-text {
        // font-size: toRem(38);

        @include breakpoint-down(lg) {
          @include font-height(32, 40);
        }

        @include breakpoint-down(sm) {
          @include font-height(30, 40);
        }
      }

      .description-text {
        @include font-height(24, 32);
        width: 95%;

        @include breakpoint-down(lg) {
          @include font-height(18, 30);
        }

        @include breakpoint-down(sm) {
          @include font-height(17, 30);
          width: 100%;
        }
      }

      .btn {
        padding: toRem(17) toRem(35);
        font-size: toRem(16);
      }
    }
  }
}
</style>