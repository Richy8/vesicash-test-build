<template>
  <div class="new-naira-account">
    <!-- SELECT BANK NAME -->
    <div class="form-group">
      <div class="form-label">Select bank</div>

      <!-- SELECT INPUT FIELD -->
      <DropSelectInput
        placeholder="Select bank name"
        :options="bank_name_options"
      />
    </div>

    <!-- BANK ACCOUNT NO -->
    <div class="form-group">
      <div class="form-label" for="accountNumber">Account number</div>
      <input
        type="number"
        id="accountNumber"
        class="form-control"
        placeholder="Enter account number"
      />
    </div>

    <!-- ACCOUNT CONFIRM CARD -->
    <div class="account-confirm-card grey-10-bg rounded-12 mgt--10">
      <div class="name tertiary-2-text grey-900">Salim Adeyemi</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewNairaAccount",

  components: {
    DropSelectInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-select-input"
      ),
  },

  data: () => ({
    bank_name_options: [
      { id: 1, name: "First Bank" },
      { id: 2, name: "Guaranty Trust Bank" },
      { id: 3, name: "United Bank for Africa" },
      { id: 4, name: "Zenith bank" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.account-confirm-card {
  border: toRem(1) dashed getColor("grey-200");
  padding: toRem(14) toRem(16);
}
</style>