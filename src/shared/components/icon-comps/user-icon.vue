<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="124"
    height="124"
    viewBox="0 0 124 124"
    fill="none"
    v-if="big"
  >
    <circle cx="28.4167" cy="77.5" r="7.75" fill="white" />
    <ellipse cx="62" cy="33.5833" rx="15.5" ry="18.0833" fill="#B3E4FB" />
    <ellipse cx="62.0001" cy="82.6667" rx="41.3333" ry="20.6667" fill="#043B56" />
    <circle
      cx="92.9999"
      cy="67.1667"
      r="20.6667"
      fill="#B3E4FB"
      stroke="white"
      stroke-width="7.75"
    />
    <path d="M93 60.9688V73.8854" stroke="white" stroke-width="7.75" stroke-linecap="round" />
    <path
      d="M99.4583 67.4297L86.5416 67.4297"
      stroke="white"
      stroke-width="7.75"
      stroke-linecap="round"
    />
  </svg>

  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-else
  >
    <circle cx="5.5" cy="15" r="1.5" fill="white" />
    <ellipse cx="12" cy="6.5" rx="3" ry="3.5" fill="#B3E4FB" />
    <ellipse cx="12" cy="16" rx="8" ry="4" fill="#043B56" />
    <circle cx="18" cy="13" r="4" fill="#B3E4FB" stroke="white" stroke-width="1.5" />
    <path d="M18 11.8008V14.3008" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <path
      d="M19.25 13.0508L16.75 13.0508"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  name: "UserIcon",

  props: {
    big: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>