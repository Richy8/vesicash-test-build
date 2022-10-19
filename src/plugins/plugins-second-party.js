import Vue from "vue";

// ===========================
// APPLICATION MIXINS
// ===========================
import { MixinAssets } from "@/shared/mixins/mixin-assets";
import { MixinEvents } from "@/shared/mixins/mixin-events";
import { MixinAuthUser } from "@/shared/mixins/mixin-auth-user";

// ===========================
// APPLICATION SERVICES
// ===========================
import { $serviceString as $string } from "@/services/service-string";
import { $serviceColor as $color } from "@/services/service-color";
import { $serviceDate as $date } from "@/services/service-date";
import { $serviceValidators as $validate } from "@/services/service-validators";
import { $serviceCurrency as $money } from "@/services/service-currency";

Vue.mixin(MixinAssets);
Vue.mixin(MixinEvents);
Vue.mixin(MixinAuthUser);

Vue.mixin({
  computed: {
    $string: () => $string,
    $color: () => $color,
    $date: () => $date,
    $validate: () => $validate,
    $money: () => $money,
  },
});

// ==============================
// SETUP APPLICATION EVENT BUS
// ==============================
Vue.prototype.$bus = new Vue();
