<template>
  <div class="app-chip" :class="`app-chip-${card_type}`">
    <div class="chip-text">{{ card_text }}</div>
  </div>
</template>

<script>
export default {
  name: "TagCard",

  props: {
    card_text: {
      type: String,
      default: "Completed",
    },

    card_type: {
      type: String,
      default: "success", // success, error, progress, okay
    },
  },
};
</script>

<style lang="scss" scoped>
</style>