<template>
  <div class="pagination-row mgt-30">
    <div class="left">
      <!-- PAGINATION TEXT -->
      <div
        class="pagination-text text-left tertiary-2-text grey-600"
      >Showing {{pagination.from}} to {{pagination.to}} of {{pagination.total}} entries.</div>
    </div>

    <div class="right mgb-5">
      <div class="nav" :class="[isPrevDisabled && 'disabled']">
        <div class="icon icon-caret-left"></div>
        <div class="nav-text mgl-3 pdr-4" @click="isPrevDisabled ? null : updatePage(-1)">Prev</div>
      </div>

      <!--PAGING -->
      <div class="paging">
        <input
          type="number"
          class="form-control page-input text-center mgr-7"
          onkeypress="return event.charCode >= 48"
          min="1"
          :max="pagination.last_page"
          v-model.number="page"
        />
        <div class="page-slash">/</div>
        <div class="page-total mgl-5 mgr-4">{{pagination.last_page}}</div>
        <button
          class="btn btn-primary btn-sm mgl-4 page-btn"
          :disabled="is_go_disabled"
          @click="navigatePage(page)"
        >Go</button>
      </div>

      <div class="nav" :class="[isNextDisabled && 'disabled']">
        <div class="nav-text mgr-3 pdl-5" @click="isNextDisabled ? null : updatePage(1)">Next</div>
        <div class="icon icon-caret-right"></div>
      </div>

      <!-- ERROR TEXT -->
      <div
        class="error-text smooth-transition primary-3-text red-500"
        v-if="show_error"
      >Provided page exceeds page size!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",

  props: {
    pagination: {
      type: Object,
      default: () => ({
        current_page: 1,
        per_page: 10,
        last_page: 3,
        from: 1,
        to: 20,
        total: 50,
      }),
    },
  },

  computed: {
    isNextDisabled() {
      return this.page && this.page < this.pagination.last_page ? false : true;
    },

    isPrevDisabled() {
      return this.page && this.page !== 1 ? false : true;
    },
  },

  data: () => ({
    page: null,
    show_dropdown: false,
    show_error: false,
    is_go_disabled: false,
  }),

  watch: {
    page: {
      handler(value) {
        this.show_error =
          value > this.pagination.last_page || value < 1 ? true : false;

        this.is_go_disabled = this.show_error;

        setTimeout(() => (this.show_error = false), 3000);
      },
    },

    pagination: {
      handler(value) {
        this.page = value?.current_page ?? 1;
      },
      immediate: true,
    },
  },

  methods: {
    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    closeDropdown() {
      this.show_dropdown = false;
    },

    navigatePage(page) {
      this.$emit("goToPage", page);
    },

    updatePage(increment) {
      this.page += increment;
      this.$emit("goToPage", this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-row {
  padding: toRem(10) toRem(30) toRem(35);
  @include flex-row-between-wrap;

  @include breakpoint-down(sm) {
    @include flex-column-center;
    padding: 0 toRem(15) toRem(30);
  }

  .left {
    padding-right: toRem(30);

    @include breakpoint-down(sm) {
      padding-right: 0;
    }

    .pagination-text {
      font-size: toRem(13.25);

      @include breakpoint-down(sm) {
        // @include font-height(12.75, 22);
      }
    }
  }

  .right {
    position: relative;
    @include flex-row-end-nowrap;

    @include breakpoint-custom-down(827) {
      margin-top: toRem(15);
      margin-bottom: toRem(15) !important;
    }

    @include breakpoint-custom-down(578) {
      margin-top: 0;
    }

    @include breakpoint-custom-down(565) {
      margin-top: toRem(15);
      margin-bottom: toRem(20) !important;
    }

    .nav {
      padding: toRem(6);
      min-width: toRem(24);
      border-radius: toRem(5);
      cursor: pointer;
      color: getColor("grey-500");
      @include transition(0.4s);

      @include breakpoint-down(sm) {
        padding: toRem(6);
        min-width: toRem(22);
      }

      .icon {
        font-size: toRem(21);
        position: relative;
        font-weight: 500;
        top: toRem(1);

        @include breakpoint-down(sm) {
          font-size: toRem(17.75);
        }
      }

      .nav-text {
        @include font-height(13.75, 24);
        position: relative;
        top: toRem(-0.5);
      }

      &:first-of-type {
        margin-right: toRem(5);
      }

      &:last-of-type {
        margin-left: toRem(5);
      }

      &.disabled {
        cursor: not-allowed;
        color: getColor("grey-400");
      }

      &:hover {
        background: rgba(getColor("green-100"), 0.6);

        &.disabled {
          background: unset;
        }
      }
    }

    .paging {
      @include flex-row-center-nowrap;
      @include font-height(14, 25);
      color: getColor("grey-800");

      .page-input {
        @include draw-shape(42, 21);
        padding: toRem(15) toRem(8);
      }

      .page-btn {
        @include font-height(12.75, 15);
        padding: toRem(8.5) toRem(12);
      }
    }

    .error-text {
      position: absolute;
      left: toRem(12);
      top: toRem(44);
    }
  }
}
</style>
