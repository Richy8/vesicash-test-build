<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
    :show_close_btn="false"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <!-- BACK BUTTON -->
        <PageBackBtn custom_mode @clicked="$emit('goBackWalletSelection')" />

        <div class="modal-cover-title h5-text mgt--4">Withdraw funds</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-24">
        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-24">
          <SumTotalDisplayCard
            :total_text="getBalanceTitle"
            :total_value="getWalletBalance"
            use_custom_style
          />
        </div>

        <!-- AMOUNT TO WITHDRAW -->
        <div class="form-group">
          <BasicInput
            label_title="Amount to withdraw"
            label_id="amount"
            :input_value="form.amount"
            input_type="number"
            is_required
            placeholder="0.00"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            :currency="withdrawalCurrency"
            class="form-prefix-right"
            @getInputState="updateFormState($event, 'amount')"
            :error_handler="{
              type: 'required',
              message: 'Enter an amount',
            }"
          />
        </div>

        <template v-if="!initiate_new_account">
          <!--ACCOUNT DISPLAY DETAILS -->
          <div class="form-group mgb-20">
            <div class="form-label">Select bank details</div>
            <div
              class="skeleton-data skeleton-loader rounded-2"
              v-if="loading_banks"
            ></div>

            <template v-else>
              <AccountDisplayCard
                v-for="(account, index) in getWithdrawalAccounts"
                :key="index"
                :index="index"
                :card_detail="account"
                @selectAccount="toggleSelection(account.index)"
              />
            </template>
          </div>

          <!-- RADIO SELECT -->
          <div class>
            <RadioSelectCard
              label_id="account1"
              label_text="Add new bank details"
              card_name="account"
              :single_type="true"
              @clicked="createNewAccount"
            />
          </div>
        </template>

        <!-- NEW ACCOUNT VIEW -->
        <template v-if="initiate_new_account">
          <transition name="fade" mode="out-in">
            <component
              :is="getAccountType"
              @nairaBankUpdated="new_naira_account = $event"
              @dollarBankUpdated="updateDollarAccount"
            />
          </transition>
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          @click="handleAccountSelection"
          :disabled="continueDisabled"
          ref="continue"
        >
          Continue
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";
import FormHelper from "@/modules/auth/mixins/auth-helper";

