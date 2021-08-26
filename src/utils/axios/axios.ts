import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AXIOS } from "../../vite-types.d";

export default class VAxios {
  private axios: AxiosInstance;
  private readonly options: AXIOS.CreateAxiosOptions;

  constructor(options: AXIOS.CreateAxiosOptions) {
    this.options = options;
    this.axios = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    const { interceptor } = this.options;
    if (!interceptor) return;

    const {
      requestInterceptors,
      responseInterceptors,
      responseInterceptorsCatch,
    } = interceptor;

    this.axios.interceptors.request.use(requestInterceptors);
    this.axios.interceptors.response.use(
      responseInterceptors,
      responseInterceptorsCatch
    );
  }

  public request(config: AxiosRequestConfig, options?: AXIOS.RequestOptions) {
    const { requestOptions, interceptor } = this.options;
    const opt = { ...requestOptions, ...options };

    const { beforeRequest } = interceptor || {};
    beforeRequest && beforeRequest(config, opt);
    return new Promise((resolve, reject) => {
      this.axios.request(config).then(resolve).catch(reject);
    });
  }
}
