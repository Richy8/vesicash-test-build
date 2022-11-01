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
  padding: toRem(50) 0;

  .client-row {
    @include flex-row-center-nowrap;

    img {
      margin: 0 toRem(50);
      width: toRem(180);
      height: auto;
    }
  }
}
</style>