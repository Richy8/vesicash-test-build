<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Edit User</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div
        class="modal-cover-body"
        :class="user_data.account_id && type === 'single' ? 'mgb--50' : null"
      >
        <!-- EMAIL ADDRESS INPUT -->
        <div class="form-group" v-if="!user_data.account_id">
          <BasicInput
            label_title="Email address"
            label_id="emailAddress"
            input_type="email"
            :input_value="user_data.email_address || form.email_address"
            is_required
            placeholder="Enter email address"
            @getInputState="updateFormState($event, 'email_address')"
            :error_handler="{
              type: 'email',
              message: 'Email address is not valid',
            }"
          />
        </div>

        <!-- PHONE INPUT -->
        <div class="form-group" v-if="!user_data.account_id">
          <BasicInput
            label_title="Phone number"
            label_id="phoneNumber"
            input_type="number"
            :input_value="user_data.phone_number || form.phone_number"
            is_phone_type
            is_required
            placeholder="Enter your phone number"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            @getInputState="updateFormState($event, 'phone_number')"
            :error_handler="{
              type: 'phone',
              message: 'Phone number is not valid',
            }"
          />
        </div>

        <!-- USER ROLE INPUT -->
        <template v-if="!evaluate_cta">
          <div class="form-group">
            <div class="form-label">Select user role</div>
            <DropSelectInput
              placeholder="Select user role"
              @selectedOption="selectUserOption('role', $event)"
              :pre_select="user_data.role"
              :options="
                type === 'single'
                  ? user_single_role_options
                  : user_multiple_role_options
              "
            />
          </div>

          <template v-if="type === 'multiple'">
            <!-- USER ACCESS INPUT -->
            <div class="form-group">
              <div class="form-label">Select user access</div>
              <DropSelectInput
                placeholder="Select access"
                @selectedOption="selectUserOption('access', $event)"
                :pre_select="user_data.access"
                :options="user_access_options"
              />
            </div>

            <!-- USER PAYOUT INPUT -->
            <div class="form-group">
              <div class="form-label">User receives payout</div>
              <DropSelectInput
                placeholder="Select payout status"
                @selectedOption="selectUserOption('recipient', $event)"
                :pre_select="user_data.recipient"
                :options="user_payout_options"
              />
            </div>
          </template>
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100" @click="saveUserChanges">
          Save changes
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import {
  SINGLE_ROLE_OPTIONS,
  MULTIPLE_ROLE_OPTIONS,
  USER_ACCESS_OPTIONS,
  USER_PAYOUT_OPTIONS,
} from "@/modules/transactions/constants";
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "EditUserModal",

  components: {
    ModalCover,
    BasicInput,
    DropSelectInput,
  },

  props: {
    type: {
      type: String,
      default: "single",
    },

    user_data: {
      type: Object,
    },

    evaluate_cta: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      getTransactionBeneficiaries: "transactions/getTransactionBeneficiaries",
    }),
  },

  data() {
    return {
      form: {
        email_address: this.user_data.email_address,
        phone_number: this.user_data.phone_number,
        user_role: this.user_data.role,
        user_access: this.user_data.access,
        user_recipient: this.user_data.recipient,
      },

      user_single_role_options: SINGLE_ROLE_OPTIONS,
      user_multiple_role_options: MULTIPLE_ROLE_OPTIONS,
      user_access_options: USER_ACCESS_OPTIONS,
      user_payout_options: USER_PAYOUT_OPTIONS,
    };
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_BENEFICIARIES:
        "transactions/UPDATE_TRANSACTION_BENEFICIARIES",
    }),

    // ======================================
    // UPDATE USER SELECTION OPTION
    // ======================================
    selectUserOption(type, selected_id) {
      if (type === "role") {
        this.form.user_role = this.user_multiple_role_options.find(
          (user) => user.id === selected_id
        );
      } else if (type === "access") {
        this.form.user_access = this.user_access_options.find(
          (user) => user.id === selected_id
        );
      } else {
        this.form.user_recipient = this.user_payout_options.find(
          (user) => user.id === selected_id
        );
      }
    },

    // ==========================
    // UPDATE USER CHANGES
    // ==========================
    saveUserChanges() {
      // CHECK MULTIPLE PARTY SELECTIONS
      if (this.type === "multiple") {
        if (!this.checkMultiplePartySelections()) return true;
      }

      let user_index = this.getTransactionBeneficiaries.findIndex(
        (user) => user.id === this.user_data.id
      );

      this.getTransactionBeneficiaries[user_index].email_address =
        this.form.email_address;

      this.getTransactionBeneficiaries[user_index].phone_number =
        this.form.phone_number;

      this.getTransactionBeneficiaries[user_index].role = this.form.user_role;

      this.getTransactionBeneficiaries[user_index].access =
        this.form.user_access;

      this.getTransactionBeneficiaries[user_index].recipient =
        this.form.user_recipient;

      this.UPDATE_TRANSACTION_BENEFICIARIES([
        ...this.getTransactionBeneficiaries,
      ]);

      this.$emit("closeTriggered");
    },

    // ===================================================
    // CHECK IF SELECTED ROLE MATCHES ACCESS LEVELS
    // ===================================================
    checkMultiplePartySelections() {
      // BUYER CHECKS
      if (this.form.user_role.name === "Buyer") {
        if (this.form.user_access.name === "Mark as done") {
          this.pushToast(
            "A buyer cannot be assigned a 'Mark as done' access",
            "error"
          );
          return false;
        } else if (this.form.user_recipient.name === "Yes") {
          this.pushToast("A buyer cannot be a recipient of a payout", "error");
          return false;
        } else return true;
      }
      // SELLER CHECKS
      else if (this.form.user_role.name === "Seller") {
        if (this.form.user_access.name === "Approve") {
          this.pushToast(
            "A seller cannot be assigned an 'Approval' access",
            "error"
          );
          return false;
        } else return true;
      } else return true;
    },
  },
};
</script>

<style>
</style>