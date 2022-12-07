<template>
  <div class="solution-developers teal-50-bg">
    <div class="vesicash-container">
      <!-- TITLE TEXT -->
      <div class="title-text h1-text roobert-700 teal-900 mgb-32">
        Developers
      </div>

      <!-- DESCRIPTION TEXT -->
      <div class="description-text grey-700 h6-text roobert-400">
        Get access to the vesicash API, view documentation and get a first hand
        experience of how it works via our Playground.
      </div>

      <div class="row">
        <div
          class="col-12 col-md-4"
          v-for="(content, index) in developer_content"
          :key="index"
        >
          <SolutionDeveloperCard :content="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionDevelopers",

  components: {
    SolutionDeveloperCard: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/solutions/solution-developer-card"
      ),
  },

  data: () => ({
    developer_content: [
      {
        title: "Playground",
        description:
          "Interract with the Vesicash system and est out various use cases via our playground.",
      },
      {
        title: "Wordpress Plugin",
        description: "Integrate Vesicash directly into your woocommerce store.",
      },
      {
        title: "API Documentation",
        description: "Go through our thorough API documentation",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.solution-developers {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .title-text {
    @include breakpoint-down(lg) {
      @include font-height(52, 68);
    }

    @include breakpoint-down(md) {
      @include font-height(46, 64);
    }

    @include breakpoint-down(sm) {
      @include font-height(40, 54);
    }

    @include breakpoint-down(xs) {
      @include font-height(34, 48);
    }
  }

  .description-text {
    margin-bottom: toRem(60);
    width: 60%;

    @include breakpoint-down(lg) {
      @include font-height(22, 32);
      width: 90%;
    }

    @include breakpoint-down(md) {
      @include font-height(21, 32);
      width: 100%;
    }

    @include breakpoint-down(sm) {
      @include font-height(20, 30);
    }

    @include breakpoint-down(xs) {
      @include font-height(18, 28);
    }
  }

  .row {
    @include flex-row-between-wrap;
  }
}
</style>