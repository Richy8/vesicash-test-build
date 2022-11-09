<template>
  <svg
    v-if="profileMenu"
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
  >
    <circle cx="9.0695" cy="23.5834" r="2.29167" fill="white" />
    <ellipse cx="19.0001" cy="10.5972" rx="4.58333" ry="5.34722" fill="#B3E4FB" />
    <ellipse cx="19.0001" cy="25.1111" rx="12.2222" ry="6.11111" fill="#043B56" />
    <circle
      cx="28.1668"
      cy="20.5279"
      r="6.11111"
      fill="#B3E4FB"
      stroke="#EEF9FD"
      stroke-width="2.29167"
    />
    <path d="M28.1667 18.6946V22.514" stroke="white" stroke-width="2.29167" stroke-linecap="round" />
    <path
      d="M30.0764 20.604L26.257 20.604"
      stroke="white"
      stroke-width="2.29167"
      stroke-linecap="round"
    />
  </svg>

  <svg
    v-else
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
    profileMenu: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>