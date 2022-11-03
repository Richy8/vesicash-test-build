<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-xs' }">
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Add naira account</div>
        <div class="tertiary-2-text grey-600 wt-75">Add a new naira account</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group">
          <div class="form-label">Select bank</div>

          <!-- SELECT INPUT FIELD -->
          <DropSelectInput
            placeholder="Select bank"
            :options="nigerian_banks"
            @optionSelected="bank = $event"
          />

          <div class="skeleton-loader"></div>
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Enter your account number"
            label_id="acct-details"
            :input_value="form.account_number"
            is_required
            placeholder="Emter account number"
            @getInputState="updateFormState($event, 'account_number')"
            :error_handler="{
            type: 'minimum',
            message: 'Enter a valid account number',
            minimum:10
          }"
          />
        </div>

        <!-- ACCOUNT CONFIRM CARD -->
        <div class="account-confirm-card grey-10-bg rounded-12 mgt--10">
          <div class="name tertiary-2-text" :class="invalid_account ? 'red-600' : 'grey-900'">
            {{
            account_details ? account_details.account_name : verification_message
            }}
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button ref="save" class="btn btn-primary btn-md wt-100 mgt-17" @click="save">Add account</button>
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
  name: "VerificationBvnModal",

  components: {
    ModalCover,
    BasicInput,
    DropSelectInput,
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
        this.account_details = null;
        this.$emit("nairaBankUpdated", null);
        if (state.length >= 10 && this.bank)
          await this.verifyAccount(state, this.bank.code);
      },
    },
  },

  async mounted() {
    await this.fetchNigeriaBanks();
  },

  data: () => ({
    bank_name_options_repo: [],
    bank_name_options: [],

    bank: null,
    form: {
      account_number: "",
    },

    validity: {
      account_number: true,
    },
    account_details: null,
    verification_message: "Account Name",
    invalid_account: false,
  }),

  methods: {
    ...mapActions({
      getAllBanks: "general/getAllBanks",
      verifyBankAccount: "general/verifyBankAccount",
    }),

    async fetchNigeriaBanks() {
      const response = await this.getAllBanks("Nigeria");

      if (response.code === 200) {
        let bank_options = response.data;

        bank_options.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });

        let filtered_banks = [];

        bank_options.map((bank) => {
          if (filtered_banks.findIndex((b) => b.code === bank.code) === -1)
            filtered_banks.push(bank);
        });

        this.bank_name_options_repo = this.bank_name_options = filtered_banks;
      }
    },

    async verifyAccount(account_number, bank_code) {
      this.invalid_account = false;
      this.verification_message = "Verifying account...";

      const payload = {
        bank_code,
        account_number,
      };

      const response = await this.verifyBankAccount(payload);

      if (response.status === "ok") {
        this.verification_message = "Account Name";
        this.account_details = response.data;
        this.$emit("nairaBankUpdated", this.getNairaBankDetails);
      } else {
        this.verification_message =
          response.message || "Account number is invalid";
        this.invalid_account = true;
      }
    },

    // FILTER THROUGH BANK NAMES
    filterBankList($event) {
      let filtered_list = [];

      if ($event.length) {
        this.bank_name_options_repo.map((bank) => {
          if (bank.name.toLowerCase().includes($event.toLowerCase())) {
            filtered_list.push(bank);
          }
        });
        this.bank_name_options = filtered_list;
      } else this.bank_name_options = this.bank_name_options_repo;
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

