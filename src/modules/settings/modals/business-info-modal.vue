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

        <div class="form-group" v-if="false">
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
        <button ref="save" class="btn btn-primary btn-md wt-100 mgt-5" @click="save">Submit</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "BusinessInfoModal",

  components: {
    ModalCover,
    BasicInput,
  },

  mounted() {
    this.updateSavedProfile();
  },

  computed: {
    getUpdatePayload() {
      return {
        business_id: this.getBusinessId,
        updates: {
          business_name: this.form.business_name,
          business_address: this.form.business_address,
          website: this.form.business_website,
          business_email: this.form.business_email,
        },
      };
    },
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
        business_name: true,
        business_website: true,
        business_address: true,
        business_email: true,
      },
    };
  },

  methods: {
    ...mapActions({
      updateUserBusinessInfo: "settings/updateUserBusinessInfo",
    }),

    ...mapMutations({ UPDATE_AUTH_USER: "auth/UPDATE_AUTH_USER" }),

    updateSavedProfile() {
      const user = this.getUser;
      const {
        business_name,
        business_email,
        business_address,
        business_website,
      } = user;

      this.form = {
        business_name,
        business_email,
        business_address,
        business_website,
      };

      this.validity = {
        business_name: !business_name,
        business_email: !business_email,
        business_address: !business_address,
        business_website: !business_website,
      };
    },

    updateProfile() {
      const updatedUser = {
        ...this.getUser,
        business_name: this.form.business_name,
        business_email: this.form.business_email,
        business_address: this.form.business_address,
        business_website: this.form.business_website,
      };

      this.UPDATE_AUTH_USER(updatedUser);
    },

    async save() {
      this.handleClick("save");

      try {
        const response = await this.updateUserBusinessInfo(
          this.getUpdatePayload
        );
        this.handleClick("save", "Submit", false);

        if (response.code === 200) {
          this.$emit(
            "saved",
            "Your Business information has been updated successfully"
          );

          this.updateProfile();
        } else this.pushToast(response.message, "error");
      } catch (err) {
        console.log("ERROR UPDATING BUSINESS INFO", err);
        this.pushToast("Failed to update business information", "error");
        this.handleClick("save", "Submit", false);
      }
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
