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
          <div class="profile-avatar position-relative">
            <div class="icon-spinner f-size-19 animate position-absolute" v-if="uploading_file"></div>

            <img :src="uploaded_pic" alt="logo" ref="logoImage" v-if="uploaded_pic" />
            <ProfileAvatarIcon v-else />
          </div>

          <input
            type="file"
            id="fileUpload"
            class="d-none"
            accept="image/*"
            ref="fileUpload"
            @change="uploadPic"
          />

          <label
            class="btn btn-secondary btn-sm fw-semibold"
            disabled
            :for="uploading_file ? '': 'fileUpload'"
          >{{ uploading_file ? 'Uploading...': 'Upload profile pic' }}</label>
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

      <!-- USERNAME BLOCK -->
      <div class="page-input-block row">
        <div class="col-12 col-sm-4">
          <label for="logo" class="form-label fw-bold">Username</label>
        </div>

        <div class="col-12 col-sm-8">
          <BasicInput
            is_required
            placeholder="Enter your username "
            :input_value="form.username"
            @getInputState="updateFormState($event, 'username')"
            :error_handler="{
              type: 'required',
              message: 'Enter a username',
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
            v-model="bio"
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
            :is_disabled="isEmailVerified"
            @getInputState="updateFormState($event, 'email')"
            :error_handler="{
              type: 'email',
              message: 'Enter a valid email address',
            }"
          />

          <TagCard
            card_text="Email verified"
            card_type="success"
            class="slim-app-chip"
            v-if="isEmailVerified"
          />

          <button
            class="btn btn-secondary btn-sm fw-semibold"
            v-else
            :disabled="validity.email"
            @click="toggleInputModal('email')"
          >Verify</button>
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
              :is_disabled="isPhoneVerified"
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

          <div class="verify-skeleton skeleton-loader" v-if="loading_verification"></div>

          <TagCard
            card_text="Phone verified"
            v-else-if="isPhoneVerified"
            card_type="success"
            class="slim-app-chip"
          />

          <button
            class="btn btn-secondary btn-sm fw-semibold"
            v-else
            :disabled="validity.phone_number"
            @click="toggleInputModal('phone_number')"
          >Verify</button>
        </div>
      </div>

      <!-- BIO BLOCK -->
      <div class="d-flex row">
        <div class="col-12 col-sm-4"></div>

        <div class="col-12 col-sm-8">
          <button
            class="btn btn-primary btn-md"
            @click="saveProfile"
            :disabled="isDisabled"
            ref="save"
          >Save profile</button>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_input_modal">
        <VerifyInputModal
          @continue="initiateOTPRequest"
          :input="form[input_type]"
          @closeTriggered="toggleInputModal"
          :email="input_type==='email'"
        />
      </transition>

      <transition name="fade" v-if="show_otp_modal">
        <VerifyOtpModal
          @closeTriggered="toggleOtpModal"
          :input="form[input_type]"
          :email="input_type==='email'"
          @done="fetchVerifications"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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

  mounted() {
    this.updateSavedProfile();
    if (!this.getUserVerifications) this.fetchVerifications();
  },

  computed: {
    ...mapGetters({ getUserVerifications: "settings/getUserVerifications" }),

    isPhoneVerified() {
      if (!this.getUserVerifications) return false;
      const phone_verification = this.getUserVerifications.find(
        (type) => type.verification_type === "phone"
      );
      return phone_verification ? phone_verification?.is_verified : false;
    },

    isEmailVerified() {
      if (!this.getUserVerifications) return false;
      const email_verification = this.getUserVerifications.find(
        (type) => type.verification_type === "email"
      );
      return email_verification ? email_verification?.is_verified : false;
    },

    isDisabled() {
      return (
        this.validity.last_name ||
        this.validity.first_name ||
        this.validity.email ||
        !this.isPhoneVerified
      );
    },

    userProfileUpdate() {
      return {
        account_id: this.getAccountId,
        updates: {
          account_type: this.getAccountType,
          firstname: this.form.first_name,
          middlename: "",
          lastname: this.form.last_name,
          phone_number: this.form.phone_number,
          email_address: this.form.email,
          username: this.form.username,
          meta: this.uploaded_pic,
          bio: this.bio,
        },
      };
    },
  },

  data() {
    return {
      show_input_modal: false,
      show_otp_modal: false,
      uploaded_pic: "",
      uploading_file: false,
      loading_verification: false,
      bio: "",
      input_type: "phone",

      form: {
        username: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
      },

      validity: {
        username: true,
        last_name: true,
        first_name: true,
        email: true,
        phone_number: true,
      },
    };
  },

  methods: {
    ...mapActions({
      saveUserProfile: "settings/saveUserProfile",
      uploadToSpace: "general/uploadToSpace",
      fetchUserVerifications: "settings/fetchUserVerifications",
    }),

    ...mapMutations({ UPDATE_AUTH_USER: "auth/UPDATE_AUTH_USER" }),

    async fetchVerifications() {
      this.loading_verification = true;
      await this.fetchUserVerifications({ account_id: this.getAccountId });
      this.loading_verification = false;
    },

    toggleInputModal(type) {
      this.input_type = type;
      this.show_input_modal = !this.show_input_modal;
    },

    toggleOtpModal() {
      this.show_otp_modal = !this.show_otp_modal;
    },

    initiateOTPRequest(input) {
      this.form[this.input_type] = input;
      this.toggleInputModal(this.input_type);
      this.toggleOtpModal();
    },

    async uploadPic(event) {
      const [file] = event.target.files;

      if (!this.processFileSize(file.size)) {
        this.pushToast("Upload a maximum file size of 1mb", "error");
        return false;
      }

      this.uploaded_pic = URL.createObjectURL(file);

      this.$nextTick(() => {
        const image = this.$refs.logoImage;
        if (image) image.onload = () => URL.revokeObjectURL(image.src);
      });

      this.uploading_file = true;

      const loadedImage = await this.uploadToSpace({
        file,
        formatted_size: this.processFileSize(file.size),
      });

      this.uploading_file = false;

      this.uploaded_pic =
        loadedImage.code === 200 ? loadedImage.data.urls[0] : "";

      if (loadedImage.code !== 200)
        this.pushToast("File upload failed", "error");
    },

    processFileSize(size) {
      if (size > 1000000) return false;

      return size.toString().length >= 6
        ? `${(size / 1000000).toFixed(1)}mb`
        : `${(size / 1000).toFixed(1)}kb`;
    },

    updateSavedProfile() {
      const user = this.getUser;
      const last_name = user?.fullname?.split(" ")[0];
      const first_name = user?.fullname?.split(" ")[1];
      const email = user?.email;
      const username = user?.username;
      const phone_number = user?.phone;
      this.bio = user?.bio;
      this.uploaded_pic = user?.meta;

      this.form = {
        ...this.form,
        last_name,
        first_name,
        username,
        email,
        phone_number,
      };

      this.validity = {
        ...this.validity,
        username: !username,
        last_name: !last_name,
        first_name: !first_name,
        email: !email,
        phone_number: !phone_number,
      };
    },

    updateProfile() {
      const updatedUser = {
        ...this.getUser,
        email: this.form.email,
        phone: this.form.phone_number,
        bio: this.bio,
        meta: this.uploaded_pic,
        fullname: `${this.form.last_name} ${this.form.first_name}`,
        username: this.form.username,
      };

      this.UPDATE_AUTH_USER(updatedUser);
    },

    async saveProfile() {
      this.handleClick("save");
      try {
        const response = await this.saveUserProfile(this.userProfileUpdate);
        this.handleClick("save", "Save profile", false);
        const type = response.code === 200 ? "success" : "error";
        const message =
          response.code === 200 ? "Profile saved" : response.message;
        this.pushToast(message, type);

        if (response.code === 200) this.updateProfile();
      } catch (err) {
        this.handleClick("save", "Save profile", false);
        console.log("Failed to save profile", err);
      }
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
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

.verify-skeleton {
  width: toRem(80);
  height: toRem(30);
}
</style>
