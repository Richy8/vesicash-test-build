<template>
  <div class="page-layout">
    <PageBackBtn back_link="/exchange" />

    <div class="h4-text mgb-24">Exchange currency</div>

    <div class="position-relative">
      <div class="input-wrapper">
        <div class="form-group">
          <BasicInput
            label_title="Initial currency"
            label_id="initial-currency"
            :input_value="initialAmount"
            input_type="number"
            is_required
            placeholder="0.00"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            :currency_type="initial_currency"
            is_currency_type
            :currency_options="currency_options"
            @currencyUpdated="initial_currency=$event"
            class="form-prefix-right"
            @getInputState="updateFormState($event, 'initial_currency')"
            :validity="!validity.initial_currency"
            :error_handler="{
              type: 'required',
              message: 'Enter an amount',
            }"
          />
        </div>
      </div>

      <div class="swap-wrapper mgt--12 index-9 position-relative">
        <SwapIcon />
      </div>

      <div class="input-wrapper mgt--12">
        <div class="form-group">
          <BasicInput
            label_title="Final currency"
            label_id="final-currency"
            :input_value="finalAmount"
            input_type="number"
            is_required
            placeholder="0.00"
            :custom_style="{ input_wrapper_style: 'form-prefix' }"
            is_currency_type
            :currency_type="final_currency"
            :currency_options="currency_options"
            @currencyUpdated="final_currency=$event"
            class="form-prefix-right"
            @getInputState="updateFormState($event, 'final_currency')"
            :validity="!validity.final_currency"
            :error_handler="{
        type: 'required',
        message: 'Enter an amount',
        }"
          />
        </div>
      </div>
    </div>

    <SumTotalDisplayCard
      class="exchange-rate-block"
      :total_text="`Exchange rate (${initialCurrencyMeta.code}/${finalCurrencyMeta.code})`"
      :total_value="exchangeRate"
    />

    <button
      class="btn btn-primary btn-md wt-100"
      :disabled="isDisabled"
      @click="toggleSummaryModal"
    >Continue</button>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_success_modal">
        <SuccessModal
          @closeTriggered="toggleSuccessModal"
          :message="successMessage"
          main_cta_title="Back to dashboard"
          :actions="successActions"
          class="exchange-success-modal-overlay"
        />
      </transition>

      <transition name="fade" v-if="show_summary_modal">
        <ExchangeTransactionSummary
          :summary="transactionSummary"
          @closeTriggered="toggleSummaryModal"
          @swapped="toggleSuccessModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import BasicInput from "@/shared/components/form-comps/basic-input";
import PageBackBtn from "@/shared/components/page-back-btn";
import SwapIcon from "@/shared/components/icon-comps/swap-icon";
import SumTotalDisplayCard from "@/shared/components/card-comps/sum-total-display-card";

