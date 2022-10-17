import { getStorage } from "@/utilities/auth-utils";
import { VESICASH_AUTH_TOKEN, VESICASH_AUTH_USER } from "@/utilities/constant";

export default () => ({
    authToken: getStorage(VESICASH_AUTH_TOKEN) || "",
    authUser: getStorage(VESICASH_AUTH_USER, 'object') || "",
});
  