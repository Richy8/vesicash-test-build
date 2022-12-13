import $api from "@/services/service-api";

const routes = {
    fx_rate: "/transactions/rates",
};

export default {
    // ==================================
    // FETCH ALL FX RATES
    // ==================================
    async fetchAllFxRates({ commit }) {
        const response = await $api.fetch(routes.fx_rate);
        if (response.code === 200) commit("UPDATE_FX_RATES", response.data);
        return response;
    },
};