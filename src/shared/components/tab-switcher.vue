<template>
  <div class="tab-switcher">
    <div
      class="tab-item secondary-3-text grey-600 fw-500 smooth-transition pointer"
      v-for="(tab, index) in all_tabs"
      :key="index"
      :class="[tab.active && 'tab-item--active']"
      @click="selectTab(tab, index)"
    >{{ tab.name }}</div>
  </div>
</template>

<script>
export default {
  name: "TabSwitcher",

  props: {
    tabs: {
      type: Array,
      default: () => [
        {
          name: "My Fundings",
          value: "fundings",
          active: true,
        },
        {
          name: "My Withdrawals",
          value: "withdrawals",
          active: false,
        },
      ],
    },
  },

  watch: {
    tabs: {
      handler(state) {
        this.all_tabs = [...state];
      },
      immediate: true,
    },
  },

  data() {
    return {
      all_tabs: [],
    };
  },

  methods: {
    selectTab(tab, index) {
      this.all_tabs = this.all_tabs.map((tab, position) => {
        tab.active = position === index ? true : false;
        return tab;
      });
      this.$emit("tabSelected", tab.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-switcher {
  border-bottom: toRem(0.5) solid getColor("grey-100");
  @include flex-row-start-nowrap;
  // padding: 0 toRem(10);
  gap: 0 toRem(7);

  .tab-item {
    border-bottom: toRem(3) solid transparent;
    padding: toRem(7) toRem(14);
    font-size: toRem(12.75);

    &:hover {
      border-bottom: toRem(3) solid getColor("teal-800");
    }
  }

  .tab-item--active {
    border-bottom: toRem(3) solid getColor("teal-800");
    color: getColor("teal-800");
  }
}
</style>