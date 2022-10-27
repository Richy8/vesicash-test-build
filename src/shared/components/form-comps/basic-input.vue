<template>
  <div :class="getGroupWrapperStyle">
    <div :class="getGroupStyle">
      <!-- INPUT LABEL -->
      <template v-if="label_title">
        <label class="form-label" :for="label_id" :class="getLabelStyle">{{
          label_title
        }}</label>
      </template>

      <!-- INPUT WRAPPER AREA -->
      <div :class="getInputWrapperStyle">
        <input
          :type="getInputType"
          :id="label_id"
          v-model.trim="form_value"
          :required="is_required"
          :disabled="is_disabled"
          class="form-control"
          :class="[getInputStyle, error_message && 'form-control-error']"
          :placeholder="placeholder"
          @input="validateAndEmitUserInput"
          @paste="validateAndEmitUserInput"
          @change="validateAndEmitUserInput"
        />

        <!-- FORM SUFFIX AREA -->
        <template v-if="input_type === 'password' && toggle_password">
          <div
            class="icon"
            @click="togglePasswordType"
            :class="
              passwordType
                ? ['icon-show', 'grey-500']
                : ['icon-hide', 'green-500']
            "
          ></div>
        </template>

        <!-- FORM PREFIX AREA -->
        <template v-if="is_phone_type">
          <div
            v-on-clickaway="determineTargetArea"
            class="prefix-select-area"
            @click="toggleDropdown"
          >
            <img v-lazy="current_country.flag" :alt="current_country.country" />
            <div
              class="icon icon-caret-fill-down smooth-transition"
              :class="show_dropdown && 'rotate-180'"
            ></div>
          </div>
        </template>

        <!-- FORM CURRENCY TYPE -->
        <div class="prefix-select-area value-area" v-if="currency">
          <div class="value grey-900 text-no-wrap" v-html="currency"></div>
        </div>
      </div>
    </div>

    <!-- DROP DOWN SELECT AREA -->
    <template v-if="is_phone_type">
      <template name="drop-select-area" v-if="show_dropdown">
        <CountryDropSelect
          :countries="countries_data"
          @countrySelected="current_country = $event"
        />
      </template>
    </template>

    <!-- MESSAGE TEXT -->
    <div class="error-message-text" v-if="error_message">
      {{ error_message }}
    </div>
  </div>
</template>

<script>
import CountryHelper from "@/shared/mixins/mixin-country-helper";

export default {
  name: "BasicInput",

  mixins: [CountryHelper],

  components: {
    CountryDropSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/country-drop-select"
      ),
  },

  props: {
    label_title: {
      type: String,
      default: "",
    },

    label_id: {
      type: String,
      default: "",
    },

    input_type: {
      type: String,
      default: "text",
    },

    input_value: {
      type: [String, Number],
      default: "",
    },

    is_required: {
      type: Boolean,
      default: false,
    },

    is_disabled: {
      type: Boolean,
      default: false,
    },

    is_phone_type: {
      type: Boolean,
      default: false,
    },

    currency: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    toggle_password: {
      type: Boolean,
      default: true,
    },

    custom_style: {
      type: Object,
      default: () => ({
        group_wrapper_style: "",
        group_style: "",
        label_style: "",
        input_style: "",
        input_wrapper_style: "",
      }),
    },

    error_handler: {
      type: Object,
      default: () => ({
        type: "",
        message: "",
      }),
    },
  },

  computed: {
    getGroupWrapperStyle() {
      return this.custom_style?.group_wrapper_style || null;
    },

    getGroupStyle() {
      return this.custom_style?.group_style || null;
    },

    getLabelStyle() {
      return this.custom_style?.label_style || null;
    },

    getInputStyle() {
      return this.custom_style?.input_style || null;
    },

    getInputWrapperStyle() {
      return this.custom_style?.input_wrapper_style || null;
    },

    getInputType() {
      if (this.input_type !== "password") return this.input_type;
      else return this.passwordType ? "password" : "text";
    },
  },

  watch: {
    input_value: {
      handler(value) {
        this.form_value = value;
      },
      immediate: true,
    },

    current_country: {
      handler(value) {
        this.$bus.$emit("update-country-state", value?.country);
      },
      immediate: true,
    },
  },

  data() {
    return {
      passwordType: true,
      error_message: "",
      form_value: "",
    };
  },

  created() {
    // LOAD MY CURRENT COUNTRY
    this.is_phone_type && this.loadCurrentUserLocation();
  },

  methods: {
    // TOGGLE PASSWORD TYPE
    togglePasswordType() {
      this.passwordType = !this.passwordType;
    },

    validateInputType(
      value = this.form_value,
      type = this.error_handler?.type,
      message = this.error_handler?.message
    ) {
      switch (type) {
        case "single":
          this.error_message =
            !this.$validate.validateSingleName(value) && message;
          break;

        case "email":
          this.error_message =
            !this.$validate.validateEmailInput(value) && message;
          break;

        case "phone":
          this.error_message =
            !this.$validate.validatePhoneInput(value) && message;
          break;

        case "password":
          this.error_message =
            !this.$validate.validatePasswordInput(value) && message;
          break;

        case "required":
          this.error_message = !value.length && message;
          break;

        default:
          this.error_message = "";
          break;
      }
    },

    // =================================
    // VALIDATE USER ENTRY INPUT DATA
    // =================================
    validateAndEmitUserInput() {
      // CHECK INPUT VALIDITY
      this.validateInputType();

      // EMIT CLIENT ENTERED VALUE
      this.$emit("getInputState", {
        validity: this.error_message ? true : false,
        value: this.form_value,
      });
    },
  },
};
</script>

<style>
</style>