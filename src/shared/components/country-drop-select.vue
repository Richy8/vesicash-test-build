<template>
  <div class="drop-option-wrapper w-100 mgt-7 smooth-animation">
    <div class="inner-wrapper rounded-8">
      <!-- SEARCH BAR -->
      <div class="search-bar mgb-4 mgt-10" v-if="allow_search">
        <input
          type="text"
          class="form-control ignore"
          placeholder="Search country name"
          v-model="search_value"
          @input="filterCountryList"
          @paste="filterCountryList"
        />
        <div class="icon icon-search grey-400 index-999"></div>
      </div>

      <!-- OPTIONS -->
      <template v-if="country_dataset.length">
        <div class="option-scroll-wrapper">
          <div
            class="option-row"
            v-for="(country, index) in country_dataset"
            :key="index"
            @click="updateCountrySelection(country)"
          >
            <div
              class="inner-lining wt-100"
              :class="
                index + 1 === country_dataset.length && 'no-bottom-border'
              "
            >
              <div class="img-wrapper">
                <img v-lazy="country.flag" :alt="country.country" />
              </div>

              <div>{{ country.country }} ({{ country.dialing_code }})</div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="no-options text-center">No options available</div>
      </template>
    </div>

    <div class="mgb-4 invisible">Hidden state</div>
  </div>
</template>

<script>
export default {
  name: "CountryDropSelect",

  props: {
    countries: {
      type: Array,
      default: () => [
        {
          country: "Nigeria",
          dialing_code: "234",
          code: "ng",
          flag: "https://dyclassroom.com/image/flags/ng.png",
        },
      ],
    },

    allow_search: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      search_value: null,
      country_repo: this.countries,
      country_dataset: this.countries,
    };
  },

  methods: {
    // ================================
    //   FILTER COUNTRY BY NAME ENTRY
    // ================================
    filterCountryList() {
      let filtered_list = [];

      if (this.search_value.length) {
        this.country_repo.map((country) => {
          if (
            country.country
              .toLowerCase()
              .includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(country);
          }
        });
        this.country_dataset = filtered_list;
      } else this.country_dataset = this.country_repo;
    },

    // ===============================
    // UPDATE COUNTRY SELECTION
    // ===============================
    updateCountrySelection(country) {
      this.$emit("countrySelected", country);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>