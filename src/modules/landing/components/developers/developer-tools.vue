<template>
  <div class="developer-tools teal-50-bg">
    <div class="vesicash-container">
      <div class="col-12 col-md-10 col-lg-7">
        <!-- TITLE TEXT -->
        <div class="title-text h2-text roobert-700 teal-900 mgb-24">
          Developers
        </div>

        <!-- DESCRIPTION TEXT -->
        <div class="description-text roobert-400 h6-text grey-600">
          Get access to the vesicash API, view documentation and get a first
          hand experience of how it works via our Playground.
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="developer-card">
            <div class="title">Playground</div>
            <div class="description">
              Interract with the Vesicash system and est out various use cases
              via our playground.
            </div>

            <div class="btn-row">
              <a href="#" class="btn btn-secondary btn-lg mgr-16 roobert-500"
                >Launch playground</a
              >
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="developer-card">
            <div class="title">Wordpress Plugin</div>
            <div class="description">
              Integrate Vesicash directly into your woocommerce store.
            </div>

            <div class="btn-row">
              <a href="#" class="btn btn-secondary btn-lg mgr-16 roobert-500"
                >View wordpress doc</a
              >
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="developer-card">
            <div class="title">Our SDKs</div>
            <div class="description">
              Our collection of SDKs allow you call just what you need, on your
              choice of stack
            </div>

            <div class="btn-row">
              <a href="#" class="btn btn-secondary btn-lg mgr-16 roobert-500"
                >View Nodejs SDK</a
              >
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="developer-card">
            <div class="title">API Documentation</div>
            <div class="description">
              Sign up to access the API, Sandbox, Widget or request a custom
              integration option
            </div>

            <div class="btn-row">
              <a href="#" class="btn btn-secondary btn-lg mgr-16 roobert-500"
                >View documentation</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeveloperTools",
};
</script>

<style lang="scss" scoped>
.developer-tools {
  padding: toRem(120) 0 toRem(72);

  @include breakpoint-down(md) {
    padding: toRem(80) 0 toRem(40);
  }

  .title-text {
    @include breakpoint-down(md) {
      @include generate-font-type("h3");
    }

    @include breakpoint-down(sm) {
      @include generate-font-type("h4");
    }
  }

  .description-text {
    margin-bottom: toRem(64);

    @include breakpoint-down(md) {
      @include generate-font-type("h7");
    }

    @include breakpoint-down(sm) {
      font-size: toRem(18);
    }
  }

  .developer-card {
    position: relative;
    background: getColor("neutral-10");
    margin-bottom: toRem(48);
    border-radius: toRem(16);
    padding: toRem(24);
    height: toRem(320);

    .title {
      @include generate-font-type("h3");
      font-family: "Roobert-Bold";
      color: getColor("grey-900");
      margin-bottom: toRem(16);

      @include breakpoint-down(md) {
        @include generate-font-type("h4");
      }

      @include breakpoint-down(md) {
        @include generate-font-type("h5");
      }
    }

    .description {
      @include generate-font-type("h7");
      font-family: "Roobert-Regular";
      color: getColor("grey-600");

      @include breakpoint-down(sm) {
        font-size: toRem(18);
      }
    }

    .btn-row {
      position: absolute;
      bottom: toRem(24);
      width: 92%;

      @include breakpoint-down(sm) {
        width: 89%;
      }

      @include breakpoint-down(xs) {
        width: 88%;
      }

      .btn {
        width: 100%;
      }
    }
  }
}
</style>