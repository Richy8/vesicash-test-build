<template>
  <svg
    v-if="profileMenu"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 7.5V7C17 5.89543 16.1046 5 15 5H11C9.89543 5 9 5.89543 9 7V17C9 18.1046 9.89543 19 11 19H15C16.1046 19 17 18.1046 17 17V16.5"
      stroke="#D45D7F"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M16 12H20H21M21 12L19.5 10.5M21 12L19.5 13.5"
      stroke="#A3284C"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 5.63961C3 4.68625 3.67292 3.86542 4.60777 3.67845L10.6078 2.47845C11.8453 2.23093 13 3.17752 13 4.43961V19.5604C13 20.8225 11.8454 21.7691 10.6078 21.5216L4.60777 20.3216C3.67292 20.1346 3 19.3138 3 18.3604V5.63961Z"
      fill="#A3284C"
    />
    <circle cx="9.5" cy="12" r="1.5" fill="white" />
  </svg>

  <svg
    v-else
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.6667 10.0001V9.33341C22.6667 7.86066 21.4728 6.66675 20 6.66675H14.6667C13.1939 6.66675 12 7.86065 12 9.33341V22.6667C12 24.1395 13.1939 25.3334 14.6667 25.3334H20C21.4728 25.3334 22.6667 24.1395 22.6667 22.6667V22.0001"
      stroke="#D45D7F"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M21.3333 16H26.6666H27.9999M27.9999 16L25.9999 14M27.9999 16L25.9999 18"
      stroke="#A3284C"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 7.51956C4 6.24841 4.89723 5.15397 6.14369 4.90468L14.1437 3.30468C15.7938 2.97465 17.3333 4.23677 17.3333 5.91956V26.0806C17.3333 27.7634 15.7938 29.0255 14.1437 28.6955L6.14369 27.0955C4.89723 26.8462 4 25.7518 4 24.4806V7.51956Z"
      fill="#A3284C"
    />
    <circle cx="12.6667" cy="16" r="2" fill="white" />
  </svg>
</template>

<script>
export default {
  name: "ExitIcon",

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