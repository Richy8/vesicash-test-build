<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Edit User</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- EMAIL ADDRESS INPUT -->
        <div class="form-group">
          <div class="form-label" for="emailAddress">Email address</div>
          <input
            type="email"
            id="emailAddress"
            class="form-control"
            placeholder="Enter email address"
          />
        </div>

        <!-- PHONE INPUT -->
        <div class="form-group">
          <div class="form-label" for="phoneNumber">Phone number</div>

          <div class="form-prefix">
            <input
              type="number"
              id="phoneNumber"
              class="form-control"
              placeholder="Enter your phone number"
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
          </div>

          <!-- DROP DOWN SELECT AREA -->
          <template name="drop-select-area" v-if="show_dropdown">
            <DropDownSelect />
          </template>
        </div>

        <!-- USER ROLE INPUT -->
        <div class="form-group">
          <div class="form-label" for="emailAddress">Select user role</div>
          <DropSelectInput
            placeholder="Select user role"
            :options="user_roles_options"
          />
        </div>

        <template v-if="type === 'multiple'">
          <!-- USER ACCESS INPUT -->
          <div class="form-group">
            <div class="form-label" for="emailAddress">Select user access</div>
            <DropSelectInput
              placeholder="Select access"
              :options="user_access_options"
            />
          </div>

          <!-- USER PAYOUT INPUT -->
          <div class="form-group">
            <div class="form-label" for="emailAddress">
              User receives payout
            </div>
            <DropSelectInput
              placeholder="Select payout status"
              :options="user_payout_status"
            />
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100">Save user</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "EdirUserModal",

  components: {
    ModalCover,
    DropSelectInput,
    DropDownSelect: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/drop-down-select"
      ),
  },

  props: {
    type: {
      type: String,
      default: "single",
    },
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

    user_payout_status: [
      { id: 1, name: "No" },
      { id: 2, name: "Yes" },
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

<style>
</style>