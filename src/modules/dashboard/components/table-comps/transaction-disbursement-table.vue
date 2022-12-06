<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="transaction-disbursement-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      :show_paging="showPagination"
      @goToPage="getUserDisbursementTransactions($event)"
      :pagination="pagination"
    >
      <template v-for="(data, index) in table_data">
        <TransactionDisbursementTableRow
          :key="index"
          table_name="transaction-disbursement-tb"
          :data="data"
        />
      </template>

      <template slot="emptyIconSlot">
        <EmptyDisbursementIcon />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";
import EmptyDisbursementIcon from "@/shared/components/icon-comps/empty-disbursement-icon";

export default {
  name: "TransactionDisbursementTable",

  components: {
    TableContainer,
    EmptyDisbursementIcon,
    TransactionDisbursementTableRow: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/transaction-disbursement-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    this.getUserDisbursementTransactions(1);
  },

  computed: {
    showPagination() {
      return this.$route?.name === "PaymentsPage" ? true : false;
    },

    dummyData() {
      return [
        // {
        //   created_at: "2022-10-30 09:15:28",
        //   name: "Payment for landing page",
        //   email: "abobi@qa.team",
        //   role: "Seller",
        //   amount: "1065",
        //   currency: "USD",
        //   status: "completed",
        //   shit: "biscuit",
        // },
        // {
        //   created_at: "2022-10-27 19:45:28",
        //   name: "Payment for Car",
        //   email: "emekachukwu@gmail.com",
        //   role: "Buyer",
        //   amount: "695",
        //   currency: "NGN",
        //   status: "completed",
        //   shit: "yoghurt",
        // },
      ];
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Disbursment name",
        "Paid by/to",
        "User role",
        "Amount paid",
        "Status",
        "Actions",
      ],

      table_data: [],
      table_loading: true,
      pagination: {
        current_page: 1,
        per_page: 10,
        last_page: 3,
        from: 1,
        to: 20,
        total: 50,
      },
      paginatedData: {},
      paginationPages: {},
      empty_message:
        "You have not done any disbursement transaction. Click the 'Create Escrow' button to get started",
    };
  },

  methods: {
    ...mapActions({
      fetchWalletTransactions: "dashboard/fetchWalletWithdrawals",
    }),

    getUserDisbursementTransactions(page) {
      // USE PREVIOUSLY SAVED DATA FOR THAT PAGE NUMBER (AVOID UNNECESSARY API CALLS)
      if (this.paginatedData[page] && this.paginationPages[page]) {
        this.table_data = this.paginatedData[page];
        this.pagination = this.paginationPages[page];
        this.table_loading = false;
        return;
      }

      const payload = {
        page,
        account_id: this.getAccountId,
      };

      this.table_loading = true;

      this.fetchWalletTransactions(payload)
        .then((response) => {
          if (response.code === 200) {
            // SHOW ALL DATA ROWS OR THREE ROWS BASED ON ROUTE
            this.table_data =
              this.$route?.name === "PaymentsPage"
                ? this.dummyData
                : this.dummyData.slice(0, 3);
            this.table_loading = false;

            //SET PAGINATION DATA
            this.pagination = {
              current_page: 1 || response?.data?.current_page,
              per_page: 30 || response?.data?.per_page,
              last_page: 1 || response?.data?.last_page,
              from: 1 || response?.data?.from,
              to: 20 || response?.data?.to,
              total: 5 || response?.data?.total,
            };

            this.paginationPages[page] = this.pagination;

            this.paginatedData[page] =
              this.$route?.name === "PaymentsPage"
                ? response?.data?.data
                : response?.data?.data?.slice(0, 3);
          }

          // HANDLE NON 200 RESPONSE
          else this.handleErrorResponse();
        })
        .catch(() => this.handleErrorResponse());
    },

    // ==========================
    // HANDLE ERROR RESPONSE
    // ==========================
    handleErrorResponse() {
      this.table_loading = false;
      this.table_data = [];
    },
  },
};
</script>

<style lang="scss">
.transaction-disbursement-tb {
  &-1 {
    max-width: toRem(210);
  }

  &-2 {
    max-width: toRem(200);
  }

  &-3 {
    max-width: toRem(180);
  }

  &-4 {
    max-width: toRem(140);
  }

  &-5 {
    max-width: toRem(140);
  }

  // &-6 {
  // }

  // &-7 {
  // }

  .head-data {
    padding: toRem(8) toRem(24) !important;
  }

  .body-data {
    padding: toRem(16) toRem(24) !important;
  }
}
</style>