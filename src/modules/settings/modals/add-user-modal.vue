<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-sm' }">
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Add users to account</div>
        <div class="tertiary-2-text grey-600 wt-75">Create account for new users</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group inline-group">
          <BasicInput
            label_title="First name"
            label_id="first-name"
            :input_value="form.first_name"
            is_required
            placeholder="Enter first name"
            @getInputState="updateFormState($event, 'first_name')"
            :error_handler="{
            type: 'minimum',
            minimum:2,
            message: 'Name should be at least 2 characters long'
          }"
          />

          <BasicInput
            label_title="Last name"
            label_id="last-name"
            :input_value="form.last_name"
            is_required
            placeholder="Enter last name"
            @getInputState="updateFormState($event, 'last_name')"
            :error_handler="{
            type: 'minimum',
            minimum:2,
            message: 'Name should be at least 2 characters long'
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Email address"
            label_id="email-address"
            :input_value="form.email_address"
            is_required
            placeholder="Enter email address"
            @getInputState="updateFormState($event, 'email_address')"
            :error_handler="{
            type: 'email',
            message: 'Enter a valid email address'
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Password"
            label_id="password"
            :input_value="form.password"
            is_required
            input_type="password"
            :custom_style="{ input_wrapper_style: 'form-suffix' }"
            placeholder="Enter password"
            @getInputState="updateFormState($event, 'password')"
            :error_handler="{
            type: 'password',
            message: 'Password should contain at least 4 characters',
          }"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          ref="save"
          class="btn btn-primary btn-md wt-100 mgt-10"
          @click="addUser"
          :disabled="isDisabled"
        >Add user</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "AddUserModal",

  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    ModalCover,
    BasicInput,
  },

  computed: {
    userPayload() {
      return {
        business_id: this.getBusinessId,
        // account_type: "business",
        firstname: this.form.first_name,
        lastname: this.form.last_name,
        email_address: this.form.email_address,
        phone_number: this.form.phone_number,
        password: this.form.password,
      };
    },

    isDisabled() {
      return Object.values(this.validity).some((valid) => valid);
    },
  },

  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
      },

      validity: {
        first_name: true,
        last_name: true,
        email_address: true,
        password: true,
      },
    };
  },

  methods: {
    ...mapActions({
      registerUser: "auth/registerUser",
      fetchConnectedUsers: "settings/fetchConnectedUsers",
    }),

    async addUser() {
      this.handleClick("save");

      try {
        const response = await this.registerUser(this.userPayload);

        const type = response.code === 200 ? "success" : "error";

        if (response.code === 200) {
          await this.fetchConnectedUsers({ business_id: this.getBusinessId });
          this.handleClick("save", "Add user", false);
          this.$emit("saved");
        } else {
          this.handleClick("save", "Add user", false);
          this.pushToast(response.message, type);
        }
      } catch (err) {
        console.log("ERROR ADDING USER", err);
        this.pushToast("Failed to add new user", "error");
        this.handleClick("save", "Add user", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 toRem(16);
}
</style>

