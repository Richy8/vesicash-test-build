<template>
  <ModalCover
    :show_close_btn="false"
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    class="bvn-form-modal"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">BVN details</div>
        <div
          class="tertiary-2-text grey-600"
        >Enter Your bank verificaton number to verify your identity</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="form-group">
          <BasicInput
            label_title="Enter your BVN number"
            label_id="bvn-details"
            :input_value="form.bvn"
            is_required
            placeholder="Enter Number"
            @getInputState="updateFormState($event, 'bvn')"
            :error_handler="{
            type: 'minimum',
            message: 'Enter a valid bvn',
            minimum:10
          }"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="dob">Date of birth</label>
          <input type="date" name="dob" id="dob" class="form-control" />
        </div>

        <InfoAlertCard />
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-primary btn-md wt-100 mgt-17" @click="$emit('continue')">Submit</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";

export default {
  name: "VerificationBvnModal",

  components: {
    ModalCover,
    BasicInput,
    InfoAlertCard: () =>
      import(
        /* webpackChunkName: 'shared-module' */ "@/shared/components/card-comps/info-alert-card"
      ),
  },

  data() {
    return {
      form: {
        bvn: "",
      },

      validity: {
        bvn: "",
      },
    };
  },

  methods: {},
};
</script>

<style lang="scss">
.bvn-form-modal.modal-overlay {
  .modal-outer-container {
    top: toRem(50);
  }
}
</style>
