<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">Verification</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">
      Verify your bvn,and settlements documents here to be able to carry out
      transactions
    </div>

    <div class="cards-container">
      <verification-card
        title="Phone number verification"
        subtitle="Verify your phone number."
        cta_title="Verify phone number"
        @action="toggleInputModal"
        :verified="phone_verified"
      >
        <TelephoneIcon />
      </verification-card>

      <verification-card
        title="Business information"
        subtitle="Update informations about your business."
        cta_title="Verify business information"
        @action="toggleBusinessInfoModal"
        :verified="business_info_verified"
      >
        <BusinessIcon />
      </verification-card>

      <verification-card
        title="Verification document"
        subtitle="Choose and upload documents for verification."
        cta_title="Verify document"
        @action="toggleDocUploadModal"
        :verified="document_verified"
      >
        <FileIcon active />
      </verification-card>

      <verification-card
        title="BVN details"
        subtitle="Confirm your bvn details."
        cta_title="Verify BVN details"
        @action="toggleBvnModal"
        :verified="bvn_verified"
      >
        <BvnIcon />
      </verification-card>

      <verification-card
        title="Settlement account"
        subtitle="Withdrawal accounts for transactions."
        cta_title="Verify settlement account"
      >
        <SettlementIcon />
      </verification-card>
    </div>

    <!-- MODALS -->
    <portal to="vesicash-modals">
      <transition name="fade" v-if="show_input_modal">
        <VerifyInputModal @continue="initiateOTPRequest" @closeTriggered="toggleInputModal" />
      </transition>

      <transition name="fade" v-if="show_otp_modal">
        <VerifyOtpModal @closeTriggered="toggleOtpModal" />
      </transition>

      <transition name="fade" v-if="show_business_info_modal">
        <BusinessInfoModal
          @saved="showSuccessModal('show_business_info_modal','business_info_verified',$event)"
          @closeTriggered="toggleBusinessInfoModal"
        />
      </transition>

      <transition name="fade" v-if="show_doc_upload_modal">
        <VerificationDocumentModal
          @saved="showSuccessModal('show_doc_upload_modal','document_verified',$event)"
          @closeTriggered="toggleDocUploadModal"
        />
      </transition>

      <transition name="fade" v-if="show_bvn_modal">
        <VerificationBvnModal
          @saved="showSuccessModal('show_bvn_modal','bvn_verified',$event)"
          @closeTriggered="toggleBvnModal"
        />
      </transition>

      <transition name="fade" v-if="show_success_modal">
        <SuccessModal @closeTriggered="toggleSuccessModal" :message="response_message" />
      </transition>
    </portal>
  </div>
</template>

<script>
import VerificationCard from "@/modules/settings/components/card-comps/verification-card";
import VerifyInputModal from "@/modules/settings/modals/verify-input-modal";
import VerifyOtpModal from "@/modules/settings/modals/verify-otp-modal";
import BusinessInfoModal from "@/modules/settings/modals/business-info-modal";
import VerificationDocumentModal from "@/modules/settings/modals/verification-document-modal";
import VerificationBvnModal from "@/modules/settings/modals/verification-bvn-modal";
import SuccessModal from "@/shared/modals/success-modal";
export default {
  name: "VerificationSettings",

  components: {
    VerificationCard,
    VerifyInputModal,
    VerifyOtpModal,
    BusinessInfoModal,
    VerificationDocumentModal,
    VerificationBvnModal,
    SuccessModal,

    TelephoneIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/telephone-icon"
      ),
    BusinessIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/business-icon"
      ),
    BvnIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/bvn-icon"
      ),
    FileIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/file-icon"
      ),
    SettlementIcon: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/icon-comps/settlement-icon"
      ),
  },

  data() {
    return {
      show_input_modal: false,
      show_otp_modal: false,
      show_success_modal: false,
      show_doc_upload_modal: false,
      show_bvn_modal: false,
      show_business_info_modal: false,
      phone_verified: false,
      business_info_verified: false,
      document_verified: false,
      bvn_verified: false,
      response_message: "",
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

    toggleBusinessInfoModal() {
      this.show_business_info_modal = !this.show_business_info_modal;
    },

    toggleBvnModal() {
      this.show_bvn_modal = !this.show_bvn_modal;
    },

    toggleSuccessModal() {
      this.show_success_modal = !this.show_success_modal;
    },

    toggleDocUploadModal() {
      this.show_doc_upload_modal = !this.show_doc_upload_modal;
    },

    showSuccessModal(modal, verified, message) {
      this[modal] = false;
      this[verified] = true;
      this.response_message = message;
      this.show_success_modal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-meta {
  border-bottom: toRem(0.5) solid getColor("grey-200");
  padding-bottom: toRem(24);
  margin-bottom: toRem(32);
}

.cards-container {
  display: grid;
  gap: toRem(56) 0;
  padding-bottom: toRem(100);

  @include breakpoint-down(sm) {
    gap: toRem(24) 0;
  }
}
</style>