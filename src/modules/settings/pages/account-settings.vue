<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">Account</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">Update or add new naira or dollar account</div>

    <TabSwitcher :tabs="tab_options" @tabSelected="account_type=$event" />

    <div class="accounts-container">
      <div class="add-account-button">
        <span class="icon icon-plus h5 green-600"></span>
        <div class="green-600 secondary-2-text">Add new account details</div>
      </div>
    </div>
  </div>
</template>

<script>
import TabSwitcher from "@/shared/components/tab-switcher";
export default {
  name: "AccountSettings",

  components: {
    TabSwitcher,
  },

  data() {
    return {
      tab_options: [
        {
          name: "Dollar type",
          value: "dollar",
          active: false,
        },
        {
          name: "Naira type",
          value: "naira",
          active: true,
        },
      ],

      account_type: "naira",
    };
  },
};
</script>

<style lang="scss" scoped>
.page-meta {
  padding-bottom: toRem(24);
  border-bottom: toRem(0.5) solid getColor("grey-200");
  margin-bottom: toRem(32);
}

.accounts-container {
  @include flex-column-center;
  min-height: toRem(310);

  .add-account-button {
    @include flex-column-center;
    padding: toRem(14);
    border: toRem(1) solid getColor("grey-100");
    border-radius: toRem(12);
    width: toRem(352);
    cursor: pointer;
  }
}
</style>