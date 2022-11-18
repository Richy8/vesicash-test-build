<template>
  <div>
    <div
      class="
        page-switcher-route
        rounded-8
        grey-50-bg
        wt-100
        mgb-24
        d-none d-sm-block
      "
    >
      <!-- PAGE ITEMS -->
      <template>
        <router-link
          :to="{ name: page.route }"
          class="page-item"
          :class="page.active && 'page-item-active'"
          v-for="(page, index) in pages"
          :key="index"
        >
          {{ page.name }}
        </router-link>
      </template>
    </div>

    <div class="mgb-24 d-sm-none">
      <DropSelectInput
        placeholder="Select page"
        @optionSelected="$router.push({ name: $event.route })"
        :pre_select="pre_loaded_page"
        :options="pages"
      />
    </div>
  </div>
</template>

<script>
import DropSelectInput from "@/shared/components/drop-select-input";

export default {
  name: "PageSwitcherRoute",

  components: {
    DropSelectInput,
  },

  props: {
    page_data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      pages: this.page_data,
      pre_loaded_page: {},
    };
  },

  watch: {
    $route: {
      handler(value) {
        this.updateRouteActiveState(value);
      },
      immediate: true,
    },
  },

  methods: {
    updateRouteActiveState(route) {
      let active_route = route.name;
      this.pages.map((page) => (page.active = false));

      let active_page = this.pages.find((page) => page.route === active_route);

      active_page.active = true;
      this.pre_loaded_page = active_page;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-switcher-route {
  @include flex-row-start-nowrap;
  padding: toRem(7) toRem(8);

  .page-item {
    @include generate-font-type("secondary-3");
    padding: toRem(7) toRem(16);
    color: getColor("grey-600");
    @include transition(0.4s);
    border-radius: toRem(8);
    margin-right: toRem(8);
    display: inline-block;
    font-size: toRem(12.85);
    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      background: getColor("neutral-10");
    }

    &-active {
      box-shadow: toRem(1) toRem(-1) toRem(4) rgba(168, 177, 175, 0.3),
        toRem(-1) toRem(1) toRem(4) rgba(168, 177, 175, 0.3);
      background: getColor("neutral-10");
      color: getColor("teal-800");
    }
  }
}
</style>