export default {
  name: "WithdrawAccountModal",

  mixins: [FormHelper],

  components: {
    ModalCover,
    PageBackBtn,
    RadioSelectCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/radio-select-card"
      ),

    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/sum-total-display-card"
      ),

    AccountDisplayCard: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/account-display-card"
      ),

    NewNairaAccount: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/modal-comps/new-naira-account"
      ),

    NewDollarAccount: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/modal-comps/new-dollar-account"
      ),
    BasicInput: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/form-comps/basic-input"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
  },

  computed: {
    ...mapGetters({
      getWalletType: "dashboard/getWalletType",
      getNairaBalance: "dashboard/getNairaBalance",
      getDollarBalance: "dashboard/getDollarBalance",
    }),

    withdrawalCurrency() {
      const currency = this.getWalletType === "naira" ? "NGN" : "USD";
      return `${currency} (${this.$money.getSign(this.getWalletType)})`;
    },

    getAccountType() {
      return this.getWalletType === "naira"
        ? "NewNairaAccount"
        : "NewDollarAccount";
    },

    getBalanceTitle() {
      return this.getWalletType === "naira"
        ? "Naira balance"
        : "Dollar balance";
    },

    getWalletBalance() {
      const balance =
        this.getWalletType === "naira"
          ? this.getNairaBalance
          : this.getDollarBalance;

      const sign = this.getWalletType === "naira" ? "₦" : "$";

      return `${sign}${this.$money.addComma(balance)}`;
    },

    getWithdrawalAccounts() {
      return this.getWalletType === "naira"
        ? this.accounts.filter((account) => account.currency === "NGN")
        : this.accounts.filter((account) => account.currency === "USD");
    },

    getSelectedAccount() {
      return this.accounts.find((account) => account.selected);
    },
    getNewAccount() {
      if (!this.initiate_new_account) return this.getSelectedAccount;
      return this.getWalletType === "naira"
        ? this.new_naira_account
        : this.new_dollar_account;
    },

    getFirstName() {
      if (!this.getNewAccount) return "";
      return this.getNewAccount?.account_name?.trim().split(/\s+/)[1];
    },

    getLastName() {
      if (!this.getNewAccount) return "";
      return this.getNewAccount?.account_name?.trim().split(/\s+/)[0];
    },

    getFee() {
      const amount = Number(this.form.amount);
      if (amount > 1000000) return 2000;
      if (amount > 500000) return 1000;
      return 500;
    },

    nairaWithdrawalDetails() {
      return {
        amount: this.form.amount,
        fee: this.getFee,
        total: Number(Number(this.form.amount) + this.getFee),
        country: "Nigeria",
        phone: this.phone,
        first_name: this.getFirstName,
        last_name: this.getLastName,
        name: this.getNewAccount?.account_name || "",
        bank_name: this.getNewAccount?.bank_name || "",
        account_no: this.getNewAccount?.account_no || "",
        bank_code: this.getNewAccount?.bank_id,
      };
    },

    dollarWithdrawalDetails() {
      return {
        amount: this.form.amount,
        fee: this.getFee,
        total: Number(Number(this.form.amount) + this.getFee),
        country: "United States",
        phone: this.phone,
        first_name: this.getFirstName,
        last_name: this.getLastName,
        name: this.getNewAccount?.account_name || "",
        bank_name: this.getNewAccount?.bank_name || "",
        iban: this.getNewAccount?.account_no || "",
        account_no: this.getNewAccount?.account_no || "",
        swift_code: this.getNewAccount?.swift_code || "",
        sort_code: this.getNewAccount?.sort_code || "",
        bank_address: this.getNewAccount?.bank_address || "",
        bank_code: this.getNewAccount?.bank_id,
      };
    },

    continueDisabled() {
      if (!this.form.amount) return true;
      if (this.initiate_new_account) {
        return this.getAccountType === "NewNairaAccount"
          ? !this.new_naira_account
          : !this.new_dollar_account;
      } else {
        return this.getSelectedAccount ? false : true;
      }
    },
  },

  watch: {
    getWithdrawalAccounts: {
      handler(accounts) {
        if (!accounts.length)
          this.pushToast(
            `Please add a ${this.getWalletType} account to continue`
          );
      },
    },
  },

  async mounted() {
    await this.fetchUserBanks();
  },

  data: () => ({
    initiate_new_account: false,
    new_account_type: "NewDollarAccount",
    loading_banks: false,
    new_naira_account: null,
    new_dollar_account: null,
    phone: "",
    amount: "",
    form: {
      amount: "",
    },

    validity: {
      form: true,
    },

    accounts: [],
  }),

  methods: {
    ...mapActions({
      fetchBankDetails: "dashboard/fetchBankDetails",
      addNewBank: "settings/addNewBank",
    }),

    ...mapMutations({
      setWithrawalMeta: "dashboard/SET_WITHDRAWAL_META",
    }),

    updateDollarAccount(account) {
      this.phone = account?.phone;
      const dollar_account = account;
      delete dollar_account?.phone;
      this.new_dollar_account = dollar_account;
    },

    async fetchUserBanks() {
      this.loading_banks = true;
      try {
        const response = await this.fetchBankDetails(this.getAccountId);
        this.loading_banks = false;

        response.code === 200
          ? (this.accounts = response.data.map((account, index) => ({
              ...account,
              index,
              selected: false,
            })))
          : this.pushToast(
              response.message
                ? `${response.message}. Add new bank to continue`
                : "Failed to load bank details. Add new bank to continue",
              "warning"
            );
      } catch {
        this.loading_banks = false;
        this.pushToast("Failed to load bank details", "error");
      }
    },

    toggleSelection(index) {
      this.accounts.map((account) => (account.selected = false));
      this.accounts[index].selected = true;
    },

    createNewAccount() {
      this.initiate_new_account = true;
    },

    async handleAccountSelection() {
      const withdrawalMeta =
        this.getAccountType === "NewNairaAccount"
          ? this.nairaWithdrawalDetails
          : this.dollarWithdrawalDetails;

      if (this.initiate_new_account) {
        this.handleClick("continue", "Adding new account");

        const response = await this.addNewBank({
          account_id: this.getAccountId,
          updates:
            this.getAccountType === "NewNairaAccount"
              ? this.new_naira_account
              : this.new_dollar_account,
        });

        this.handleClick("continue", "Continue", false);
        if (response.code === 200) {
          this.setWithrawalMeta(withdrawalMeta);
          this.$emit("accountSelected");
        }
      } else {
        this.setWithrawalMeta(withdrawalMeta);
        this.$emit("accountSelected");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-data {
  max-height: 60vh;
  overflow-y: auto;
  height: toRem(35);
  width: 100%;
}
</style>