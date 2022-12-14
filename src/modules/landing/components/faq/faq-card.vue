<template>
  <div
    class="faq-card rounded-12 pointer smooth-transition close"
    :class="is_close ? 'close' : 'open'"
    @click="toggleOpen"
  >
    <!-- TOP ROW -->
    <div class="faq-question-row">
      <div>{{ faq.question }}</div>
      <div class="icon" :class="is_close ? 'icon-plus' : 'icon-minus'"></div>
    </div>

    <!-- BOTTOM ROW -->
    <div class="faq-answer-row" v-if="!is_close" v-html="faq.answer"></div>
  </div>
</template>

<script>
export default {
  name: "FAQCard",

  props: {
    faq: {
      type: Object,
    },
  },

  data() {
    return {
      is_close: true,
    };
  },

  methods: {
    toggleOpen() {
      this.is_close = !this.is_close;
    },
  },
};
</script>

<style lang="scss" scoped>
.faq-card {
  @include generate-font-type("h7");
  margin-bottom: toRem(24);
  padding: toRem(24);

  @include breakpoint-down(md) {
    @include font-height(16, 24);
  }

  .faq-question-row {
    font-family: "Roobert-SemiBold", sans-serif;
    @include flex-row-between-nowrap;

    .icon {
      font-size: toRem(24);
    }
  }

  .faq-answer-row {
    font-family: "Roobert-Regular", sans-serif;
    margin-top: toRem(10);
    font-size: toRem(19);

    @include breakpoint-down(md) {
      @include font-height(16, 24);
    }
  }

  &.close {
    border: toRem(1) solid getColor("grey-100");
    padding: toRem(16) toRem(24);
    color: getColor("grey-900");
  }

  &.open {
    background: getColor("teal-800");
    color: getColor("neutral-10");
    padding: toRem(24);
  }

  .anchor {
    @include generate-font-type("h7");
    color: getColor("neutral-10");
    text-decoration: underline;

    @include breakpoint-down(md) {
      @include font-height(16, 24);
    }
  }
}
</style>