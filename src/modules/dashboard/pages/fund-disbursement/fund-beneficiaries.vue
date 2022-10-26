<template>
  <div class="fund-beneficiaries">
    <div class="disbursement-title h4-text grey-900 mgb-32">Invite Parties</div>

    <!-- INSTRUCTION TEXT -->
    <div class="instruction-text grey-900 primary-2-text mgb-12">
      Provide their details, roles and access levels
      <!-- Provide the details [for single user]-->
    </div>

    <!-- FUND USERS TABLE -->
    <div class="wrapper mgb-24">
      <FundUsersTable type="multiple" />
    </div>

    <!-- ADD BENEFICIARY BLOCK -->
    <div class="wrapper mgb-40">
      <AddBeneficiarySingleBlock />
      <!-- <AddBeneficiaryMultiBlock /> -->
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

  methods: {
    nextProgressFlow() {
      this.$router.push({ name: "VesicashPayoutRules" });
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
