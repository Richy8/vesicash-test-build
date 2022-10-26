<template>
  <div class="add-beneficiary-block rounded-16 grey-50-bg border-grey-100">
    <div class="input-rows">
      <!-- USER EMAIL ADDRESS -->
      <BasicInput
        input_type="email"
        :input_value="form.email_address"
        is_required
        placeholder="Enter email address"
        :custom_style="{ group_wrapper_style: 'input-field input-field-email' }"
        @getInputState="updateFormState($event, 'email_address')"
        :error_handler="{
          type: 'email',
          message: 'Email address is not valid',
        }"
      />

      <!-- USER PHONE NUMBER -->
      <BasicInput
        input_type="number"
        :input_value="form.phone_number"
        is_phone_type
        is_required
        placeholder="Enter phone number"
        :custom_style="{
          group_wrapper_style:
            'input-field input-field-phone position-relative',
          input_wrapper_style: 'form-prefix',
        }"
        @getInputState="updateFormState($event, 'phone_number')"
        :error_handler="{
          type: 'phone',
          message: 'Phone number is not valid',
        }"
      />

      <button
        class="btn btn-primary btn-md"
        :disabled="isValidState"
        @click="handleAddUser"
      >
        Add User
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import {
  SINGLE_ROLE_OPTIONS,
  USER_ACCESS_OPTIONS,
  USER_PAYOUT_OPTIONS,
} from "@/modules/transactions/constants";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "AddBeneficiarySingleBlock",

  components: {
    BasicInput,
  },

  computed: {
    ...mapGetters({
      getTransactionBeneficiaries: "transactions/getTransactionBeneficiaries",
    }),

    // CHECK FORM BUTTON VALIDITY STATE
    isValidState() {
      return Object.values(this.validity).every((valid) => !valid)
        ? false
        : true;
    },
  },

  data() {
    return {
      form: {
        email_address: "",
        phone_number: "",
      },

      validity: {
        email_address: true,
        phone_number: true,
      },
    };
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_BENEFICIARIES:
        "transactions/UPDATE_TRANSACTION_BENEFICIARIES",
    }),

    // ======================================
    // ADD A NEW USER TO BENEFICIARY LIST
    // ======================================
    handleAddUser() {
      if (this.getTransactionBeneficiaries.length === 2) {
        this.pushToast(
          "Only 2 users are allowed on a single party transaction",
          "error"
        );

        // CLEAR USER INPUT FIELD
        this.clearOutInput();
        return false;
      }

      let user_data = {};

      user_data.id = this.$string.getRandomString(12);
      user_data.account_id = "";
      user_data.email_address = this.form.email_address;
      user_data.phone_number = this.form.phone_number;
      user_data.role = SINGLE_ROLE_OPTIONS[1];

      user_data.access = USER_ACCESS_OPTIONS[1];
      user_data.recipient = USER_PAYOUT_OPTIONS[1];
      user_data.amount = 0;

      this.UPDATE_TRANSACTION_BENEFICIARIES([
        ...this.getTransactionBeneficiaries,
        user_data,
      ]);

      // CLEAR USER INPUT FIELD
      this.clearOutInput();
    },

    // ===============================
    // CLEAR OUT ALL NEW USER INPUT
    // ===============================
    clearOutInput() {
      this.form.phone_number = "";
      this.form.email_address = "";

      this.validity.phone_number = true;
      this.validity.email_address = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-beneficiary-block {
  width: max-content;
  padding: toRem(16);

  @include breakpoint-custom-down(820) {
    width: 100%;
  }

  .input-rows {
    @include flex-row-start-wrap;
    align-items: flex-start;

    .input-field {
      margin-right: toRem(18);
      width: toRem(300);

      @include breakpoint-custom-down(820) {
        margin-bottom: toRem(20);
        width: 48%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(24);
        width: 100%;
      }

      &-email {
        @include breakpoint-down(sm) {
          margin-right: 0;
        }
      }

      &-phone {
        @include breakpoint-custom-down(820) {
          margin-right: 0;
        }
      }
    }

    .btn {
      padding: toRem(8.5) toRem(24);
    }
  }
}
</style>