<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="exchange-tb"
      :table_data="table_data"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      :show_paging="showPagination"
      :pagination="pagination"
    >
      <template v-for="(data, index) in table_data">
        <ExchangeTableRow :key="index" table_name="exchange-tb" :data="data" />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";

export default {
  name: "ExchangeTable",

  components: {
    TableContainer,
    ExchangeTableRow: () =>
      import(
        /* webpackChunkName: "exchange-module" */ "@/modules/exchange/components/table-comps/exchange-table-row"
      ),
  },

  props: {
    dataset: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    showPagination() {
      return false;
    },

    dummyData() {
      return [
        {
          created_at: "2022-08-30 07:45:28",
          name: "Badge printing payment",
          initial_currency: "N750,000",
          final_currency: "$1,740",
          rate: "$1/N460",
          status: "completed",
        },
        {
          created_at: "2022-08-30 07:45:28",
          name: "Badge printing payment",
          initial_currency: "N750,000",
          final_currency: "$1,740",
          rate: "$1/N460",
          status: "completed",
        },
      ];
    },
  },

  data() {
    return {
      table_header: [
        "Date",
        "Transaction name",
        "Initial currency",
        "Final currency",
        "Rate",
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
        "You have not done any exchange transaction. Click the 'Exchange Money' button to get started",
    };
  },

  mounted() {
    this.getUserPaymentTransactions(1);
  },

  methods: {
    ...mapActions({
      fetchWalletTransactions: "dashboard/fetchWalletWithdrawals",
    }),

    getUserPaymentTransactions(page) {
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
            this.table_data = this.dummyData;
            this.table_loading = false;

            //SET PAGINATION DATA
            // this.pagination = {
            //   current_page: 1 || response?.data?.current_page,
            //   per_page: 30 || response?.data?.per_page,
            //   last_page: 1 || response?.data?.last_page,
            //   from: 1 || response?.data?.from,
            //   to: 20 || response?.data?.to,
            //   total: 5 || response?.data?.total,
            // };

            // this.paginationPages[page] = this.pagination;

            // this.paginatedData[page] =
            //   this.$route?.name === "PaymentsPage"
            //     ? response?.data?.data
            //     : response?.data?.data?.slice(0, 3);
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
.exchange-tb {
  &-1 {
  }

  &-2 {
    max-width: toRem(205);
  }

  &-3 {
  }

  &-4 {
  }

  &-5 {
  }

  &-6 {
  }
}
</style>