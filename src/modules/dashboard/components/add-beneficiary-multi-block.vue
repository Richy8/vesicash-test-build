<template>
  <div class="add-beneficiary-block rounded-16 grey-50-bg border-grey-100">
    <div class="input-rows">
      <!-- INPUT BLOCKS -->
      <div class="input-block">
        <!-- USER EMAIL ADDRESS -->
        <input
          type="text"
          class="form-control input-field"
          placeholder="Enter user email address"
        />

        <!-- USER PHONE NUMBER -->
        <div class="form-prefix input-field">
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
      </div>

      <!-- SELECT BLOCKS -->
      <div class="select-block">
        <!-- USER ROLE SELECTION -->
        <div class="select-field">
          <DropSelectInput
            placeholder="Select user role"
            :options="user_roles_options"
          />
        </div>

        <!-- USER ACCESS SELECTION -->
        <div class="select-field">
          <DropSelectInput
            placeholder="Select access"
            :options="user_access_options"
          />
        </div>
      </div>

      <button class="btn btn-primary btn-md">Add User</button>
    </div>
  </div>
</template>

<script>
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "AddBeneficiaryMultiBlock",

  components: {
    DropSelectInput,
    DropDownSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-down-select"
      ),
  },

  data: () => ({
    show_dropdown: false,

    user_roles_options: [
      { id: 1, name: "Seller" },
      { id: 2, name: "Buyer" },
      { id: 3, name: "Broker" },
      { id: 4, name: "Subbroker" },
    ],

    user_access_options: [
      { id: 1, name: "Approve" },
      { id: 2, name: "Mark as done" },
      { id: 3, name: "View" },
    ],
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
  width: 100%;
  padding: toRem(16);

  @include breakpoint-down(xl) {
  }

  .input-rows {
    @include flex-row-between-wrap;

    .input-block {
      @include flex-row-between-wrap;
      width: 48%;

      @include breakpoint-down(xl) {
        margin-bottom: toRem(20);
        width: 100%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: 0;
      }

      .input-field {
        width: 48%;

        @include breakpoint-down(xl) {
          width: 49%;
        }

        @include breakpoint-down(sm) {
          margin-bottom: toRem(24);
          width: 100%;
        }
      }
    }

    .select-block {
      @include flex-row-between-wrap;
      width: 38%;

      @include breakpoint-down(xl) {
        width: 85%;
      }

      @include breakpoint-custom-down(820) {
        margin-bottom: toRem(20);
        width: 100%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: 0;
      }

      .select-field {
        width: 48%;

        @include breakpoint-down(xl) {
          width: 49%;
        }

        @include breakpoint-down(sm) {
          margin-bottom: toRem(24);
          width: 100%;
        }
      }
    }

    .btn {
      padding: toRem(8.5) toRem(24);
    }
  }
}
</style>