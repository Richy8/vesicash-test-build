<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-sm' }"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Renew due date</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- PAYMENT DUE DATE -->
        <div class="col-12">
          <div class="form-group">
            <BasicInput
              label_title="Due date"
              label_id="dueDate"
              input_type="date"
              :input_value="form.due_date"
              placeholder="Select date"
              is_required
              :minimum_date="min_date"
              @getInputState="updateUserInput('due_date', $event.value)"
            />
          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <label class="form-label"> Inspection period (Days) </label>
            <DropSelectInput
              :pre_select="getSelectedInspectionPeriod"
              @selectedOption="updateUserInput('inspection_period', $event)"
              placeholder="Select inspection period"
              :options="inspection_options"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100"
          ref="renewBtn"
          @click="renewTransactionDate"
        >
          Renew date
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import { INSPECTION_OPTIONS } from "@/modules/transactions/constants";
import ModalCover from "@/shared/components/modal-cover";
import BasicInput from "@/shared/components/form-comps/basic-input";
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "RenewDateModal",

  components: {
    ModalCover,
    BasicInput,
    DropSelectInput,
  },

  props: {
    data: {
      type: Object,
    },
  },

  computed: {
    getSelectedInspectionPeriod() {
      return this.inspection_options.find(
        (data) => data.id === +this.data.inspection_period
      );
    },
  },

  data() {
    return {
      inspection_options: INSPECTION_OPTIONS,
      min_date: "",

      form: {
        due_date: this.data.due_date.split(" ")[0],
        inspection_period: this.data.inspection_period,
      },
    };
  },

  mounted() {
    this.hidePastDate();
  },

  methods: {
    ...mapActions({
      renewMilestoneDate: "transactions/renewMilestoneDate",
    }),

    hidePastDate() {
      let open = new Date();
      let year = open.getFullYear(),
        month =
          open.getMonth() + 1 > 9
            ? open.getMonth() + 1
            : `0${open.getMonth() + 1}`,
        day = open.getDate() > 9 ? open.getDate() : `0${open.getDate()}`;

      this.min_date = `${year}-${month}-${day}`;
    },

    updateUserInput(type, value) {
      this.form[type] = value;
    },

    // RENEW MILESTONE TRANSACTION DATE
    renewTransactionDate() {
      this.handleClick("renewBtn");

      let request_payload = {
        transaction_id: this.$route.params.id,
        milestone_id: this.data.milestone_id,
        due_date: this.form.due_date,
        inspection_period: this.form.inspection_period?.toString(),
      };

      this.renewMilestoneDate(request_payload)
        .then((response) => {
          this.handleClick("renewBtn", "Renew Date", false);

          if (response.code === 200) {
            this.pushToast(
              "Transaction milestone date renewed successfully",
              "success"
            );
            setTimeout(() => {
              this.$bus.$emit("refetchTransactionDetails"), 1000;
              this.$emit("closeTriggered");
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>