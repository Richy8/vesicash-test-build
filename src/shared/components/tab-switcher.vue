<template>
  <div class="tab-switcher">
    <div
      class="tab-item"
      v-for="(tab,index) in all_tabs"
      :key="index"
      :class="[tab.active && 'tab-item--active']"
      @click="selectTab(tab,index)"
    >{{tab.name}}</div>
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
  @include flex-row-start-nowrap;
  gap: 0 toRem(7);
  padding: 0 toRem(10);
  border-bottom: toRem(0.5) solid getColor("grey-100");

  .tab-item {
    @include generate-font-type("secondary-3");
    padding: toRem(7) toRem(14);
    color: getColor("grey-700");
    font-size: toRem(12.95);
    font-weight: 500;
    border-bottom: 3px solid transparent;
    transition: ease-in-out border-color 0.3s;
    cursor: pointer;

    &:hover {
      border-bottom: 3px solid getColor("teal-800");
    }
  }

  .tab-item--active {
    border-bottom: 3px solid getColor("teal-800");
  }
}
</style>