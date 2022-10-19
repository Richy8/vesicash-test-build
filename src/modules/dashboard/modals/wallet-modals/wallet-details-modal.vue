<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :show_close_btn="false"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">
          <!-- BACK BUTTON -->
          <PageBackBtn custom_mode @clicked="$emit('goBackWalletSelection')" />

          Fund <span class="text-capitalize">{{ wallet_type }}</span> wallet
        </div>

        <div class="modal-cover-meta">
          <template v-if="wallet_type === 'naira'">
            Please send the amount you wish to fund to the Bank account details
            listed below
          </template>

          <template v-else>
            Please enter the amount you wish to fund on your dollar wallet
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div
        class="modal-cover-body"
        :class="wallet_type === 'naira' ? 'mgb--10' : 'mgb--40'"
      >
        <!-- MODAL ITEMS WRAPPER -->
        <div
          class="modal-items-wrapper green-10-bg rounded-12 mgb-24"
          v-if="wallet_type === 'naira'"
        >
          <!-- NAIRA WALLET TYPE -->
          <template v-if="naira_wallet_loading">
            <ModalListItem :loading="naira_wallet_loading" />
            <ModalListItem :loading="naira_wallet_loading" />
            <ModalListItem :loading="naira_wallet_loading" />
          </template>

          <template v-else>
            <ModalListItem
              v-for="(data, index) in naira_wallet_info"
              :title="data.title"
              :value="data.value"
              :key="index"
            />
          </template>
        </div>

        <!-- DOLLAR WALLET TYPE -->
        <template v-else>
          <div class="form-group">
            <BasicInput
              label_title="Enter amount to fund"
              label_id="amount"
              input_type="number"
              is_required
              placeholder="0.00"
              currency="USD ($)"
              :input_value="form.dollar_amount"
              :custom_style="{
                input_wrapper_style: 'form-prefix form-prefix-right',
              }"
              @getInputState="updateFormState($event, 'dollar_amount')"
              :error_handler="{
                type: 'required',
                message: 'Amount field is required',
              }"
            />
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <template v-if="wallet_type === 'naira'">
          <button
            class="btn btn-primary btn-md wt-100"
            @click="handleFundSuccess"
          >
            I have funded
          </button>
        </template>

        <template v-else>
          <button
            class="btn btn-primary btn-md wt-100"
            @click="handleDollarFunding"
            ref="fundBtn"
            :disabled="isValidState"
          >
            Make payment
          </button>
        </template>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";
import FormHelper from "@/modules/auth/mixins/auth-helper";
import BasicInput from "@/shared/components/form-comps/basic-input";
import { VESICASH_APP_URL } from "@/utilities/constant";

export default {
  name: "WalletDetailsModal",

  mixins: [FormHelper],

  components: {
    ModalCover,
    PageBackBtn,
    BasicInput,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  props: {
    wallet_type: {
      type: String,
      default: "naira",
    },
  },

  computed: {
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
        dollar_amount: "",
      },

      validity: {
        dollar_amount: true,
      },

      naira_wallet_info: [],
      naira_wallet_loading: true,
    };
  },

  mounted() {
    this.wallet_type === "naira" && this.handleFetchingNairaDetails();
  },

  methods: {
    ...mapActions({
      initiateDollarFunds: "dashboard/initiateDollarFunds",
      fetchNairaWalletBankDetails: "dashboard/fetchNairaWalletBankDetails",
    }),

    // ========================================
    // HANDLE FETCHING OF NAIRA BANK DETAILS
    // ========================================
    handleFetchingNairaDetails() {
      let request_payload = {
        account_id: this.getAccountId,
      };

      this.fetchNairaWalletBankDetails(request_payload)
        .then((response) => {
          if (response.code === 200) {
            let account = response?.data?.payment_account ?? {};

            delete account.id;
            delete account.business_id;
            delete account.payment_id;
            delete account.transaction_id;
            delete account.expires_after;
            delete account.is_used;
            delete account.created_at;
            delete account.updated_at;
            delete account.status;

            for (const prop in account) {
              let prop_obj = {};
              prop_obj.title = prop.split("_").join(" ");
              prop_obj.value = account[prop];

              this.naira_wallet_info.push(prop_obj);
            }

            this.naira_wallet_loading = false;
          } else this.naira_wallet_loading = false;
        })
        .catch(() => (this.naira_wallet_loading = false));
    },

    handleFundSuccess() {
      this.$emit("walletFunded");
    },

    // =======================================
    // HANDLE PROCESSING OF DOLLAR FUNDING
    // =======================================
    handleDollarFunding() {
      this.handleClick("fundBtn");

      let request_payload = {
        account_id: this.getAccountId,
        currency: "USD",
        country: "US",
        amount: this.form.dollar_amount,
        fund_wallet: true,
        success_url: `${VESICASH_APP_URL}/fund-wallet-success`,
        fail_url: `${VESICASH_APP_URL}/fund-wallet-error`,
      };

      this.initiateDollarFunds(request_payload)
        .then((response) => {
          if (response.code === 200) {
            // REDIRECT USER TO PAYMENT GATEWAY
            this.handleClick("fundBtn", "Make payment", false);
            location.href = response.data.link;
          }

          // HANDLE NON 200 RESPONSE
          else this.handlePaymentError(response.message);
        })
        .catch(() =>
          this.handlePaymentError("Unable to make payment at this time")
        );
    },

    handlePaymentError(message) {
      this.pushToast(message, "error");
      this.handleClick("fundBtn", "Make payment", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;

  .modal-items-wrapper {
    border: toRem(1) dashed getColor("green-500");
    padding: toRem(2) toRem(18);
  }
}
</style>