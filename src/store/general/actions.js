import $api from "@/services/service-api";

const routes = {
  location: "https://ip2c.org/s",
  upload_file: "/upload/file",
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
};
