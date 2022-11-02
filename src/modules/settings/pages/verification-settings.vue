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
      >
        <TelephoneIcon />
      </verification-card>

      <verification-card
        title="Business information"
        subtitle="Update informations about your business."
        cta_title="Verify business information"
        @action="toggleSuccessModal"
      >
        <BusinessIcon />
      </verification-card>

      <verification-card
        title="Verification document"
        subtitle="Choose and upload documents for verification."
        cta_title="Verify document"
        @action="toggleDocUploadModal"
      >
        <FileIcon active />
      </verification-card>

      <verification-card
        title="BVN details"
        subtitle="Confirm your bvn details."
        cta_title="Verify BVN details"
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

      <transition name="fade" v-if="show_doc_upload_modal">
        <VerificationDocumentModal @closeTriggered="toggleDocUploadModal" />
      </transition>

      <transition name="fade" v-if="show_success_modal">
        <SuccessModal @closeTriggered="toggleSuccessModal" />
      </transition>
    </portal>
  </div>
</template>

<script>
import VerificationCard from "@/modules/settings/components/card-comps/verification-card";
import TelephoneIcon from "@/shared/components/icon-comps/telephone-icon";
import BusinessIcon from "@/shared/components/icon-comps/business-icon";
import FileIcon from "@/shared/components/icon-comps/file-icon";
import BvnIcon from "@/shared/components/icon-comps/bvn-icon";
import SettlementIcon from "@/shared/components/icon-comps/settlement-icon";
import VerifyInputModal from "@/modules/settings/modals/verify-input-modal";
import VerifyOtpModal from "@/modules/settings/modals/verify-otp-modal";
import VerificationDocumentModal from "@/modules/settings/modals/verification-document-modal";
import SuccessModal from "@/shared/components/modals/success-modal";
export default {
  name: "VerificationSettings",

  components: {
    VerificationCard,
    TelephoneIcon,
    BusinessIcon,
    BvnIcon,
    SettlementIcon,
    FileIcon,
    VerifyInputModal,
    VerifyOtpModal,
    VerificationDocumentModal,
    SuccessModal,
  },

  data() {
    return {
      show_input_modal: false,
      show_otp_modal: false,
      show_success_modal: false,
      show_doc_upload_modal: false,
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

    toggleSuccessModal() {
      this.show_success_modal = !this.show_success_modal;
    },

    toggleDocUploadModal() {
      this.show_doc_upload_modal = !this.show_doc_upload_modal;
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