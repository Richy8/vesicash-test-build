<template>
  <div>
    <!-- TABLE CONTAINER -->
    <TableContainer
      table_name="exchange-tb"
      :table_data="getPaginatedTable"
      :table_header="table_header"
      :is_loading="table_loading"
      :empty_message="empty_message"
      :show_paging="showPagination"
      :pagination="getPagination"
    >
      <template v-for="(data, index) in getPaginatedTable">
        <ExchangeTableRow :key="index" table_name="exchange-tb" :data="data" />
      </template>

      <template slot="emptyIconSlot">
        <EmptyExchangeIcon />
      </template>
    </TableContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableContainer from "@/shared/components/table-comps/table-container";
import EmptyExchangeIcon from "@/shared/components/icon-comps/empty-exchange-icon";

export default {
  name: "ExchangeTable",

  components: {
    TableContainer,
    EmptyExchangeIcon,
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
    ...mapGetters({
      getFxTable: "fx/getFxTable",
    }),

    showPagination() {
      return true;
    },

    getPaginatedTable() {
      const { per_page } = this;
      const index = this.page - 1;
      const start_range = per_page * index;
      const end_range = start_range + per_page;
      const tables = [...this.getFxTable];
      return tables.slice(start_range, end_range);
    },

    getPagination() {
      const tables = [...this.getFxTable];
      const { per_page } = this;
      const current_page = this.page;

      const index = this.page - 1;
      const from = per_page * index;
      const to = Math.min(from + per_page, tables.length);

      return {
        current_page,
        per_page,
        last_page: Math.ceil(tables.length / per_page),
        from: from + 1,
        to,
        total: tables.length,
      };
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

      page: 1,
      per_page: 15,

      table_data: [],
      table_loading: false,
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
    if (!this.getFxTable.length) this.getFxTransactions();
  },

  methods: {
    ...mapActions({
      fetchAllFxTransactions: "fx/fetchAllFxTransactions",
    }),

    getFxTransactions() {
      const payload = {
        account_id: this.getAccountId,
      };

      this.table_loading = true;

      this.fetchAllFxTransactions(payload)
        .then((response) => {
          if (response.code === 200) {
            this.table_data = response.data;
            this.table_loading = false;
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