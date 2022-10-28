<template>
  <div class="fund-beneficiaries">
    <div class="disbursement-title h4-text grey-900 mgb-32">Invite Parties</div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      {{ showInstructionMessage }}
    </div>

    <!-- FUND USERS TABLE -->
    <div class="wrapper mgb-24">
      <FundUsersTable
        :type="getTransactionParty"
        :dataset="getTransactionBeneficiaries"
        :loading="loading_users"
      />
    </div>

    <!-- ADD BENEFICIARY BLOCK -->
    <div class="wrapper mgb-40">
      <AddBeneficiarySingleBlock v-if="getTransactionParty === 'single'" />
      <AddBeneficiaryMultiBlock v-else />
    </div>

    <!-- CTA ACTION ROW -->
    <div class="action-row mgt-14">
      <button class="btn btn-primary btn-md" @click="nextProgressFlow">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { countries } from "@/utilities/countries.json";
import {
  SINGLE_ROLE_OPTIONS,
  MULTIPLE_ROLE_OPTIONS,
  USER_ACCESS_OPTIONS,
  USER_PAYOUT_OPTIONS,
} from "@/modules/transactions/constants";

export default {
  name: "FundBeneficiaries",

  components: {
    FundUsersTable: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/table-comps/fund-users-table"
      ),
    AddBeneficiarySingleBlock: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/add-beneficiary-single-block"
      ),
    AddBeneficiaryMultiBlock: () =>
      import(
        /* webpackChunkName: "transactions-module" */ "@/modules/transactions/components/add-beneficiary-multi-block"
      ),
  },

  computed: {
    ...mapGetters({
      getTransactionBeneficiaries: "transactions/getTransactionBeneficiaries",
    }),

    // =============================================
    // HANDLE TABLE INSTRUCTION PAGE DESCRIPTION
    // =============================================
    showInstructionMessage() {
      return this.$route.query.party === "single"
        ? "Provide user details"
        : "Provide their details, roles and access levels";
    },

    // =============================================
    // GET THE TRANSACTION PARTY TYPE FROM ROUTE
    // =============================================
    getTransactionParty() {
      return this.$route.query.party ? this.$route.query.party : "single";
    },
  },

  data() {
    return {
      loading_users: true,
    };
  },

  mounted() {
    this.getTransactionBeneficiaries.length
      ? this.loadAllBeneficiaries()
      : this.loadCurrentUserIntoTable();
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_BENEFICIARIES:
        "transactions/UPDATE_TRANSACTION_BENEFICIARIES",
    }),

    nextProgressFlow() {
      if (this.checkValidPartyState())
        this.$router.push({
          name: "TransactionPayoutRules",
          query: {
            type: this.$route.query.type,
            party: this.$route.query.party,
            pay:
              this.getTransactionBeneficiaries[0].role?.name === "Buyer"
                ? true
                : false,
          },
        });
    },

    // ======================================================
    // CHECK IF PARTIES CONTAINS ONE BUYER AND ONE SELLER
    // ======================================================
    checkValidPartyState() {
      let buyers = [];
      let sellers = [];

      let has_recipient = this.getTransactionBeneficiaries.filter(
        (user) => user.recipient.name === "Yes"
      );

      this.getTransactionBeneficiaries.map((user) => {
        if (user.role.name === "Buyer") buyers.push(user);
      });

      this.getTransactionBeneficiaries.map((user) => {
        if (user.role.name === "Seller") sellers.push(user);
      });

      // CHECK SINGLE PARTY TRANSACTION
      if (this.getTransactionParty === "single") {
        if (!buyers.length) {
          this.pushToast("Transaction is missing a buyer party", "error");
          return false;
        } else if (!sellers.length) {
          this.pushToast("Transaction is missing a seller party", "error");
          return false;
        } else return true;
      }

      // CHECK MULTIPLE PARTY TRANSACTION
      else {
        if (this.getTransactionBeneficiaries.length < 3) {
          this.pushToast(
            "Multiple party transaction should contain at least 3 parties",
            "error"
          );
          return false;
        } else if (!buyers.length) {
          this.pushToast("Transaction is missing a buyer party", "error");
          return false;
        } else if (!sellers.length) {
          this.pushToast("Transaction is missing a seller party", "error");
          return false;
        } else if (buyers.length > 1) {
          this.pushToast(
            "Transaction should contain a single buyer party",
            "error"
          );
          return false;
        } else if (sellers.length > 1) {
          this.pushToast(
            "Transaction should contain a single seller party",
            "error"
          );
          return false;
        } else if (!has_recipient.length) {
          this.pushToast(
            "Transaction should contain at least one recipient party",
            "error"
          );
          return false;
        } else return true;
      }
    },

    // ======================================================
    // GET CURRENT USER DETAILS WITH A DEFAULT BUYER ROLE
    // ======================================================
    loadCurrentUserIntoTable() {
      let user_data = {};

      user_data.id = this.getUser.id;
      user_data.account_id = this.getAccountId;
      user_data.email_address = this.getUser.email;
      user_data.phone_number = this.getUser.phone;

      user_data.country = countries.find(
        (country) => country.code.toUpperCase() == this.getUser.country
      ).country;

      user_data.role =
        this.getTransactionParty === "single"
          ? SINGLE_ROLE_OPTIONS[0]
          : MULTIPLE_ROLE_OPTIONS[0];

      user_data.access = USER_ACCESS_OPTIONS[0];
      user_data.recipient = USER_PAYOUT_OPTIONS[0];
      user_data.amount = 0;

      this.UPDATE_TRANSACTION_BENEFICIARIES([user_data]);
      this.loading_users = false;
    },

    // ======================================================
    // LOAD ALL EXISTING BENEFICIARY IN STORE
    // ======================================================
    loadAllBeneficiaries() {
      this.UPDATE_TRANSACTION_BENEFICIARIES([
        ...this.getTransactionBeneficiaries,
      ]);

      this.loading_users = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-beneficiaries {
  .disbursement-title {
    @include breakpoint-down(xl) {
      @include generate-font-type("h5");
    }
  }

  .action-row {
    padding-bottom: toRem(55);

    .btn {
      padding: toRem(9) toRem(24);
      width: toRem(260);

      @include breakpoint-down(xs) {
        width: 100%;
      }
    }
  }
}
</style>
