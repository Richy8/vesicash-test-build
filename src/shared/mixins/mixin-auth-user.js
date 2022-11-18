import { mapGetters } from "vuex";
import { $serviceString as string } from "@/services/service-string";

const MixinAuthUser = {
  computed: {
    ...mapGetters({
      getAuthUser: "auth/getAuthUser",
    }),

    // ==============================
    // GET AUTH USER OBJECT
    // ==============================
    getUser() {
      return Object.keys(this.getAuthUser).length ? this.getAuthUser : {};
    },

    // ==============================
    // GET USER LOGIN COUNT
    // ==============================
    getUserLoginCount() {
      return (
        Object.keys(this.getAuthUser).length &&
        Number(string.decodeString(this.getAuthUser.total_entry))
      );
    },

    // ==============================
    // GET USER ACCOUNT TYPE
    // ==============================
    getAccountType() {
      return (
        Object.keys(this.getAuthUser).length &&
        string.decodeString(this.getAuthUser.account_type)
      );
    },

    // ==============================
    // GET USER ACCOUNT ID
    // ==============================
    getAccountId() {
      return (
        Object.keys(this.getAuthUser).length &&
        Number(string.decodeString(this.getAuthUser.account_token))
      );
    },

    // ==============================
    // GET USER BUSINESS ID
    // ==============================
    getBusinessId() {
      return (
        Object.keys(this.getAuthUser).length &&
        Number(string.decodeString(this.getAuthUser.business_token))
      );
    },

    getBusinessData() {
      let business_name =
        Object.keys(this.getAuthUser).length && this.getAuthUser.business_name;

      let escrow_charge =
        Object.keys(this.getAuthUser).length &&
        JSON.parse(string.decodeString(this.getAuthUser.business_charge));

      return {
        business_id: this.getBusinessId,
        business_name,
        escrow_charge,
      };
    },
  },
};

export { MixinAuthUser };
