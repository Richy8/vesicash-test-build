<template>
  <div class="verification-card-wrapper rounded-12">
    <div class="icon-wrapper" :class="[verified && 'icon-wrapper--verified']">
      <CheckIcon v-if="verified" small />
      <slot v-else></slot>
    </div>

    <div>
      <div class="primary-2-text grey-900 mgb-4">{{title}}</div>
      <div class="tertiary-3-text grey-600">{{subtitle}}</div>
    </div>

    <button class="btn btn-primary btn-sm" v-if="!verified" @click="$emit('action')">{{cta_title}}</button>
  </div>
</template>

<script>
import CheckIcon from "@/shared/components/icon-comps/check-icon";
export default {
  name: "VerificationCard",

  components: {
    CheckIcon,
  },

  props: ["title", "subtitle", "cta_title", "verified"],
};
</script>

<style lang="scss" scoped>
.verification-card-wrapper {
  border: toRem(1) solid getColor("grey-100");
  padding: toRem(14) toRem(16);
  display: grid;
  grid-template-columns: toRem(48) 1fr toRem(220);
  gap: toRem(16);
  align-items: center;

  @include breakpoint-down(sm) {
    grid-template-columns: toRem(48) 1fr;
  }

  .icon-wrapper {
    @include draw-shape(48);
    @include flex-column-center;
    background: getColor("teal-50");
    border-radius: 50%;
  }

  .icon-wrapper--verified {
    background: getColor("green-500");
  }

  .btn-sm {
    justify-self: flex-end;

    @include breakpoint-down(sm) {
      justify-self: flex-start;
      grid-column: 1/3;
    }
  }
}
</style>