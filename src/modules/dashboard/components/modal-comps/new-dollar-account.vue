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
      <div class="form-label" for="phoneNumber">Phone number</div>

      <div class="form-prefix">
        <input
          type="number"
          id="phoneNumber"
          class="form-control"
          placeholder="Enter your phone number"
          v-model="phone"
        />

        <!-- PREFIX AREA -->
        <div
          class="prefix-select-area"
          @click="toggleDropdown"
          v-on-clickaway="forceClose"
        >
          <img v-lazy="loadFalseImage('flag.png')" alt="" />
          <div class="icon icon-caret-fill-down"></div>
        </div>
      </div>

      <!-- DROP DOWN SELECT AREA -->
      <template name="drop-select-area" v-if="show_dropdown">
        <DropDownSelect />
      </template>
    </div>

    <!-- ACCOUNT NAME -->
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <div class="form-label" for="firstName">First name</div>
          <input
            type="text"
            id="firstName"
            class="form-control"
            placeholder="Your first name"
            v-model="first_name"
          />
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="form-group">
          <div class="form-label" for="lastName">Last name</div>
          <input
            type="text"
            id="lastName"
            class="form-control"
            placeholder="Your last name"
            v-model="last_name"
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
      <div class="form-label" for="accountNumber">IBAN/Account Number</div>
      <input
        type="text"
        id="accountNumber"
        class="form-control"
        placeholder="Your IBAN/Account Number"
        v-model="account_number"
      />
    </div>

    <!-- SWIFT && SORT CODE -->
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <div class="form-label" for="swiftCode">Swift code</div>
          <input
            type="text"
            id="swiftCode"
            class="form-control"
            placeholder="Your swift code"
            v-model="swift_code"
          />
        </div>
      </div>

      <div class="col-12 col-sm-6">
        <div class="form-group">
          <div class="form-label" for="sortCode">Routing/Sort code</div>
          <input
            type="text"
            id="sortCode"
            class="form-control"
            placeholder="Your routing/sort code"
            v-model="sort_code"
          />
        </div>
      </div>
    </div>

    <!-- BANK ADDRESS -->
    <div class="form-group">
      <div class="form-label" for="bankAddress">Bank Address</div>
      <input
        type="text"
        id="bankAddress"
        class="form-control"
        placeholder="Your bank address"
        v-model="bank_address"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewDollarAccount",

  components: {
    DropSelectInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-select-input"
      ),
    DropDownSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-down-select"
      ),
  },

  computed: {
    getBankDetails() {
      return {
        account_name: `${this.last_name} ${this.first_name}`,
        account_no: this.account_number,
        swift_code: this.swift_code,
        sort_code: this.sort_code,
        bank_address: this.bank_address,
        bank_name: this.bank?.name,
        currency: "USD",
        phone: this.phone,
      };
    },
  },

  watch: {
    getBankDetails: {
      handler(bank) {
        if (!this.phone) {
          this.$emit("dollarBankUpdated", null);
        }
        for (const key in bank) {
          if (!bank[key]) {
            this.$emit("dollarBankUpdated", null);
            return;
          }
        }
        this.$emit("dollarBankUpdated", bank);
      },
    },
  },

  data: () => ({
    show_dropdown: false,
    country: null,
    phone: "",
    first_name: "",
    last_name: "",
    bank: null,
    swift_code: "",
    sort_code: "",
    account_number: "",
    bank_address: "",
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
