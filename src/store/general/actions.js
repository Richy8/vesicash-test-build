import $api from "@/services/service-api";

const routes = {
  location: "https://ip2c.org/s",
  upload_file: "/upload/file",
  country_bank_list: "/admin/banks/country",
  verify_account: "/payment/banks/account_verification",
};

export default {
  // ==============================
  // GET CURRENT USER LOCATION
  // ==============================
  async getMyLocation() {
    return await $api.fetchRaw(routes.location);
  },

  // ================================
  // UPLOAD FILE ATTACHMENT
  // ================================
  async uploadFile(_, payload) {
    return await $api.push(routes.upload_file, { payload, is_attach: true });
  },

  // ==============================
  // GET ALL BANKS IN A COUNTRY
  // ==============================
  async getAllBanks(_, country) {
    return await $api.push(routes.country_bank_list, { payload: { country } });
  },

  // ==============================
  // VERIFY BANK ACCOUNT
  // ==============================
  async verifyBankAccount(_, { bank_code, account_number }) {
    return await $api.fetch(
      `${routes.verify_account}?bank_code=${bank_code}&account_number=${account_number}`
    );
  },
};
