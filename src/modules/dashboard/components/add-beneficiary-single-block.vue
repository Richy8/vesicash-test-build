<template>
  <div class="add-beneficiary-block rounded-16 grey-50-bg border-grey-100">
    <div class="input-rows">
      <!-- USER EMAIL ADDRESS -->
      <input
        type="text"
        class="form-control input-field input-field-email"
        placeholder="Enter user email address"
      />

      <!-- USER PHONE NUMBER -->
      <div class="form-prefix input-field input-field-phone">
        <input
          type="number"
          id="phoneNumber"
          class="form-control"
          placeholder="Enter phone number"
        />

        <!-- PREFIX AREA -->
        <div
          class="prefix-select-area"
          @click="toggleDropdown"
          v-on-clickaway="forceClose"
        >
          <img v-lazy="loadFalseImage('flag.png')" alt="" />
          <div class="icon icon-caret-fill-down"></div>
        </div>

        <!-- DROP DOWN SELECT AREA -->
        <template name="drop-select-area" v-if="show_dropdown">
          <DropDownSelect />
        </template>
      </div>

      <button class="btn btn-primary btn-md">Add User</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddBeneficiarySingleBlock",

  components: {
    DropDownSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-down-select"
      ),
  },

  data: () => ({
    show_dropdown: false,
  }),

  methods: {
    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    forceClose() {
      this.show_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-beneficiary-block {
  width: max-content;
  padding: toRem(16);

  @include breakpoint-custom-down(820) {
    width: 100%;
  }

  .input-rows {
    @include flex-row-start-wrap;

    .input-field {
      margin-right: toRem(18);
      width: toRem(300);

      @include breakpoint-custom-down(820) {
        margin-bottom: toRem(20);
        width: 48%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(24);
        width: 100%;
      }

      &-email {
        @include breakpoint-down(sm) {
          margin-right: 0;
        }
      }

      &-phone {
        @include breakpoint-custom-down(820) {
          margin-right: 0;
        }
      }
    }

    .btn {
      padding: toRem(8.5) toRem(24);
    }
  }
}
</style>