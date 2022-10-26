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
            total_text="Naira balance"
            total_value="N6,400,000"
            use_custom_style
          />
        </div>

        <!-- AMOUNT TO WITHDRAW -->
        <div class="form-group">
          <label class="form-label" for="withdrawAmount"
            >Amount to withdraw</label
          >

          <div class="form-prefix form-prefix-right">
            <input
              type="number"
              id="withdrawAmount"
              class="form-control"
              placeholder="0.00"
            />

            <!-- PREFIX AREA -->
            <div class="prefix-select-area value-area">
              <div class="value grey-900 text-no-wrap">
                NGN (<span v-html="$money.getSign('naira')"></span>)
              </div>
            </div>
          </div>
        </div>

        <template v-if="!initiate_new_account">
          <!--ACCOUNT DISPLAY DETAILS -->
          <div class="form-group mgb-20">
            <div class="form-label">Select bank details</div>
            <AccountDisplayCard
              v-for="(account, index) in accounts"
              :key="index"
              :index="index"
              :card_detail="account"
              @selectAccount="toggleSelection"
            />
          </div>

          <!-- RADIO SELECT -->
          <div class="">
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
            <component :is="new_account_type" />
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
        >
          Continue
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import PageBackBtn from "@/shared/components/page-back-btn";

export default {
  name: "WithdrawAccountModal",

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
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
  },

  data: () => ({
    initiate_new_account: false,
    new_account_type: "NewDollarAccount",

    accounts: [
      {
        account_name: "Awotunde bangalee",
        account_no: "01398595485",
        bank_name: "GtBank",
        sort_code: "2020300440",
        selected: false,
      },
      //   {
      //     account_name: "Awotunde bangalee",
      //     account_no: "01398595485",
      //     bank_name: "GtBank",
      //     sort_code: "2020300440",
      //     selected: false,
      //   },
    ],
  }),

  methods: {
    toggleSelection(index) {
      this.accounts.map((account) => (account.selected = false));
      this.accounts[index].selected = true;
    },

    createNewAccount() {
      this.initiate_new_account = true;
    },

    handleAccountSelection() {
      this.$emit("accountSelected");
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