<template>
  <div class="new-dollar-account">
    <!-- SELECT COUNTRY NAME -->
    <div class="form-group">
      <div class="form-label">Select country</div>

      <!-- SELECT INPUT FIELD -->
      <DropSelectInput
        placeholder="Select country"
        :options="country_options"
        @optionSelected="country = $event"
      />
    </div>

    <!-- PHONE INPUT -->
    <div class="form-group">
      <BasicInput
        label_title="Phone number"
        label_id="phone_number"
        :input_value="form.phone"
        input_type="phone"
        is_required
        is_phone_type
        placeholder="Enter your phone number"
        :custom_style="{ input_wrapper_style: 'form-prefix' }"
        @getInputState="updateFormState($event, 'phone')"
        :error_handler="{
            type: 'phone',
            message: 'Enter a valid phone number.',
          }"
      />
    </div>

    <!-- ACCOUNT NAME -->
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <BasicInput
            label_title="First name"
            label_id="first_name"
            :input_value="form.first_name"
            is_required
            placeholder="Your first name"
            @getInputState="updateFormState($event, 'first_name')"
            :error_handler="{
            type: 'required',
            message: 'Enter your first name',
          }"
          />
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="form-group">
          <BasicInput
            label_title="Last name"
            label_id="last_name"
            :input_value="form.last_name"
            is_required
            placeholder="Your last name"
            @getInputState="updateFormState($event, 'last_name')"
            :error_handler="{
            type: 'required',
            message: 'Enter your last name',
          }"
          />
        </div>
      </div>
    </div>

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

    <!-- ACCOUNT NUMBER-->
    <div class="form-group">
      <BasicInput
        label_title="IBAN/Account number"
        label_id="account_number"
        :input_value="form.account_number"
        is_required
        input_type="number"
        placeholder="Your IBAN/Account number"
        @getInputState="updateFormState($event, 'account_number')"
        :error_handler="{
            type: 'required',
            message: 'Enter your IBAN/Account number',
          }"
      />
    </div>

    <!-- SWIFT && SORT CODE -->
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <BasicInput
            label_title="Swift Code"
            label_id="swift_code"
            :input_value="form.swift_code"
            is_required
            placeholder="Your swift code"
            @getInputState="updateFormState($event, 'swift_code')"
            :error_handler="{
            type: 'required',
            message: 'Enter your bank swift code',
          }"
          />
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="form-group">
          <BasicInput
            label_title="Routing/Sort code"
            label_id="sort_code"
            :input_value="form.sort_code"
            is_required
            placeholder="Your sort code"
            @getInputState="updateFormState($event, 'sort_code')"
            :error_handler="{
            type: 'required',
            message: 'Enter your bank sort code',
          }"
          />
        </div>
      </div>
    </div>

    <!-- BANK ADDRESS -->
    <div class="form-group">
      <BasicInput
        label_title="Bank Address"
        label_id="bank_address"
        :input_value="form.bank_address"
        is_required
        placeholder="Your bank address"
        @getInputState="updateFormState($event, 'bank_address')"
        :error_handler="{
            type: 'required',
            message: 'Enter your bank address',
          }"
      />
    </div>
  </div>
</template>

<script>
import FormHelper from "@/modules/auth/mixins/auth-helper";

export default {
  name: "NewDollarAccount",

  mixins: [FormHelper],

  components: {
    DropSelectInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-select-input"
      ),
    DropDownSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-down-select"
      ),
    BasicInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/form-comps/basic-input"
      ),
  },

  computed: {
    getBankDetails() {
      return {
        account_name: `${this.form.last_name} ${this.form.first_name}`,
        account_no: this.form.account_number,
        swift_code: this.form.swift_code,
        sort_code: this.form.sort_code,
        bank_address: this.form.bank_address,
        bank_name: this.bank?.name,
        currency: "USD",
        phone: this.form.phone,
      };
    },

    // CHECK FORM BUTTON VALIDITY STATE
    isValidState() {
      return Object.values(this.validity).every((valid) => !valid);
    },
  },

  watch: {
    getBankDetails: {
      handler(bank) {
        if (!this.isValidState) {
          this.$emit("dollarBankUpdated", null);
          return;
        }
        if (!this.bank) {
          this.$emit("dollarBankUpdated", null);
          return;
        }

        this.$emit("dollarBankUpdated", bank);
      },
    },
  },

  data: () => ({
    show_dropdown: false,
    country: null,
    bank: null,

    form: {
      phone: "",
      first_name: "",
      last_name: "",
      swift_code: "",
      sort_code: "",
      account_number: "",
      bank_address: "",
    },

    validity: {
      phone: true,
      first_name: true,
      last_name: true,
      swift_code: true,
      sort_code: true,
      account_number: true,
      bank_address: true,
    },

    country_options: [
      { id: 1, name: "United State of America" },
      { id: 2, name: "Canada" },
      { id: 3, name: "Australia" },
      { id: 4, name: "United Kingdom" },
    ],

    bank_name_options: [
      { id: 1, name: "First Bank" },
      { id: 2, name: "Guaranty Trust Bank" },
      { id: 3, name: "United Bank for Africa" },
      { id: 4, name: "Zenith bank" },
    ],
  }),

  methods: {
    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    forceClose() {
      this.show_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