export default {
  name: "ExchangeSetup",

  components: {
    PageBackBtn,
    BasicInput,
    SumTotalDisplayCard,
    SwapIcon,

    ExchangeTransactionSummary: () =>
      import(
        /* webpackChunkName: "exchange-module" */ "@/modules/exchange/modals/exchange-transaction-summary"
      ),

    SuccessModal: () =>
      import(
        /* webpackChunkName: "exchange-module" */ "@/shared/modals/success-modal"
      ),
  },

  computed: {
    isDisabled() {
      return Object.values(this.validity).some((valid) => valid);
    },

    initialCurrencyMeta() {
      const code = this.initial_currency.code;
      let amount = Number(this.form.initial_currency);
      amount = amount - Math.floor(amount) !== 0 ? amount.toFixed(2) : amount;
      return {
        currency: this.$money.getSign(code),
        code: this.$money.getCode(code),
        amount,
      };
    },

    finalCurrencyMeta() {
      const code = this.final_currency.code;
      let amount = Number(this.form.final_currency);
      amount = amount - Math.floor(amount) !== 0 ? amount.toFixed(2) : amount;

      return {
        currency: this.$money.getSign(code) || code.toUpperCase(),
        code: this.$money.getCode(code) || code.toUpperCase(),
        amount,
      };
    },

    initialAmount() {
      if (!this.form.initial_currency) return "";
      return this.initialCurrencyMeta.amount + "";
    },

    finalAmount() {
      if (!this.form.final_currency) return "";
      return this.finalCurrencyMeta.amount + "";
    },

    exchangeRate() {
      return `${this.finalCurrencyMeta.currency}1/${this.initialCurrencyMeta.currency}${this.exchange_rate}`;
    },

    successMessage() {
      const initial_currency = this.initialCurrencyMeta.currency;
      const initial_amount = this.$money.addComma(
        this.initialCurrencyMeta.amount
      );
      const final_currency = this.finalCurrencyMeta.currency;
      const final_amount = this.$money.addComma(this.finalCurrencyMeta.amount);

      return `Your currency swap of ${initial_currency}${initial_amount} to ${final_currency}${final_amount} is successful.`;
    },

    transactionSummary() {
      const initial_amount = this.$money.addComma(
        this.initialCurrencyMeta.amount
      );
      const final_amount = this.$money.addComma(this.finalCurrencyMeta.amount);

      return {
        name: `${this.initialCurrencyMeta.code}-${this.finalCurrencyMeta.code}`,
        initial_currency: `${this.initialCurrencyMeta.currency}${initial_amount}`,
        final_currency: `${this.finalCurrencyMeta.currency}${final_amount}`,
        rate: this.exchangeRate,
        initial_amount: this.initialCurrencyMeta.amount,
        final_amount: this.finalCurrencyMeta.amount,
      };
    },

    successActions() {
      return [
        {
          title: "Withdraw money ",
          action: () => {
            // this.show_success_modal = false;
            // TRIGGER MONEY WITHDRAWAL FROM THE DASHBOARD PAGE
            this.$router.push({
              name: "VesicashDashboard",
              query: { withdraw_money: true },
            });
          },
        },

        {
          title: "Fund your wallet",
          action: () => {
            // TRIGGER FUNDING FROM THE DASHBOARD PAGE

            this.$router.push({
              name: "VesicashDashboard",
              query: { fund_wallet: true },
            });
          },
        },
      ];
    },
  },

  watch: {
    "form.initial_currency": {
      handler(value) {
        this.form.final_currency = value ? value / this.exchange_rate + "" : "";
        this.validity.final_currency = !value;
      },
    },

    "form.final_currency": {
      handler(value) {
        this.form.initial_currency = value
          ? value * this.exchange_rate + ""
          : "";

        this.validity.initial_currency = !value;
      },
    },
  },

  data() {
    return {
      show_summary_modal: false,
      show_success_modal: false,
      exchange_rate: 560,

      currency_options: [
        {
          country: "Nigeria",
          dialing_code: "234",
          code: "ng",
          flag: "https://dyclassroom.com/image/flags/ng.png",
        },

        {
          country: "United States",
          dialing_code: "1",
          code: "us",
          flag: "https://dyclassroom.com/image/flags/us.png",
        },

        {
          country: "United Kingdom",
          dialing_code: "44",
          code: "gb",
          flag: "https://dyclassroom.com/image/flags/gb.png",
        },
      ],

      form: {
        initial_currency: "",
        final_currency: "",
      },

      validity: {
        initial_currency: true,
        final_currency: true,
      },

      initial_currency: {
        country: "Nigeria",
        dialing_code: "234",
        code: "ng",
        flag: "https://dyclassroom.com/image/flags/ng.png",
      },

      final_currency: {
        country: "United States",
        dialing_code: "1",
        code: "us",
        flag: "https://dyclassroom.com/image/flags/us.png",
      },
    };
  },

  methods: {
    toggleSummaryModal() {
      this.show_summary_modal = !this.show_summary_modal;
    },

    toggleSuccessModal() {
      this.show_summary_modal = false;
      this.show_success_modal = !this.show_success_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-layout {
  width: toRem(544);
  max-width: 100%;
  padding-bottom: toRem(150);
}

.input-wrapper {
  border-radius: toRem(16);
  padding: toRem(24);
  background: getColor("teal-50");

  @include breakpoint-down(sm) {
    width: 100%;
    padding: toRem(20);
  }
}

.swap-wrapper {
  @include draw-shape(48);
  // @include center-placement;
  margin: auto;
  @include flex-column-center;
  background: getColor("teal-50");
  border-radius: 50%;
  border: toRem(4) solid #fff;
}
</style>

<style lang="scss">
.exchange-success-modal-overlay.modal-overlay {
  .modal-outer-container {
    top: 3rem;
  }
}

.exchange-rate-block {
  margin: toRem(24) auto toRem(40) auto;

  .tertiary-1-text,
  .primary-1-text {
    font-size: toRem(14);
    line-height: toRem(20);
    font-weight: 400;
  }
  .primary-1-text {
    font-weight: 500;
  }
}
</style>