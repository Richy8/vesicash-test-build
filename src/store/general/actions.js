import $api from "@/services/service-api";

const routes = {
  location: "https://ip2c.org/s",
};

export default {
  // ==============================
  // GET CURRENT USER LOCATION
  // ==============================
  async getMyLocation() {
    return await $api.fetchRaw(routes.location);
  },
};
