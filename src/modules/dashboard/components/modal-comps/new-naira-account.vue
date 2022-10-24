<template>
  <div class="new-naira-account">
    <!-- SELECT BANK NAME -->
    <div class="form-group">
      <div class="form-label">Select bank</div>

      <!-- SELECT INPUT FIELD -->
      <DropSelectInput
        placeholder="Select bank name"
        :options="bank_name_options"
        @optionSelected="bank = $event"
      />
    </div>

    <!-- BANK ACCOUNT NO -->
    <div class="form-group">
      <BasicInput
        label_title="Account number"
        label_id="account_number"
        input_type="number"
        :input_value="form.account_number"
        is_required
        placeholder="Your account number"
        @getInputState="updateFormState($event, 'account_number')"
        :error_handler="{
            type: 'required',
            message: 'Enter your account number',
          }"
      />
    </div>

    <!-- ACCOUNT CONFIRM CARD -->
    <div class="account-confirm-card grey-10-bg rounded-12 mgt--10">
      <div
        class="name tertiary-2-text grey-900"
      >{{ account_details ? account_details.account_name : "Account name" }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormHelper from "@/modules/auth/mixins/auth-helper";

export default {
  name: "NewNairaAccount",

  mixins: [FormHelper],

  components: {
    DropSelectInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-select-input"
      ),
    BasicInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/form-comps/basic-input"
      ),
  },

  async mounted() {
    await this.fetchNigeriaBanks();
  },

  computed: {
    getNairaBankDetails() {
      return {
        account_name: this.account_details?.account_name,
        account_no: this.account_details?.account_number,
        bank_id: this.bank.id,
        bank_name: this.bank.name,
        country: "NG",
        currency: "NGN",
      };
    },
  },

  watch: {
    bank: {
      async handler(state) {
        this.account_details = null;
        this.$emit("nairaBankUpdated", null);
        if (state && this.form.account_number.length >= 10)
          await this.verifyAccount(this.form.account_number, state.code);
      },
    },

    "form.account_number": {
      async handler(state) {
        this.$emit("nairaBankUpdated", null);
        if (state.length >= 10 && this.bank)
          await this.verifyAccount(state, this.bank.code);
      },
    },
  },

  data: () => ({
    bank_name_options: [],
    bank: null,
    form: {
      account_number: "",
    },

    validity: {
      account_number: true,
    },
    account_details: null,
  }),

  methods: {
    ...mapActions({
      getAllBanks: "general/getAllBanks",
      verifyBankAccount: "general/verifyBankAccount",
    }),

    async fetchNigeriaBanks() {
      const response = await this.getAllBanks("Nigeria");
      if (response.code === 200) this.bank_name_options = response.data;
    },

    async verifyAccount(account_number, bank_code) {
      const payload = {
        bank_code,
        account_number,
      };

      const response = await this.verifyBankAccount(payload);

      if (response.code === 200) {
        this.account_details = response.data;
        this.$emit("nairaBankUpdated", this.getNairaBankDetails);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.account-confirm-card {
  border: toRem(1) dashed getColor("grey-200");
  padding: toRem(14) toRem(16);
}
</style>
