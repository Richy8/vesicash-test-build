import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// =========================================
// IMPORT APPLICATION STYLES
// =========================================
import "bootstrap/dist/css/bootstrap.css";
import "../public/css/global-styles.css";

// =========================================
// IMPORT APPLICATION PLUGINS
// =========================================
import "@/plugins";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
