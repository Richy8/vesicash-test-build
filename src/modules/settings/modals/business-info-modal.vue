<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
    class="business-info-modal"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Business information</div>
        <div class="tertiary-2-text grey-600">Tell us more about your business</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group">
          <BasicInput
            label_title="Business name"
            label_id="business-name"
            :input_value="form.business_name"
            is_required
            placeholder="Enter your business name"
            @getInputState="updateFormState($event, 'business_name')"
            :error_handler="{
            type: 'minimum',
            message: 'Business name should be at least four characters long',
            minimum:4
          }"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="dob">Bio</label>
          <textarea
            placeholder="Write about your company "
            name="bio"
            id="bio"
            cols="30"
            rows="5"
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Address"
            label_id="business-address"
            :input_value="form.business_address"
            is_required
            placeholder="Enter business address"
            @getInputState="updateFormState($event, 'business_address')"
            :error_handler="{
            type: 'minimum',
            message: 'Business address should be at least four characters long',
            minimum:4
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Website"
            label_id="business-website"
            :input_value="form.business_website"
            is_required
            placeholder="Enter website address"
            @getInputState="updateFormState($event, 'business_website')"
            :error_handler="{
            type: 'minimum',
            message: 'Enter your business website',
            minimum:4
          }"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Email"
            label_id="business-email"
            :input_value="form.business_email"
            is_required
            placeholder="Enter email address"
            @getInputState="updateFormState($event, 'business_email')"
            :error_handler="{
            type: 'email',
            message: 'Enter a valid email'
          }"
          />
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button ref="save" class="btn btn-primary btn-md wt-100 mgt-17" @click="save">Submit</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "BusinessInfoModal",

  components: {
    ModalCover,
    BasicInput,
  },

  data() {
    return {
      form: {
        business_name: "",
        business_website: "",
        business_address: "",
        business_email: "",
      },

      validity: {
        business_name: "",
        business_website: "",
        business_address: "",
        business_email: "",
      },
    };
  },

  methods: {
    save() {
      this.handleClick("save");

      setTimeout(() => {
        this.handleClick("save", "Submit", false);
        this.$emit(
          "saved",
          "Your Business information has been updated successfully"
        );
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
.business-info-modal.modal-overlay {
  .modal-outer-container {
    top: toRem(10);
  }
}
</style>
