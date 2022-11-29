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
              :pre_select="{}"
              @selectedOption="
                updateUserSelection(
                  'inspection_period',
                  $event,
                  inspection_options
                )
              "
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
        <button class="btn btn-primary btn-md wt-100">Renew date</button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapGetters } from "vuex";
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

  props: {},

  computed: {},

  data: () => ({
    inspection_options: INSPECTION_OPTIONS,
    min_date: "",

    form: {
      due_date: "",
      inspection_period: "",
    },
  }),

  mounted() {
    this.hidePastDate();
  },

  methods: {
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

    updateUserSelection(type, value, options, outer = false) {
      let selected = options.find((option) => option.id === value);

      //   let milestone_data = { ...this.milestone };
      //   milestone_data[type] = selected;

      //   let outer_data = outer ? { type, selected } : {};
    },

    updateUserInput(type, value) {
      //   let milestone_data = { ...this.milestone };
      //   milestone_data[type] = value;
    },
  },
};
</script>

<style>
</style>