import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { AXIOS } from "../../vite-types.d";
import VAxios from "./axios";
import { AxiosCanceler } from "./cancel";
import { token, tokenClear } from "../token";
import { networkError } from "./error";

const axiosCanceler = new AxiosCanceler();

const interceptor = {
  beforeRequest(
    config: AxiosRequestConfig,
    options: AXIOS.RequestOptions
  ): void {
    config.headers = config.headers || {};
    config.headers.requestOptions = options || {};
  },

  requestInterceptors(config: AxiosRequestConfig) {
    const _token = token();

    if (_token) {
      config.headers[`X-Token`] = _token;
    }
    const { headers: { requestOptions } = { requestOptions: {} } } = config;
    !requestOptions.isIgnoreCancelToken && axiosCanceler.addPending(config);
    delete config.headers.requestOptions;

    return config;
  },

  responseInterceptors(response: AxiosResponse): Promise<AxiosResponse<any>> {
    const { config, data } = response;
    const { code } = data;
    config && axiosCanceler.removePending(config);
    if (code === 200) {
      return data;
    }
    this.responseInterceptorsStatusCatch(data);
    return Promise.reject(data);
  },

  responseInterceptorsStatusCatch({
    code,
    msg,
  }: {
    code: unknown;
    msg: unknown;
  }) {
    console.log(code, msg);
  },

  responseInterceptorsCatch(error: AxiosError) {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          tokenClear();
          break;
        default:
      }
    } else {
      networkError(error.message);
    }

    return Promise.reject(error);
  },
};

const createAxios = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

  return new VAxios({
    timeout: 30000,
    baseURL: baseUrl,
    interceptor,
    requestOptions: {
      isIgnoreCancelToken: false,
    },
  });
};

export default createAxios();
