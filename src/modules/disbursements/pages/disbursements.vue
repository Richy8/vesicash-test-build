<template>
  <div class="disbursement-page">
    <!-- PAGE TITILE -->
    <div class="page-title grey-900 h4-text mgb-25">Disbursements</div>

    <!-- DISBURSEMENT TABLE DATA -->
    <div class="disbursement-table-wrapper">
      <DisbursementTable />
    </div>
  </div>
</template>

<script>
export default {
  name: "Disbursements",

  components: {
    DisbursementTable: () =>
      import(
        /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/components/table-comps/disbursement-table"
      ),
  },
};
</script>

<style lang="scss" scoped>
</style>