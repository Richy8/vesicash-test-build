<template>
  <div class="drop-option-wrapper w-100 mgt-7 smooth-animation">
    <div class="inner-wrapper rounded-8">
      <!-- SEARCH BAR -->
      <div class="search-bar mgb-4 mgt-10" v-if="allow_search">
        <input
          type="text"
          class="form-control ignore"
          placeholder="Search"
          v-model="search_value"
          @input="$emit('searchItem', search_value)"
        />
        <div class="icon icon-search grey-400 index-999"></div>
      </div>

      <!-- OPTIONS -->
      <template v-if="options.length">
        <div class="option-scroll-wrapper">
          <div
            class="option-row"
            v-for="(option, index) in options"
            :key="index"
            @click="$emit('clicked', index)"
          >
            <div
              class="inner-lining wt-100"
              :class="index + 1 === options.length && 'no-bottom-border'"
            >
              <div class="img-wrapper">
                <img v-lazy="loadFalseImage('flag.png')" alt="" />
              </div>

              <div>
                {{ option.name }}
              </div>
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
  name: "DropdownSelect",

  props: {
    options: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "Option 1",
        },
      ],
    },

    allow_search: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search_value: null,
    };
  },

  methods: {
    // makeSelection(index) {
    //   this.selected_value = this.options[index].name;
    //   this.$emit("selectedOption", this.options[index].id);
    //   this.forceClose();
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>