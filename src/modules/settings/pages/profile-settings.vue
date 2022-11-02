<template>
  <div class="pdb-80">
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">Profile</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">Update your profile and personal info here.</div>

    <!-- FORM AREA -->
    <div class="settings-form-area mgt-20">
      <!-- BUSINESS LOGO BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Business logo</label>
        </div>

        <div class="col-12 col-sm-8 logo-block">
          <div class="profile-avatar">
            <ProfileAvatarIcon />
          </div>

          <label class="btn btn-secondary btn-sm fw-semibold">Upload profile pic</label>
        </div>
      </div>

      <!-- BUSINESS NAME BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Business name</label>
        </div>

        <div class="col-12 col-sm-8">
          <BasicInput
            is_required
            placeholder="Enter business name "
            :input_value="form.business_name"
            @getInputState="updateFormState($event, 'business_name')"
            :error_handler="{
              type: 'required',
              message: 'Enter your business name',
            }"
          />
        </div>
      </div>

      <!-- FULL NAME BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Full name</label>
        </div>

        <div class="col-12 col-sm-8 two-columns-row">
          <BasicInput
            is_required
            placeholder="Enter your last name "
            :input_value="form.last_name"
            @getInputState="updateFormState($event, 'last_name')"
            :error_handler="{
              type: 'single',
              message: 'Last name should contain at least two characters',
            }"
          />

          <BasicInput
            is_required
            placeholder="Enter your first name "
            :input_value="form.first_name"
            @getInputState="updateFormState($event, 'first_name')"
            :error_handler="{
              type: 'single',
              message: 'First name should contain at least two characters',
            }"
          />
        </div>
      </div>

      <!-- BIO BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Bio</label>
        </div>

        <div class="col-12 col-sm-8">
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="4"
            placeholder="Write about your company "
            class="form-control"
          ></textarea>
        </div>
      </div>

      <!-- EMAIL BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Email</label>
        </div>

        <div class="col-12 col-sm-8 two-columns-row two-columns-row--tight">
          <BasicInput
            is_required
            input_type="email"
            placeholder="Enter your email"
            :input_value="form.email"
            is_disabled
            @getInputState="updateFormState($event, 'email')"
            :error_handler="{
              type: 'email',
              message: 'Enter a valid email address',
            }"
          />

          <TagCard card_text="Email Verified" card_type="success" class="slim-app-chip" />
        </div>
      </div>

      <!-- PHONE BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Phone number</label>
        </div>

        <div
          class="col-12 col-sm-8 two-columns-row two-columns-row--tight two-columns-row--phone-variant"
        >
          <div class="position-relative">
            <BasicInput
              input_type="number"
              :input_value="form.phone_number"
              is_phone_type
              is_required
              placeholder="Enter your phone number"
              :custom_style="{ input_wrapper_style: 'form-prefix' }"
              @getInputState="updateFormState($event, 'phone_number')"
              :error_handler="{
            type: 'phone',
            message: 'Phone number is not valid',
          }"
            />
          </div>

          <button class="btn btn-secondary btn-sm fw-semibold" @click="toggleInputModal">Verify</button>
        </div>
      </div>

      <!-- BIO BLOCK -->
      <div class="d-flex row">
        <div class="col-12 col-sm-4"></div>

        <div class="col-12 col-sm-8">
          <button class="btn btn-primary btn-md">Save profile</button>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_input_modal">
        <VerifyInputModal @continue="initiateOTPRequest" @closeTriggered="toggleInputModal" />
      </transition>

      <transition name="fade" v-if="show_otp_modal">
        <VerifyOtpModal @closeTriggered="toggleOtpModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import BasicInput from "@/shared/components/form-comps/basic-input";
import TagCard from "@/shared/components/card-comps/tag-card";
import ProfileAvatarIcon from "@/shared/components/icon-comps/profile-avatar-icon";
import VerifyInputModal from "@/modules/settings/modals/verify-input-modal";
import VerifyOtpModal from "@/modules/settings/modals/verify-otp-modal";
export default {
  name: "ProfileSettings",

  components: {
    BasicInput,
    TagCard,
    ProfileAvatarIcon,
    VerifyInputModal,
    VerifyOtpModal,
  },

  data() {
    return {
      show_input_modal: false,
      show_otp_modal: false,

      form: {
        business_name: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
      },

      validity: {
        business_name: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
      },
    };
  },

  methods: {
    toggleInputModal() {
      this.show_input_modal = !this.show_input_modal;
    },

    toggleOtpModal() {
      this.show_otp_modal = !this.show_otp_modal;
    },

    initiateOTPRequest() {
      this.toggleInputModal();
      this.toggleOtpModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-block {
  display: grid;
  grid-template-columns: toRem(60) auto;
  gap: toRem(22);
  align-items: center;

  @include breakpoint-down(sm) {
    grid-template-columns: toRem(60) 1fr;

    .btn-sm {
      width: 100%;
    }
  }

  .profile-avatar {
    background: getColor("teal-50");
    border: toRem(0.5) solid getColor("teal-200");
    border-radius: 50%;
    @include draw-shape(56);
    @include flex-row-center-nowrap;
  }
}

.two-columns-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: toRem(32);

  @include breakpoint-down(sm) {
    grid-template-columns: 1fr;
  }
}

.two-columns-row--tight {
  gap: toRem(16);
  align-items: center;

  .slim-app-chip {
    height: max-content;
    padding: 0.196875rem 0.625rem 0.15rem 1.3125rem;
  }
}

.two-columns-row--phone-variant {
  grid-template-columns: 5fr 3fr;
  @include breakpoint-down(md) {
    grid-template-columns: 5fr 2fr;
  }
  @include breakpoint-down(sm) {
    grid-template-columns: 1fr;
  }
}

.btn-sm {
  width: max-content;
  padding: 0.5rem 2rem;
}

.pdb-80 {
  padding-bottom: toRem(80);
}
</style>
