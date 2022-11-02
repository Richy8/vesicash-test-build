<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-sm' }">
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
          <div class="form-label">Select document</div>

          <!-- SELECT INPUT FIELD -->
          <DropSelectInput
            placeholder="Choose verificatiom fiile"
            :options="verification_docs"
            @optionSelected="document = $event"
          />
        </div>

        <ContractUploadCard />
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
import ContractUploadCard from "@/modules/transactions/components/card-comps/contract-upload-card";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "VerificationDocModal",

  components: {
    ModalCover,
    DropSelectInput,
    ContractUploadCard,
  },

  data() {
    return {
      verification_docs: [{}],

      document: null,
    };
  },

  methods: {
    save() {
      this.handleClick("save");

      setTimeout(() => {
        this.handleClick("save", "Submit", false);
        this.$emit("saved", "Your document has been uploaded successfully");
      }, 1500);
    },
  },
};
</script>
