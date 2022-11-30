<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    class="doc-verification-overlay"
    :modal_style="{ size: 'modal-sm' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Verification document</div>
        <div class="tertiary-2-text grey-600">Choose the document type you wish to upload</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group">
          <div class="form-label">Select document type</div>

          <!-- SELECT INPUT FIELD -->
          <DropSelectInput
            placeholder="Choose verificatiom file"
            :options="verification_docs"
            @optionSelected="document = $event"
          />
        </div>

        <div class="form-group">
          <BasicInput
            label_title="Document verification number"
            label_id="doc-number"
            :input_value="form.doc_number"
            is_required
            placeholder="Enter verification number"
            @getInputState="updateFormState($event, 'doc_number')"
            :error_handler="{
            type: 'required',
            message: 'Enter document verification number',
          }"
          />
        </div>

        <ContractUploadCard
          @uploaded="uploaded_doc=$event"
          titleText="Click to upload verification document"
        />

        <!-- <div class="form-group mgt-24">
          <div class="form-label">How many directors do you have?</div>

          SELECT INPUT FIELD
          <DropSelectInput
            placeholder="Select number of directors"
            :options="directorsRange"
            @optionSelected="director_count = Number($event)"
          />
        </div>-->

        <!-- <ContractUploadCard
          @uploaded="uploaded_doc=$event"
          titleText="Click to upload verification document"
        />-->
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          ref="save"
          class="btn btn-primary btn-md wt-100 mgt-17"
          :disabled="isDisabled"
          @click="save"
        >Submit</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ModalCover from "@/shared/components/modal-cover";
import ContractUploadCard from "@/modules/transactions/components/card-comps/contract-upload-card";
import DropSelectInput from "@/shared/components/drop-select-input";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "VerificationDocModal",

  components: {
    ModalCover,
    DropSelectInput,
    BasicInput,
    ContractUploadCard,
  },

  mounted() {
    this.clearAttachedFile();
  },

  computed: {
    ...mapGetters({ getFileData: "general/getFileData" }),

    directorsRange() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({ name: i, id: i }));
    },

    isDisabled() {
      return !this.form.doc_number || !this.document || !this.getFileData?.name;
    },

    verfiyDocPayload() {
      return {
        account_id: this.getAccountId,
        type: this.document?.id,
        id: this.form.doc_number,
        meta: this.uploaded_doc?.urls[0],
      };
    },
  },

  data() {
    return {
      director_count: 0,
      verification_docs: [
        {
          name: "CAC document",
          id: "cac",
        },
        {
          name: "Passport",
          id: "passport",
        },
        {
          name: "Driver License",
          id: "drivers_license",
        },
        {
          name: "National ID",
          id: "national_id",
        },
        {
          name: "BVN document",
          id: "bvn",
        },
        {
          name: "NIN document",
          id: "nin",
        },
        {
          name: "Utility Bill",
          id: "utilitybill",
        },
      ],

      document: null,
      uploaded_doc: null,

      form: {
        doc_number: "",
      },

      validity: {
        doc_number: true,
      },
    };
  },

  methods: {
    ...mapActions({
      clearAttachedFile: "general/clearAttachedFile",
      verfiyUserDocument: "settings/verfiyUserDocument",
    }),

    async save() {
      this.handleClick("save");

      try {
        const response = await this.verfiyUserDocument(this.verfiyDocPayload);

        this.handleClick("save", "Submit", false);

        if (response.code === 200) {
          this.pushToast(response.message, "success");
          this.$emit("saved", "Your document has been uploaded successfully");
        } else {
          this.pushToast(response.message, "error");
        }
      } catch (err) {
        console.log("ERROR SAVING DOCUMENT", err);
        this.handleClick("save", "Submit", false);
        this.pushToast("Failed to verify document", "error");
      }
    },
  },
};
</script>

<style lang="scss">
.modal-overlay.doc-verification-overlay {
  .modal-outer-container {
    top: 1.5rem;
  }
  .modal-cover-body {
    max-height: 65vh;
    overflow-y: auto;
  }
}
</style>
