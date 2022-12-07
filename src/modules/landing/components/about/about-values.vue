<template>
  <div class="about-values teal-50-bg">
    <div class="vesicash-container">
      <!-- TITLE TEXT -->
      <div class="title-text h1-text teal-900 roobert-700">Our Values</div>

      <div class="row">
        <div
          class="col-12 col-lg-10"
          v-for="(value, index) in values"
          :key="index"
        >
          <AboutValueRow :value="value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutValues",

  components: {
    AboutValueRow: () =>
      import(
        /* webpackChunkName: 'landing-module' */ "@/modules/landing/components/about/about-value-row"
      ),
  },

  data: () => ({
    values: [
      {
        counter: "01",
        title: "Trust",
        description:
          "You can trust our product and services to take your business to the next level and also make your business more successful",
      },
      {
        counter: "02",
        title: "Accountabilty",
        description:
          "At Vesicash our system of operation is transparent, allowing you to observe and evaluate our performance.",
      },
      {
        counter: "03",
        title: "Transparency",
        description:
          "You can trust our product and services to take your business to the next level and also make your business more successful",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.about-values {
  padding: toRem(120) 0;

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }

  .title-text {
    margin-bottom: toRem(60);

    @include breakpoint-down(lg) {
      @include font-height(52, 68);
    }

    @include breakpoint-down(md) {
      @include font-height(40, 48);
    }

    @include breakpoint-down(sm) {
      @include font-height(30, 42);
      margin-bottom: toRem(50);
    }
  }

  .row {
    @include flex-column-end-end;
  }
}
</style>