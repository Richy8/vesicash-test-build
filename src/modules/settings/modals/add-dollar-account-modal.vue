<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
    class="add-dollar-account-modal"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Add dollar account</div>
        <div class="tertiary-2-text grey-600 wt-75">Add a new dollar account</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- <div class="form-group">
          <div class="form-label">Select Country</div>

          SELECT INPUT FIELD
          <DropSelectInput
            placeholder="Select country"
            :options="country_options"
            @optionSelected="country = $event"
          />
        </div>-->

        <div class="form-group inline-group">
          <BasicInput
            class="w-100"
            label_title="Account first name"
            label_id="acct-first-name"
            :input_value="form.account_first_name"
            is_required
            placeholder="Enter account first name"
            @getInputState="updateFormState($event, 'account_first_name')"
            :error_handler="{
            type: 'minimum',
            message: 'Name should be at least two characters long',
            minimum:2
          }"
          />

          <BasicInput
            class="w-100"
            label_title="Account last name"
            label_id="acct-last-name"
            :input_value="form.account_last_name"
            is_required
            placeholder="Enter account last name"
            @getInputState="updateFormState($event, 'account_last_name')"
            :error_handler="{
            type: 'minimum',
            message: 'Name should be at least two characters long',
            minimum:2
          }"
          />
        </div>

        <div class="form-group">
          <!-- <div class="form-label">Select bank</div> -->

          <!-- SELECT INPUT FIELD -->
          <!-- <DropSelectInput
            placeholder="Select bank"
            :options="bank_name_options"
            @optionSelected="bank = $event"
          />-->

          <BasicInput
            label_title="Bank name"
            label_id="acct-bank-name"
            :input_value="form.bank_name"
            is_required
            placeholder="Enter bank name"
            @getInputState="updateFormState($event, 'bank_name')"
            :error_handler="{
            type: 'required',
            message: 'Bank name is required'
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Iban/Account number"
            label_id="acct-bank-iban-no"
            :input_value="form.account_number"
            is_required
            placeholder="Enter Iban/Account number"
            @getInputState="updateFormState($event, 'account_number')"
            :error_handler="{
            type: 'required',
            message: 'Enter Iban/Account number'
          }"
          />
        </div>

        <div class="form-group inline-group">
          <BasicInput
            class="w-100"
            label_title="Swift code"
            label_id="acct-swift-code"
            :input_value="form.account_swift_code"
            is_required
            placeholder="Enter account swift code"
            @getInputState="updateFormState($event, 'account_swift_code')"
            :error_handler="{
            type: 'required',
            message: 'Enter account swift code'
          }"
          />

          <BasicInput
            class="w-100"
            label_title="Routing/sort code"
            label_id="acct-sort-code"
            :input_value="form.account_sort_code"
            is_required
            placeholder="Enter account routing/sort code"
            @getInputState="updateFormState($event, 'account_sort_code')"
            :error_handler="{
            type: 'required',
            message: 'Enter account sort code'
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Bank address"
            label_id="acct-bank-address"
            :input_value="form.account_bank_address"
            is_required
            placeholder="Enter bank address"
            @getInputState="updateFormState($event, 'account_bank_address')"
            :error_handler="{
            type: 'required',
            message: 'Enter bank address'
          }"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          ref="save"
          class="btn btn-primary btn-md wt-100"
          :disabled="isDisabled"
          @click="addNewDollarAccount"
        >Add account</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "AddDollarAccountModal",

  components: {
    ModalCover,
    BasicInput,
    DropSelectInput,
  },

  computed: {
    isDisabled() {
      const is_form_invalid = Object.values(this.validity).some(
        (valid) => valid
      );
      return is_form_invalid;
    },

    getNewDollarAccountDetails() {
      return {
        account_id: this.getAccountId,
        updates: {
          account_name: `${this.form.account_last_name} ${this.form.account_first_name}`,
          account_no: this.form.account_number,
          swift_code: this.form.account_swift_code,
          sort_code: this.form.account_sort_code,
          bank_address: this.form.account_bank_address,
          bank_name: this.form.bank_name,
          currency: "USD",
        },
      };
    },
  },

  data: () => ({
    country: null,
    bank: null,

    country_options: [
      { id: 1, name: "United State of America" },
      { id: 2, name: "United Kingdom" },
      { id: 3, name: "Canada" },
      { id: 4, name: "Australia" },
    ],

    bank_name_options: [
      { id: 1, name: "Citi Bank" },
      { id: 2, name: "BOA" },
      { id: 3, name: "Chase Bank" },
      { id: 4, name: "Capital One Bank" },
    ],

    form: {
      account_first_name: "",
      account_last_name: "",
      account_number: "",
      account_swift_code: "",
      account_sort_code: "",
      account_bank_address: "",
      bank_name: "",
    },

    validity: {
      account_first_name: true,
      account_last_name: true,
      account_number: true,
      account_swift_code: true,
      account_sort_code: true,
      account_bank_address: true,
      bank_name: true,
    },
  }),

  methods: {
    ...mapActions({
      addNewBank: "settings/addNewBank",
      fetchAllBanks: "settings/fetchAllBanks",
    }),

    async addNewDollarAccount() {
      this.handleClick("save", "Adding account...");
      try {
        const response = await this.addNewBank(this.getNewDollarAccountDetails);

        if (response.code === 200) {
          this.handleClick("save", "Updating bank list...");
          await this.fetchAllBanks(this.getAccountId);
          this.handleClick("save", "Add account", false);
          this.$emit(
            "saved",
            "You have successfully added another bank account"
          );
        } else {
          this.handleClick("save", "Add account", false);
          this.pushToast(
            response.message || "Failed to add new bank account",
            "warning"
          );
        }
      } catch (err) {
        console.log("Error adding dollar account", err);
        this.pushToast("Failed to add new bank account", "error");
        this.handleClick("save", "Add account", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-group {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  gap: toRem(16);

  @include breakpoint-custom-down(776) {
    @include flex-row-start-wrap;
  }
}
</style>

<style lang="scss">
.add-dollar-account-modal.modal-overlay {
  .modal-outer-container {
    top: toRem(10);
    margin-bottom: toRem(20);
  }
}
</style>

