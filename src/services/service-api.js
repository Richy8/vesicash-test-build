// ============================================================
// ALL APPLICATION METHODS RELATED TO API HANDLING
// ============================================================
import axios from "axios";
import { API_VERSION, API_BASE_URL } from "env";
import { urlHash } from "./service-route";
import { VESICASH_TOKEN_STRING } from "@/utilities/constant";

// ===============================
// SERVICE API CLSS
// ===============================
class serviceApi {
  base_url = API_BASE_URL;
  base_version = API_VERSION;

  // INSTANTIATE BASE API URL
  constructor() {
    axios.defaults.baseURL = `${this.base_url}${this.base_version}`;
    this.injectTokenInterceptor();
  }

  // ===============================
  // GET API REQUEST
  // ===============================
  async fetch(url, option = { resolve: true }) {
    const hashed_url = urlHash(url);

    try {
      const response = await axios.get(hashed_url, this.getHeaders());
      return option.resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // ===============================
  // POST API REQUEST
  // ===============================
  async push(url, { payload = {}, resolve = true, is_attach = false }) {
    try {
      let response = await axios.post(url, payload, this.getHeaders(is_attach));
      return resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // ===============================
  // UPDATE API REQUEST
  // ===============================
  async update(url, { payload = {}, resolve = true, is_attach = false }) {
    try {
      let response = await axios.put(url, payload, this.getHeaders(is_attach));
      return resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // ===============================
  // DELETE API REQUEST
  // ===============================
  async remove(url, option = { payload: {}, resolve: true }) {
    try {
      let response = await axios.delete(url, {
        data: option.payload,
        ...this.getHeaders(),
      });

      return option.resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // ===============================
  // HANDLE API REQUEST ERRORS
  // ===============================
  async handleErrors(err) {
    return await err.response?.data;
  }

  // ===============================
  // SETUP REQUEST HEADERS
  // ===============================
  getHeaders(attach = false) {
    const authUserToken = localStorage.getItem(VESICASH_TOKEN_STRING) ?? null;

    return attach
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authUserToken}`,
          },
        }
      : {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUserToken}`,
          },
        };
  }

  // ===============================
  // REQUEST AXIOS INTERCEPTOR
  // ===============================
  async injectTokenInterceptor() {
    axios.interceptors.request.use((config) => config);

    axios.interceptors.response.use(
      async (response) => response,

      // ERROR RESPONSE
      async (error) => {
        const originalConfig = error.config;

        if (error.response) {
          if (error.response.status === 403 && !originalConfig._retry) {
            originalConfig._retry = true;

            localStorage.clear();
            window.location.href = "/";

            return axios(originalConfig);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

let $serviceApi = new serviceApi();
export default $serviceApi;
