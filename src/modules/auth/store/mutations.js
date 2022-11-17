import axios from "axios";
import { VESICASH_AUTH_USER, VESICASH_AUTH_TOKEN } from "@/utilities/constant";
import { setStorage } from "@/utilities/auth-utils";
import { $serviceString as string } from "@/services/service-string";

export default {
  AUTH_SUCCESS: (state, response_payload) => {
    axios.defaults.headers.common["Authorization"] =
      response_payload.access_token;

    setStorage(VESICASH_AUTH_TOKEN, response_payload.access_token);
    setStorage("timestamp", +new Date());

    let userData = {};

    userData.id = response_payload.user.id;
    userData.fullname = `${response_payload.user.firstname} ${response_payload.user.lastname}`;
    userData.email = response_payload.user.email_address;
    userData.phone = response_payload.user.phone_number;
    userData.country = response_payload.profile.user.country ?? "NG";
    userData.currency = response_payload.profile.user.currency ?? "NGN";

    // BUSINESS ACCOUNT DATA
    userData.business_name =
      response_payload.profile?.business?.business_name ?? null;
    userData.business_charge = response_payload.profile?.business
      ?.escrow_charge ?? { type: "percentage", value: "0.05" };

    // STRINGIFY BUSINESS CHARGE AND ENCODE IT
    userData.business_charge = string.encodeString(
      JSON.stringify(userData.business_charge)
    );

    // ENDCODED LOGIN COUNT ACCOUNT TYPE, ACCOUNT ID AND BUSINESS ID
    userData.total_entry = string.encodeString(response_payload.login_count);

    userData.account_type = string.encodeString(
      response_payload.user.account_type
    );
    userData.account_token = string.encodeString(
      response_payload.user.account_id
    );
    userData.business_token = string.encodeString(
      response_payload.user.business_id
    );

    // UPDATE AUTH STATE
    state.authUser = userData;
    setStorage(VESICASH_AUTH_USER, state.authUser, "object");
  },

  AUTH_LOGOUT: () => {
    localStorage.clear();
    location.href = "/login";
  },
};
