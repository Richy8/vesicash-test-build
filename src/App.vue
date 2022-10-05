<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- FEATHER PAGE LOADER -->
    <transition name="fade" v-if="show_feather_loader">
      <PageLoader />
    </transition>

    <!-- VESICASH MODAL PORTAL TARGET -->
    <portal-target name="vesicash-modals"></portal-target>
  </div>
</template>

<script>
export default {
  name: "App",

  metaInfo: {
    title: "Escrow Payment service Nigeria Africa",
    titleTemplate: "Vesicash | %s",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },

  components: {
    PageLoader: () =>
      import(
        /* webpackChunkName: "app-module" */ "@/shared/components/page-loader"
      ),
  },

  watch: {
    $route: {
      handler() {
        this.show_feather_loader = false;
      },
    },
  },

  data: () => ({
    show_feather_loader: false,
  }),

  created() {
    // ==================================
    // EVENT BUS TO TOGGLE PAGE LOADER
    // ==================================
    this.$bus.$on(
      "toggle-page-loader",
      () => (this.show_feather_loader = !this.show_feather_loader)
    );
  },

  methods: {},
};
</script>

<style lang="scss">
*,
html,
body {
  scroll-behavior: smooth !important;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.2s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}
</style>
