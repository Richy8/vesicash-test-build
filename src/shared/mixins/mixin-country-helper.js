import { mapActions } from "vuex";
import { countries } from "@/utilities/countries.json";

const countryHelper = {
  data: () => ({
    show_dropdown: false,

    countries_data: countries,
    current_country: {
      country: "Nigeria",
      dialing_code: "234",
      code: "ng",
      flag: "https://dyclassroom.com/image/flags/ng.png",
    },
  }),

  created() {
    // LOAD MY CURRENT COUNTRY
    this.loadCurrentUserLocation();
  },

  methods: {
    ...mapActions({
      getMyLocation: "general/getMyLocation",
    }),

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    forceClose() {
      this.show_dropdown = false;
    },

    determineTargetArea($event) {
      if (!$event.target.classList.contains("ignore")) this.forceClose();
    },

    // ==============================
    // LOAD CURRENT USER LOCATION
    // ==============================
    loadCurrentUserLocation() {
      let country_fallback = {
        country: "Nigeria",
        dialing_code: "234",
        code: "ng",
        flag: "https://dyclassroom.com/image/flags/ng.png",
      };

      this.getMyLocation()
        .then((response) => {
          let country_code = response?.split(";")[1].toLowerCase() ?? "ng";

          this.current_country = this.countries_data.find(
            (country) => country.code === country_code
          );
        })
        .catch(() => (this.current_country = country_fallback));
    },
  },
};

export default countryHelper;
