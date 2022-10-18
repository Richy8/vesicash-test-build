<template>
  <div>
    <!-- TABLE LOADING STATE -->
    <TableSkeleton v-if="is_loading" />

    <template v-else>
      <template v-if="table_data.length">
        <div class="table-wrapper" :class="table_name">
          <table class="table">
            <!-- TABLE HEADER -->
            <thead>
              <tr>
                <template v-for="(head, index) in table_header">
                  <td
                    :title="head"
                    class="head-data"
                    :key="index"
                    :class="`${table_name}-${index + 1}`"
                    v-html="head"
                  ></td>
                </template>
              </tr>
            </thead>

            <!-- TABLE BODY -->
            <tbody>
              <slot></slot>
            </tbody>
          </table>

          <!-- PAGINATION -->
          <Pagination v-if="show_paging" />
        </div>
      </template>

      <!-- TABLE EMPTY STATE -->
      <TableEmptyState :empty_message="empty_message" v-else />
    </template>
  </div>
</template>

<script>
import TableEmptyState from "@/shared/components/table-comps/table-empty-state";

export default {
  name: "TableContainer",

  components: {
    TableEmptyState,
    TableSkeleton: () =>
      import(
        /* webpackChunkname:"shared-table-module" */ "@/shared/components/table-comps/table-skeleton"
      ),
    Pagination: () =>
      import(
        /* webpackChunkname:"shared-table-module" */ "@/shared/components/pagination"
      ),
  },

  props: {
    table_name: {
      type: String,
      default: "",
    },

    table_header: {
      type: Array,
      default: [],
    },

    table_data: {
      type: Array,
      default: [],
    },

    is_loading: {
      type: Boolean,
      default: true,
    },

    empty_message: {
      type: String,
      default: "",
    },

    show_paging: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
