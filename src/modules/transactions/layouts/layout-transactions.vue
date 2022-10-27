<template>
  <div class="layout-disbursement">
    <!-- BACK BUTTON -->
    <PageBackBtn history_mode />

    <!-- FUND DISBURSMENT FLOW -->
    <ProgressFlowCard :flows="getComputedPageFlow" />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { getStorage, setStorage, removeStorage } from "@/utilities/auth-utils";
import PageBackBtn from "@/shared/components/page-back-btn";
import ProgressFlowCard from "@/shared/components/card-comps/progress-flow-card";

export default {
  name: "LayoutTransaction",

  components: {
    PageBackBtn,
    ProgressFlowCard,
  },

  computed: {
    ...mapState({ transaction: "transactions/transaction" }),
    ...mapGetters({
      getTransactionBeneficiaries: "transactions/getTransactionBeneficiaries",
    }),

    getComputedPageFlow() {
      return this.computed_page_flow;
    },
  },

  watch: {
    getTransactionBeneficiaries: {
      handler(value) {
        // CHECK IF BENEFICIARIES HAS LENGTH
        if (value.length) {
          if (value[0].role.name === "Seller") {
            let cloned_page_flow = [...this.page_flows];
            cloned_page_flow.pop();
            this.computed_page_flow = cloned_page_flow;
          }

          // HANDLE NON SELLER ROLE
          else this.computed_page_flow = this.page_flows;
        } else this.computed_page_flow = this.page_flows;
      },
      immediate: true,
      deep: true,
    },
  },

  data: () => ({
    computed_page_flow: [],

    page_flows: [
      {
        id: 1,
        title: "Transaction details",
        route: "TransactionSetup",
        alias_route: "",
        state: "current",
      },
      {
        id: 2,
        title: "Invite Parties",
        route: "TransactionParties",
        alias_route: "",
        state: "next",
      },
      {
        id: 3,
        title: "Payout Details",
        route: "TransactionPayoutRules",
        alias_route: "TransactionConfirmPayout",
        state: "next",
      },
      {
        id: 4,
        title: "Make payment",
        route: "TransactionPayment",
        alias_route: "",
        state: "next",
      },
    ],
  }),

  // created() {
  //   this.getSnapshots();
  // },

  // beforeMount() {
  //   window.addEventListener("beforeunload", this.takeSnapshots);
  //   this.$once("hook:beforeDestroy", () => {
  //     window.removeEventListener("beforeunload", this.takeSnapshots);
  //   });
  // },

  methods: {
    ...mapMutations({
      UPDATE_CACHED_TRANSACTION: "transactions/UPDATE_CACHED_TRANSACTION",
    }),

    takeSnapshots() {
      setStorage("transaction", transaction, "object");
    },

    getSnapshots() {
      let cached_transaction = getStorage("transaction", "object");

      // UPDATE CACHED DATA BACK TO STORE
      this.UPDATE_CACHED_TRANSACTION(cached_transaction);

      // REMOVED CACHED TRANSACTION DATA FROM LOCAL STORAGE
      removeStorage("transaction");
    },
  },
};
</script>

<style lang="scss">
</style>