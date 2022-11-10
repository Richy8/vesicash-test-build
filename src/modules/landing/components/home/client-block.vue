<template>
  <div class="client-block">
    <div class="vesicash-container">
      <!-- TITLE TEXT -->
      <div class="title-text text-center grey-700 h7-text roobert-400 mgb-50">
        Over 10k+ businesses growing with vesicash
      </div>

      <!-- CLIENT ROW -->
      <div class="client-row">
        <img
          v-lazy="loadImage('client-one.png', 'landing')"
          alt="Tranzfar logo"
        />
        <img v-lazy="loadImage('client-two.png', 'landing')" alt="Maxim logo" />
        <img
          v-lazy="loadImage('client-three.png', 'landing')"
          alt="Flatmatch logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientBlock",
};
</script>

<style lang="scss" scoped>
.client-block {
  padding: toRem(50) 0 0;

  @include breakpoint-down(md) {
    margin-bottom: toRem(-20);
  }

  .title-text {
    @include breakpoint-down(lg) {
      font-size: toRem(18);
    }

    @include breakpoint-down(md) {
      margin-bottom: toRem(40) !important;
    }

    @include breakpoint-down(sm) {
      margin-bottom: toRem(35) !important;
    }

    @include breakpoint-down(xs) {
      font-size: toRem(16);
    }
  }

  .client-row {
    @include flex-row-center-nowrap;

    img {
      margin: 0 toRem(50);
      width: toRem(180);
      height: auto;

      @include breakpoint-down(lg) {
        margin: 0 toRem(40);
        width: toRem(160);
      }

      @include breakpoint-down(md) {
        margin: 0 toRem(20);
        width: toRem(140);
      }

      @include breakpoint-down(sm) {
        margin: 0 toRem(12);
        width: toRem(120);
      }

      @include breakpoint-down(xs) {
        margin: 0 toRem(8);
        width: toRem(100);
      }
    }
  }
}
</style>