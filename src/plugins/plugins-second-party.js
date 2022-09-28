import Vue from "vue";

// ===========================
// APPLICATION MIXINS
// ===========================
import { MixinAssets } from "@/shared/mixins/mixin-assets";
import { MixinEvents } from "@/shared/mixins/mixin-events";

// ===========================
// APPLICATION SERVICES
// ===========================
import { $serviceString as $string } from "@/services/service-string";
import { $serviceColor as $color } from "@/services/service-color";
import { $serviceDate as $date } from "@/services/service-date";
import { $serviceValidators as $validate } from "@/services/service-validators";

Vue.mixin(MixinAssets);
Vue.mixin(MixinEvents);

Vue.mixin({
  computed: {
    $string: () => $string,
    $color: () => $color,
    $date: () => $date,
    $validate: () => $validate,
  },
});

// ==============================
// SETUP APPLICATION EVENT BUS
// ==============================
Vue.prototype.$bus = new Vue();
