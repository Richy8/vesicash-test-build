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
        <PageBackBtn custom_mode @clicked="$emit('goBackAccountSelection')" />

        <div class="modal-cover-title h5-text mgt--4">Confirm transaction</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-24">
        <ModalListItem
          title="Total Amount"
          :value="`${$money.getSign(getWalletType)}${$money.addComma(
            getWithdrawalMeta.total
          )}`"
        />
        <ModalListItem
          title="Withdrawal fee"
          :value="`${$money.getSign(getWalletType)}${$money.addComma(
            getWithdrawalMeta.fee
          )}`"
        />
        <ModalListItem
          title="Amount to receive"
          :value="`${$money.getSign(getWalletType)}${$money.addComma(
            getWithdrawalMeta.amount - getWithdrawalMeta.fee
          )}`"
        />

        <template v-if="getWalletType === 'naira'">
          <ModalListItem
            title="Bank name"
            :value="getWithdrawalMeta.bank_name"
          />
          <ModalListItem
            title="Account number"
            :value="getWithdrawalMeta.account_no"
          />
          <ModalListItem title="Account name" :value="getWithdrawalMeta.name" />
        </template>

        <template v-if="getWalletType === 'dollar'">
          <ModalListItem title="Country" :value="getWithdrawalMeta.country" />
          <!-- <ModalListItem title="Phone number" :value="getWithdrawalMeta.phone" /> -->
          <ModalListItem
            title="First name"
            :value="getWithdrawalMeta.first_name"
          />
          <ModalListItem
            title="Last name"
            :value="getWithdrawalMeta.last_name"
          />
          <ModalListItem
            title="Bank name"
            :value="getWithdrawalMeta.bank_name"
          />
          <ModalListItem
            title="Iban/Account no."
            :value="getWithdrawalMeta.iban"
          />
          <ModalListItem
            title="Swift code"
            :value="getWithdrawalMeta.swift_code"
          />
          <ModalListItem
            title="Sort code"
            :value="getWithdrawalMeta.sort_code"
          />
          <ModalListItem
            title="Bank Address"
            :value="getWithdrawalMeta.bank_address"
          />
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          ref="continue"
          @click="makeWithdrawal"
        >
          Continue
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "WithdrawConfirmModal",

  components: {
    ModalCover,
    PageBackBtn,
    ModalListItem: () =>
      import(
        /* webpackChunkName: "dashboard-modal-module" */ "@/modules/dashboard/components/modal-comps/modal-list-item"
      ),
  },

  computed: {
    ...mapGetters({
      getWalletType: "dashboard/getWalletType",
      getWithdrawalMeta: "dashboard/getWithdrawalMeta",
    }),

    getWithdrawalPayload() {
      return {
        account_id: this.getAccountId,
        beneficiary_name: this.getWithdrawalMeta.name,
        bank_account_number: this.getWithdrawalMeta.account_no.toString(),
        bank_code: this.getWithdrawalMeta.bank_code?.toString(),
        amount: this.getWithdrawalMeta.amount,
        currency: this.getWalletType === "naira" ? "NGN" : "USD",
        debit_currency: this.getWalletType === "naira" ? "NGN" : "USD",
        gateway: "monnify",
        escrow_wallet: "no",
      };
    },
  },

  methods: {
    ...mapActions({
      withdrawWalletFund: "dashboard/withdrawWalletFund",
    }),

    async makeWithdrawal() {
      try {
        const amount = `${this.$money.getSign(
          this.getWalletType
        )}${this.$money.addComma(
          this.getWithdrawalMeta.amount - this.getWithdrawalMeta.fee
        )}`;

        this.handleClick("continue");

        const response = await this.withdraw(this.getWithdrawalPayload);

        this.handleClick("continue", "Continue", false);

        response.code == 200
          ? this.$router.push({
              name: "SuccessfulWithdrawal",
              query: { amount },
            })
          : this.pushToast(
              response.message || "Withdrawal failed. Please try again",
              "warning"
            );
      } catch (error) {
        console.log(error);
        this.handleClick("continue", "Continue", false);
        this.pushToast("Withdrawal failed. Please try again", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
