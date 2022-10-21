<template>
  <div class="payout-card rounded-16 border-grey-100">
    <!-- CARD TITLE -->
    <div class="card-title primary-2-text grey-900 mgb-24">Milestone 1</div>

    <!-- PAYOUT INPUTS -->
    <div class="payout-inputs">
      <div class="row">
        <!-- PAYMENT CURRENCY -->
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <div class="form-label" for="transactionName">
              Select payment currency
            </div>
            <DropSelectInput
              placeholder="Select currency"
              :options="currency_options"
            />
          </div>
        </div>

        <!-- TRANSACTION NAME -->
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <div class="form-label" for="milestoneName">Milestone name</div>
            <input
              type="text"
              id="milestoneName"
              class="form-control"
              placeholder="What milestone is this?"
            />
          </div>
        </div>

        <!-- RECIPIENTS DATA -->
        <template>
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="userEmail1">Recipient's email</div>
              <input
                type="email"
                id="userEmail1"
                class="form-control"
                placeholder="Enter recipient email"
              />
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="amount">Amount</div>

              <div class="form-prefix form-prefix-right">
                <input
                  type="number"
                  id="amount"
                  class="form-control"
                  placeholder="0.00"
                />

                <!-- PREFIX AREA -->
                <div class="prefix-select-area value-area">
                  <div class="value grey-900 text-no-wrap">USD ($)</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- PAYMENT DUE DATE -->
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <div class="form-label" for="dueDate">Due date</div>
            <input
              type="date"
              id="dueDate"
              class="form-control"
              placeholder="Select date"
            />
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="form-group">
            <div class="form-label" for="inspectionPeriod">
              Inspection period (Days)
            </div>
            <DropSelectInput
              placeholder="Select inspection period"
              :options="inspection_options"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "PayoutCard",

  components: {
    DropSelectInput,
  },

  data: () => ({
    currency_options: [
      {
        id: 1,
        name: "USD ($)",
      },
      {
        id: 2,
        name: "NGN (N)",
      },
    ],

    inspection_options: [
      {
        id: 1,
        name: "1 day",
      },
      {
        id: 2,
        name: "2 days",
      },
      {
        id: 3,
        name: "3 days",
      },
      {
        id: 4,
        name: "4 days",
      },
      {
        id: 5,
        name: "5 days",
      },
      {
        id: 6,
        name: "6 days",
      },
      {
        id: 7,
        name: "7 days",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.payout-card {
  margin-bottom: toRem(15);
  padding: toRem(24);
  padding-bottom: toRem(5);

  @include breakpoint-down(sm) {
    padding: toRem(16);
  }

  &:last-of-type {
    margin-bottom: toRem(32);
  }

  .payout-inputs {
    .row {
      @include flex-row-between-wrap;
    }
  }
}
</style>
