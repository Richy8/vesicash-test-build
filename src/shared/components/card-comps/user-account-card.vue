<template>
  <div class="user-account-card" @click="$emit('click',account)">
    <div>
      <div class="mgb-4 secondary-1-text text-white">{{account.account_name}}</div>

      <div class="meta-wrapper">
        <div class="account-meta tertiary-3-text">
          <span class="dot"></span>
          <span>{{account.account_no}}</span>
        </div>

        <div class="account-meta tertiary-3-text">
          <span class="dot"></span>
          <span>{{account.bank_name}}</span>
        </div>

        <div class="account-meta tertiary-3-text" v-if="account.sort_code">
          <span class="dot"></span>
          <span>{{account.sort_code}}</span>
        </div>
      </div>
    </div>
    <span class="icon icon-caret-right text-white"></span>
  </div>
</template>

<script>
export default {
  name: "UserAccountCard",

  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin card-size {
  width: toRem(352);

  @include breakpoint-custom-down(800) {
    width: toRem(342);
  }
  @include breakpoint-custom-down(790) {
    width: toRem(332);
  }
  @include breakpoint-custom-down(771) {
    width: 100%;
  }
}

.user-account-card {
  @include card-size;
  padding: toRem(14) toRem(16);
  border-radius: toRem(12);
  @include flex-row-between-nowrap;
  align-items: center;
  background: getColor("teal-800");
  transition: background ease-in-out 0.25s;
  cursor: pointer;

  &:hover {
    background: getColor("teal-900");
  }

  .meta-wrapper {
    @include flex-row-start-nowrap;
    gap: 0 toRem(8);
  }

  .account-meta {
    @include flex-row-start-nowrap;
    gap: 0 toRem(8);
    color: getColor("teal-200");

    &:first-child {
      .dot {
        display: none;
      }
    }
  }

  .dot {
    @include draw-shape(4);
    background: getColor("grey-300");
    border-radius: 50%;
  }

  .icon {
    font-size: toRem(26);
  }
}
</style>