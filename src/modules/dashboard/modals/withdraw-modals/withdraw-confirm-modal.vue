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
          title="Amount to withdraw"
          :value="`${getWalletType == 'naira' ? 'N' : '$'}${
            getWithdrawalMeta.amount
          }`"
        />
        <ModalListItem
          title="Withdrawal fee"
          :value="`${getWalletType == 'naira' ? 'N' : '$'}${
            getWithdrawalMeta.fee
          }`"
        />
        <ModalListItem
          title="Total"
          :value="`${getWalletType == 'naira' ? 'N' : '$'}${
            getWithdrawalMeta.total
          }`"
        />

        <template v-if="getWalletType === 'naira'">
          <ModalListItem title="Bank name" :value="getWithdrawalMeta.bank_name" />
          <ModalListItem title="Account number" :value="getWithdrawalMeta.account_no" />
          <ModalListItem title="Account name" :value="getWithdrawalMeta.name" />
        </template>

        <template v-if="getWalletType === 'dollar'">
          <ModalListItem title="Country" :value="getWithdrawalMeta.country" />
          <!-- <ModalListItem title="Phone number" :value="getWithdrawalMeta.phone" /> -->
          <ModalListItem title="First name" :value="getWithdrawalMeta.first_name" />
          <ModalListItem title="Last name" :value="getWithdrawalMeta.last_name" />
          <ModalListItem title="Bank name" :value="getWithdrawalMeta.bank_name" />
          <ModalListItem title="Iban/Account no." :value="getWithdrawalMeta.iban" />
          <ModalListItem title="Swift code" :value="getWithdrawalMeta.swift_code" />
          <ModalListItem title="Sort code" :value="getWithdrawalMeta.sort_code" />
          <ModalListItem title="Bank Address" :value="getWithdrawalMeta.bank_address" />
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
        >Continue</button>
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

  props: {},

  computed: {
    ...mapGetters({
      getWalletType: "dashboard/getWalletType",
      getWithdrawalMeta: "dashboard/getWithdrawalMeta",
    }),

    getWithdrawalPayload() {
      return {
        account_id: this.getAccountId,
        beneficiary_name: this.getWithdrawalMeta.name,
        bank_account_number: this.getWithdrawalMeta.account_no,
        bank_code: this.getWithdrawalMeta.bank_code,
        amount: this.getWithdrawalMeta.total,
        currency: this.getWalletType === "naira" ? "NGN" : "USD",
        debit_currency: this.getWalletType === "naira" ? "NGN" : "USD",
      };
    },
  },

  data: () => ({}),

  methods: {
    ...mapActions({ withdraw: "dashboard/withdraw" }),

    async makeWithdrawal() {
      try {
        const amount = `${this.getWalletType == "naira" ? "N" : "$"}${
          this.getWithdrawalMeta.amount
        }`;

        this.handleClick("continue");

        const response = await this.withdraw(this.getWithdrawalPayload);

        this.handleClick("continue", "Continue", false);

        response.code == 200
          ? this.$router.push({
              name: "SuccessfulWithdrawal",
              query: { amount },
            })
          : this.pushToast(
              response.message || "Withdrawal failed. Pleaase try again",
              "warning"
            );
      } catch (error) {
        this.handleClick("continue", "Continue", false);

        this.pushToast("Withdrawal failed. Pleaase try again", "error");
      }
    },
  },
};
</script>

<style lang="scss">
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
