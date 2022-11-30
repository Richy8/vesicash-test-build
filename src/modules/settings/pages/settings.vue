<template>
  <div class="settings-page">
    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">Settings</div>

    <div class="row">
      <div class="col-12 col-md-10 col-lg-9">
        <!-- PAGE SWITCHER ROUTE -->
        <PageSwitcherRoute :page_data="getPages" />

        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import PageSwitcherRoute from "@/shared/components/page-switcher-route";

export default {
  name: "Settings",

  components: {
    PageSwitcherRoute,
  },

  computed: {
    isBusiness() {
      return this.getAccountType === "business" ? true : false;
    },

    getPages() {
      const pages = [...this.pages];
      if (!this.isBusiness) pages.splice(4, 1);
      return pages;
    },
  },

  data() {
    return {
      pages: [
        {
          id: 1,
          name: "Profile",
          route: "ProfileSettings",
          active: true,
        },
        {
          id: 2,
          name: "Password",
          route: "PasswordSettings",
          active: false,
        },
        {
          id: 3,
          name: "Verification",
          route: "VerificationSettings",
          active: false,
        },
        {
          id: 4,
          name: "Account",
          route: "AccountSettings",
          active: false,
        },
        {
          id: 5,
          name: "Users",
          route: "UsersSettings",
          active: false,
        },
        {
          id: 6,
          name: "API",
          route: "APISettings",
          active: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.settings-form-area {
  .page-input-block {
    border-top: toRem(0.5) solid getColor("grey-200");
    @include flex-row-start-nowrap;
    align-items: flex-start;
    padding: toRem(32) 0;

    @include breakpoint-down(sm) {
      @include flex-column-start-start;
      padding: toRem(24) 0;
    }
  }

  .btn-row {
    .btn {
      padding: toRem(10) toRem(50);
    }
  }
}
</style>
