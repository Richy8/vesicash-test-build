<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    :fill="fill ? '#0B618F' : 'none'"
  >
    <path
      d="M8 3.84262C5.56018 2.80334 4.16306 2.73446 2.08757 3.58602C1.72642 3.7342 1.5 4.09271 1.5 4.48308L1.5 10.6178C1.5 11.3417 2.24523 11.8183 2.93714 11.6055C4.67838 11.07 5.99019 11.2572 8 12.1575C10.224 13.1816 11.6046 13.2812 13.8866 12.4061C14.2609 12.2626 14.5 11.8971 14.5 11.4962L14.5 5.38601C14.5 4.66109 13.7529 4.18472 13.0601 4.39796C11.3419 4.92674 10.0272 4.74495 8 3.84262Z"
      stroke="#0B618F"
    />
    <circle cx="8" cy="8" r="2" :fill="fill ? '#eef9fd' : '#0B618F'" />
    <path
      d="M3.5 5.00065C4.21464 4.67552 4.64556 4.62672 5.5 5.00065"
      :stroke="fill ? '#eef9fd' : '#0B618F'"
      stroke-linecap="round"
    />
    <path
      d="M10.5 10.7376C11.2146 11.0628 11.6456 11.1116 12.5 10.7376"
      :stroke="fill ? '#eef9fd' : '#0B618F'"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  name: "MoneyIcon",

  props: {
    fill: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>