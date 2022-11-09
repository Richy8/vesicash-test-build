<template>
  <div class="profile-menu-wrapper">
    <div class="user-icon-wrapper">
      <UserIcon profileMenu />
    </div>

    <div>
      <div class="grey-900 primary-2-text mgb-4">Credtco limited</div>
      <div class="tertiary-3-text green-500">ID: {{id}}</div>
    </div>

    <div class="menu-icon-wrapper">
      <span class="icon icon-ellipsis-h" @click="toggleMenu"></span>

      <div class="profile-menu-block smooth-animation" v-if="show_menu" v-on-clickaway="toggleMenu">
        <div class="profile-menu-item border-bottom-grey-100">
          <CopyIcon />
          <span class="tertiary-2-text grey-900">Copy Merchant ID</span>
        </div>

        <div class="profile-menu-item" @click="$emit('exit')">
          <ExitIcon profileMenu />
          <span class="red-600 tertiary-2-text">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from "@/shared/components/icon-comps/user-icon";
import ExitIcon from "@/shared/components/icon-comps/exit-icon";
import CopyIcon from "@/shared/components/icon-comps/copy-icon";

export default {
  name: "ProfileMenu",

  components: {
    UserIcon,
    CopyIcon,
    ExitIcon,
  },

  props: {
    id: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      show_menu: false,
    };
  },

  methods: {
    toggleMenu() {
      this.show_menu = !this.show_menu;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-menu-wrapper {
  position: relative;
  @include flex-row-start-nowrap;
  gap: 0 toRem(16);
  background: #ffffff;
  padding: toRem(8);
  border-radius: toRem(8);
  cursor: pointer;
  z-index: 306000;

  .user-icon-wrapper {
    @include draw-shape(40);
    @include flex-column-center;
    border: toRem(0.715) solid getColor("teal-200");
    border-radius: toRem(8.57);
    background: getColor("teal-50");
  }

  .menu-icon-wrapper {
    position: absolute;
    left: calc(100% - 30px);
    cursor: pointer;
    z-index: 306000;

    .icon-ellipsis-h {
      position: absolute;
      top: toRem(-8);
      transform: rotate(90deg);
    }

    .profile-menu-block {
      filter: drop-shadow(1px -1px 4px rgba(168, 177, 175, 0.3))
        drop-shadow(-1px 1px 4px rgba(168, 177, 175, 0.3));
      position: absolute;
      width: max-content;
      min-width: toRem(200);
      top: toRem(10);
      left: calc(100% + 15px);
      transform: translateY(-100%);
      border-radius: toRem(8);
      background: #ffffff;
      z-index: 306000;

      .profile-menu-item {
        @include flex-row-start-nowrap;
        padding: toRem(14) toRem(12);
        gap: 0 toRem(16);
        cursor: pointer;
        background: #ffffff;
        transition: background ease-in-out 0.3s;
        z-index: 306000;

        &:hover {
          background: getColor("green-50");
        }

        &:first-of-type {
          border-radius: toRem(8) toRem(8) 0 0;
        }

        &:last-of-type {
          border-radius: 0 0 toRem(8) toRem(8);
        }
      }
    }
  }
}
</style>