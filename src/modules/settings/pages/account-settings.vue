<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">Account</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">Update or add new naira or dollar account</div>

    <TabSwitcher :tabs="tab_options" @tabSelected="account_type=$event" />

    <div class="accounts-container">
      <template v-if="loading_accounts">
        <div class="skeleton-loader account-skeleton" v-for="i in 4" :key="i"></div>
      </template>

      <template v-else>
        <div class="add-account-button" @click="toggleNewDollarModal">
          <span class="icon icon-plus h5 green-600"></span>
          <div class="green-600 secondary-2-text">Add new account details</div>
        </div>

        <UserAccountCard
          v-for="(account,index) in getAccounts"
          :key="index"
          :account="account"
          @click="showAccountDetails"
        />
      </template>
    </div>

    <transition name="fade" v-if="show_new_naira_modal">
      <AddNairaAccountModal
        @closeTriggered="toggleNewNairaModal"
        @saved="showSuccessModal('show_new_naira_modal',$event)"
      />
    </transition>

    <transition name="fade" v-if="show_new_dollar_modal">
      <AddDollarAccountModal @closeTriggered="toggleNewDollarModal" />
    </transition>

    <transition name="fade" v-if="show_naira_details_modal">
      <NairaAccountDetailsModal
        @closeTriggered="toggleNairaDetailsModal"
        :account="selected_account"
      />
    </transition>

    <transition name="fade" v-if="show_success_modal">
      <SuccessModal @closeTriggered="toggleSuccessModal" :message="response_message" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TabSwitcher from "@/shared/components/tab-switcher";
import AddNairaAccountModal from "@/modules/settings/modals/add-naira-account-modal";
import AddDollarAccountModal from "@/modules/settings/modals/add-dollar-account-modal";
import UserAccountCard from "@/shared/components/card-comps/user-account-card";
import NairaAccountDetailsModal from "@/modules/settings/modals/naira-account-details-modal";
import SuccessModal from "@/shared/modals/success-modal";
export default {
  name: "AccountSettings",

  components: {
    TabSwitcher,
    AddNairaAccountModal,
    AddDollarAccountModal,
    UserAccountCard,
    NairaAccountDetailsModal,
    SuccessModal,
  },

  async mounted() {
    if (!this.getAccounts?.length) {
      this.loading_accounts = true;
      await this.fetchAllBanks(this.getAccountId);
      this.loading_accounts = false;
    }
  },

  computed: {
    ...mapGetters({ getAccounts: "settings/getAccounts" }),
  },

  data() {
    return {
      tab_options: [
        {
          name: "Dollar type",
          value: "dollar",
          active: false,
        },
        {
          name: "Naira type",
          value: "naira",
          active: true,
        },
      ],

      account_type: "naira",
      selected_account: null,

      show_success_modal: false,
      show_new_naira_modal: false,
      show_new_dollar_modal: false,
      show_naira_details_modal: false,
      loading_accounts: false,

      response_message: "",
    };
  },

  methods: {
    ...mapActions({ fetchAllBanks: "settings/fetchAllBanks" }),

    toggleNewNairaModal() {
      this.show_new_naira_modal = !this.show_new_naira_modal;
    },

    toggleNewDollarModal() {
      this.show_new_dollar_modal = !this.show_new_dollar_modal;
    },

    toggleNairaDetailsModal() {
      this.show_naira_details_modal = !this.show_naira_details_modal;
    },

    toggleSuccessModal() {
      this.show_success_modal = !this.show_success_modal;
    },

    showAccountDetails(account) {
      this.selected_account = account;
      this.toggleNairaDetailsModal();
    },

    showSuccessModal(modal, message) {
      this[modal] = false;
      this.response_message = message;
      this.show_success_modal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin card-size {
  width: toRem(352);

  @include breakpoint-custom-down(800) {
    width: toRem(342);
  }
  @include breakpoint-custom-down(790) {
    width: toRem(332);
  }
  @include breakpoint-custom-down(771) {
    width: 100%;
  }
}

.page-meta {
  padding-bottom: toRem(24);
  border-bottom: toRem(0.5) solid getColor("grey-200");
  margin-bottom: toRem(32);
}

.accounts-container {
  position: absolute;
  width: calc(100% - 70px);
  @include flex-row-start-wrap;
  gap: toRem(32);
  align-items: flex-end;
  margin-top: toRem(32);
  padding-bottom: toRem(150);

  @include breakpoint-down(lg) {
    width: calc(100% - 50px);
  }

  @include breakpoint-down(sm) {
    width: calc(100% - 30px);
  }

  .add-account-button {
    @include flex-column-center;
    @include card-size;
    padding: toRem(14);
    border: toRem(1) solid getColor("grey-100");
    border-radius: toRem(12);
    transition: background ease-in-out 0.3s;
    cursor: pointer;

    &:hover {
      background: getColor("grey-10");
    }
  }

  .account-skeleton {
    border-radius: toRem(12);
    @include card-size;
    height: toRem(65);
  }
}
</style>