<template>
  <ModalCover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-sm' }">
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">Account details</div>
      </div>
    </template>

    <!-- MODAL COVER BODY -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <template v-if="account.currency==='NGN'">
          <ModalListItem title="Bank" :value="account.bank_name" />
          <ModalListItem title="Account number" :value="account.account_no" />
          <ModalListItem title="Account name" :value="account.account_name" />
        </template>

        <template v-else>
          <ModalListItem title="Account name" :value="account.account_name" />
          <ModalListItem title="Bank name" :value="account.bank_name" />
          <ModalListItem title="Iban/Account no" :value="account.account_no" />
          <ModalListItem title="Swift code" :value="account.swift_code" />
          <ModalListItem title="Sort code" :value="account.sort_code" />
          <ModalListItem title="Bank address" :value="account.bank_address" />
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <div class="btn-wrapper mgt-17">
          <button ref="delete" class="btn btn-secondary btn-md wt-100" @click="deleteAccount">
            <span class="icon icon-trash mgr-11"></span>
            Delete account
          </button>

          <button
            ref="save"
            class="btn btn-primary btn-md wt-100 text-white"
            v-if="account.currency==='USD'"
            @click="$emit('edit')"
          >
            <span class="icon icon-edit-pen neutral-10 mgr-11"></span>
            Edit account
          </button>
        </div>
      </div>
    </template>
  </ModalCover>
</template>

<script>
import { mapActions } from "vuex";
import ModalCover from "@/shared/components/modal-cover";
import ModalListItem from "@/modules/dashboard/components/modal-comps/modal-list-item";

export default {
  name: "AccountDetailsModal",

  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    ModalCover,
    ModalListItem,
  },

  computed: {
    deleteUpdate() {
      return {
        account_id: this.getAccountId,
        bank_id: this.account.id,
      };
    },
  },

  methods: {
    ...mapActions({
      removeUserBank: "settings/removeUserBank",
      fetchAllBanks: "settings/fetchAllBanks",
    }),

    async deleteAccount() {
      this.handleClick("delete");
      try {
        const response = await this.removeUserBank(this.deleteUpdate);

        const type = response.code === 200 ? "success" : "error";

        const message =
          response.code === 200 ? "Account deleted" : response.message;

        this.pushToast(message, type);

        if (type === "success") {
          await this.fetchAllBanks(this.getAccountId);
          this.handleClick("delete", "Delete account", false);
          this.$emit("closeTriggered");
        } else this.handleClick("delete", "Delete account", false);
      } catch (err) {
        this.handleClick("delete", "Delete account", false);
        console.log("Failed to delete account", err);
        this.pushToast("Failed to delete account", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  @include flex-row-start-nowrap;
  gap: toRem(24);

  .btn {
    transition: background ease-in-out 0.3s !important;
  }

  @include breakpoint-custom-down(780) {
    @include flex-row-start-wrap;

    .btn-primary {
      order: 1;
    }

    .btn-secondary {
      order: 2;
    }
  }
}
</style>

