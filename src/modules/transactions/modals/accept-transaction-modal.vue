<template>
  <ModalCover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xs' }"
    :show_close_btn="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header"></template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgb-20">
        <!-- ICON WRAPPER -->
        <div class="user-icon-wrapper rounded-circle teal-50-bg mgt-10 mgb-24">
          <UserIcon />
        </div>

        <!-- TITLE TEXT -->
        <div class="title-text fw-600 grey-900 text-center h5-text mgb-8 w-100">
          User Invite
        </div>

        <!-- DESCRIPTION TEXT -->
        <div class="description-text text-center tertiary-1-text">
          {{ transaction.owner }} invited you to
          {{ transaction.title }} transaction
        </div>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button
          class="btn btn-primary btn-md wt-100 mgb-22"
          ref="acceptBtn"
          @click="updatePartyStatus('accepted')"
        >
          Accept
        </button>

        <button
          class="btn btn-secondary btn-md wt-100"
          ref="rejectBtn"
          @click="updatePartyStatus('rejected')"
        >
          Reject
        </button>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import UserIcon from "@/shared/components/icon-comps/user-icon";
import ModalCover from "@/shared/components/modal-cover";

export default {
  name: "AcceptTransactionModal",

  components: {
    ModalCover,
    UserIcon,
  },

  props: {
    transaction: {
      type: Object,
      default: () => ({
        owner: "",
        title: "",
      }),
    },
  },

  methods: {
    ...mapActions({
      updateTransactionParty: "transactions/updateTransactionParty",
    }),

    updatePartyStatus(status) {
      this.handleClick(status === "accepted" ? "acceptBtn" : "rejectBtn");

      let request_payload = {
        transaction_id: this.$route.params.id,
        account_id: this.getAccountId.toString(),
        status,
      };

      this.updateTransactionParty(request_payload)
        .then((response) => {
          if (response.code === 200) {
            this.pushToast(
              status === "accepted"
                ? "Transaction has been accepted"
                : "Transaction has been rejected",
              "success"
            );

            status === "accepted"
              ? this.handleClick("acceptBtn", "Accept", false)
              : this.handleClick("rejectBtn", "Reject", false);

            setTimeout(() => location.reload(), 3000);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  @include flex-column-center;

  .user-icon-wrapper {
    @include flex-column-center;
    @include draw-shape(115);
    position: relative;

    svg {
      @include draw-shape(64);
    }
  }

  .description-text {
    @include font-height(14.75, 24);
    width: 90%;
  }
}
</style>