<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">Password</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600 mgb-24">
      Change your password here
    </div>

    <!-- FORM AREA -->
    <div class="settings-form-area">
      <!-- CURRENT PASSWORD -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label class="form-label"> Current Password </label>
        </div>

        <div class="col-12 col-sm-8">
          <BasicInput
            input_type="password"
            is_required
            placeholder="Current password"
            :input_value="form.current_password"
            :custom_style="{ input_wrapper_style: 'form-suffix' }"
            @getInputState="updateFormState($event, 'current_password')"
            :error_handler="{
              type: 'password',
              message: 'Password should contain at least 4 characters',
            }"
          />
        </div>
      </div>

      <!-- NEW PASSWORD -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label class="form-label"> New Password </label>
        </div>

        <div class="col-12 col-sm-8">
          <BasicInput
            input_type="password"
            is_required
            placeholder="New password"
            :input_value="form.new_password"
            :custom_style="{ input_wrapper_style: 'form-suffix' }"
            @getInputState="updateFormState($event, 'new_password')"
            :error_handler="{
              type: 'password',
              message: 'Password should contain at least 4 characters',
            }"
          />
        </div>
      </div>

      <!-- RETYPE PASSWORD -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label class="form-label"> Retype Password </label>
        </div>

        <div class="col-12 col-sm-8">
          <BasicInput
            input_type="password"
            is_required
            placeholder="Retype new password"
            :input_value="form.confirm_password"
            :custom_style="{ input_wrapper_style: 'form-suffix' }"
            @getInputState="updateFormState($event, 'confirm_password')"
            :error_handler="{
              type: 'password',
              message: 'Password should contain at least 4 characters',
            }"
          />
        </div>
      </div>

      <!-- BUTTON ROW -->
      <div class="btn-row mgt-10 row mgb-40">
        <div class="col-12 col-sm-4"></div>

        <div class="col-12 col-sm-8">
          <button class="btn btn-primary btn-md">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "PasswordSettings",

  components: {
    BasicInput,
  },

  data() {
    return {
      form: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },

      validity: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
    };
  },
};
</script>

<style>
</style>