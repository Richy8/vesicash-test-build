<template>
  <div class="table-skeleton mgb-50">
    <div class="skeleton-table-header"></div>
    <div class="skeleton-table-body"></div>
    <div class="skeleton-table-body"></div>
    <div class="skeleton-table-body"></div>
    <div class="skeleton-table-body"></div>
  </div>
</template>

<script>
export default {
  name: "TableSkeleton",
};
</script>

<style lang="scss" scoped>
/* Loading Animation */
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.table-skeleton {
  padding: 0 toRem(30) 0;

  @include breakpoint-down(lg) {
    padding: 0 toRem(17) 0;
  }

  @include breakpoint-down(sm) {
    padding: 0 toRem(13.5) 0;
  }
  .skeleton-table-header,
  .skeleton-table-body {
    margin-bottom: toRem(20);
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(#f4f4f4, 0.75) 0.56%,
      rgba(#fbfbfb, 0.75) 96.76%
    );
    height: toRem(37);
    border-radius: toRem(10);
    position: relative;
    overflow: hidden !important;

    &::after {
      position: relative;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      -webkit-background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(transparent),
        color-stop(rgba(255, 255, 255, 0.8)),
        to(transparent)
      );

      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.8),
        transparent
      );

      /* Adding animation */
      animation: loading 1.15s infinite;
    }
  }

  .skeleton-table-body {
    height: toRem(13);
  }
}
</style>
