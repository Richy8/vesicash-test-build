<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-lg' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Pay by wire transfer</div>

        <div class="modal-cover-meta mgr-40">
          Please pay the amount below and fill in the payment details for us to
          confirm your payment
        </div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TOTAL DISPLAY CARDS -->
        <div class="mgb-24">
          <SumTotalDisplayCard
            total_text="Amount to pay"
            total_value="$40,000"
            use_custom_style
          />
        </div>

        <div class="row">
          <!-- CURRENCY -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="emailAddress">Currency</div>
              <DropSelectInput
                placeholder="Select currency"
                :options="currency_options"
              />
            </div>
          </div>

          <!-- AMOUNT TO PAY -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="amount">Amount to pay</div>

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
        </div>

        <div class="row">
          <!-- ACCOUNT NAME -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="accountName">Account name</div>
              <input
                type="text"
                id="accountName"
                class="form-control"
                placeholder="Enter account name"
              />
            </div>
          </div>

          <!-- BANK NAME -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="bankName">Bank name</div>
              <input
                type="text"
                id="bankName"
                class="form-control"
                placeholder="Enter bank name"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <!-- BRANCH NAME -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="branchName">Branch name</div>
              <input
                type="text"
                id="branchName"
                class="form-control"
                placeholder="Enter branch name"
              />
            </div>
          </div>

          <!-- BANK NAME -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="branchAddress">Branch address</div>
              <input
                type="text"
                id="branchAddress"
                class="form-control"
                placeholder="Enter branch address"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <!-- SORT CODE -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="sortCode">Sort code</div>
              <input
                type="text"
                id="sortCode"
                class="form-control"
                placeholder="Enter sort code"
              />
            </div>
          </div>
        </div>

        <!-- TITLE TEXT -->
        <div class="title-text grey-900 primary-1-text mgb-16">
          Additonal details for foreign account (optional)
        </div>

        <div class="row">
          <!-- CORRESPONDING BANK -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="correspondingBank">
                Corresponding bank
              </div>
              <input
                type="text"
                id="correspondingBank"
                class="form-control"
                placeholder="Enter corresponding bank"
              />
            </div>
          </div>

          <!-- SWIFT CODE -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="swiftCode">Swift code</div>
              <input
                type="text"
                id="swiftCode"
                class="form-control"
                placeholder="Enter swift code"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <!-- ABA DETAILS -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="abaDetails">ABA Details</div>
              <input
                type="text"
                id="abaDetails"
                class="form-control"
                placeholder="Enter ABA details"
              />
            </div>
          </div>

          <!-- ACCOUNT NUMBER -->
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <div class="form-label" for="accountNo">Account number</div>
              <input
                type="text"
                id="accountNo"
                class="form-control"
                placeholder="Enter account no."
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group">
            <label for="paymentMade" class="checkbox-wrapper pointer">
              <input type="checkbox" name="" id="paymentMade" />
              <div class="text grey-900 tertiary-2-text mgl-10">
                I have made this payment
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100">Make Payment</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "WireTransferModal",

  components: {
    ModalCover,
    DropSelectInput,
    SumTotalDisplayCard: () =>
      import(
        /* webpackChunkName: "shared-module" */ "@/shared/components/card-comps/sum-total-display-card"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
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
  }),

  methods: {},
};
</script>


<style lang="scss" scoped>
.modal-cover-body {
  max-height: 60vh;
  overflow-y: auto;

  .checkbox-wrapper {
    @include flex-row-start-nowrap;
    width: max-content;
  }
}
</style>