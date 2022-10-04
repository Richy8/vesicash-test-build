<template>
  <div class="drop-select-input w-100 h-auto">
    <!-- SELECT INPUT  -->
    <div
      class="select-input form-control"
      ref="selectInput"
      @click="toggleView"
      v-on-clickaway="determineTargetArea"
      :class="option_select ? 'active-select-input' : null"
    >
      <!-- SELECTIONS -->
      <div class="selections" v-if="selected_value">
        <div class="select-text grey-900 tertiary-2-text">
          {{ selected_value | getSelection(options) }}
        </div>
      </div>

      <!-- PLACEHOLDER TEXT -->
      <div class="placeholder-text" v-else>{{ placeholder }}</div>

      <!-- DROPDOWN BUTTON -->
      <div class="icon icon-caret-fill-down grey-500"></div>
    </div>

    <!-- BOTTOM OPTIONS -->
    <div
      class="select-option-wrapper w-100 mgt-4 smooth-animation"
      v-if="option_select"
    >
      <div class="inner-wrapper rounded-2">
        <!-- SEARCH BAR -->
        <div class="search-bar mgb-4" v-if="allow_search">
          <input
            type="text"
            class="form-control ignore"
            placeholder="Search"
            v-model="search_value"
            @input="$emit('searchItem', search_value)"
          />
          <div class="icon icon-search grey-600 index-999"></div>
        </div>

        <!-- OPTIONS -->
        <template v-if="options.length">
          <div class="option-scroll-wrapper">
            <div
              class="option-row rounded-2"
              v-for="(option, index) in options"
              :key="index"
              @click="makeSelection(index)"
            >
              {{ option.name }}
            </div>
          </div>
        </template>

        <template v-else>
          <div class="no-options text-center">No options available</div>
        </template>
      </div>

      <div class="mgt-15 py-1 mgb-10 invisible">Hidden state</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropSelectInput",

  props: {
    options: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "Option 1",
        },
        {
          id: 2,
          name: "Option 2",
        },
      ],
    },
    pre_select: {
      type: Object,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: "Select One",
    },
    allow_search: {
      type: Boolean,
      default: false,
    },
    clear_selection: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      option_select: false,
      selected_value: null,
      search_value: null,
    };
  },

  filters: {
    getSelection(value, options) {
      if (typeof value === "number")
        return options?.find((option) => option?.id === value)?.name ?? value;
      else return value;
    },
  },

  watch: {
    clear_selection: {
      handler(value) {
        if (value) this.selected_value = null;
      },
    },

    pre_select: {
      handler(value = {}) {
        if (value !== null) {
          if (Object.keys(value).length)
            this.selected_value = value?.name || value?.id;
          else this.selected_value = null;
        }
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    toggleView() {
      this.option_select = !this.option_select;
    },

    forceClose() {
      this.option_select = false;
    },

    determineTargetArea($event) {
      if (!$event.target.classList.contains("ignore")) this.forceClose();
    },

    makeSelection(index) {
      this.selected_value = this.options[index].name;
      this.$emit("selectedOption", this.options[index].id);
      this.forceClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-select-input {
  position: relative;

  .select-input {
    @include transition(0.3s);
    cursor: pointer;
    height: auto;
    max-height: auto;

    .placeholder-text {
      @include generate-font-type("tertiary-2");
      color: getColor("grey-300");
    }

    .selections {
      padding: toRem(2.625) 0;
      @include flex-row-start-wrap;

      .select-text {
        @include font-height(14, 15);
        text-align: left;
      }
    }

    .icon {
      @include center-placement("y-axis");
      font-size: toRem(24);
      margin-top: toRem(1);
      right: toRem(8);
    }
  }

  .select-option-wrapper {
    position: absolute;
    z-index: 999;

    .inner-wrapper {
      z-index: 3999;
      padding: toRem(5);
      position: relative;
      background: getColor("neutral-10");
      box-shadow: toRem(1) toRem(-1) toRem(2) rgba(168, 177, 175, 0.3),
        toRem(-1) toRem(1) toRem(2) rgba(168, 177, 175, 0.3);
    }

    .search-bar {
      padding: 0 toRem(10);
      position: relative;

      input {
        padding-left: toRem(40);
      }

      .icon {
        @include center-placement("y-axis");
        font-size: toRem(19);
        left: toRem(20);
      }
    }

    .no-options {
      @include generate-font-type("secondary-3");
      color: getColor("grey-800");
      padding: toRem(5) toRem(7);
      font-size: toRem(12.5);
    }

    .option-scroll-wrapper {
      overflow: auto;
      min-height: 7vh;
      height: auto;
      max-height: 30vh;

      &::-webkit-scrollbar {
        width: toRem(5);
      }

      &::-webkit-scrollbar-track {
        border-radius: toRem(5);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: toRem(5);
        background: getColor("green-100");
      }
    }

    .option-row {
      @include flex-row-between-nowrap;
      @include generate-font-type("secondary-3");
      font-size: toRem(13);
      color: getColor("grey-600");
      text-align: left;
      padding: toRem(8);
      margin-bottom: toRem(2);
      cursor: pointer;
      @include transition(0.5s);

      &:hover {
        background: getColor("grey-50");
      }
    }
  }

  .active-select-input {
    box-shadow: none;
    border-color: getColor("green-500");
    background: getColor("neutral-10");
  }
}
</style>