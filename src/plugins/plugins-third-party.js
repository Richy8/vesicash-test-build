import Vue from "vue";

// =======================================
// IMPORT THIRD PARTY PLUGINS
// =======================================
import VueLazyload from "vue-lazyload";
import Meta from "vue-meta";
import PortalVue from "portal-vue";
import { mixin as clickaway } from "vue-clickaway";

Vue.use(Meta);
Vue.use(VueLazyload);
Vue.use(PortalVue);
Vue.mixin(clickaway);
