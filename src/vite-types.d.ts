import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

declare global {
  interface anyObject {
    [key: string]: any
  }
}

export namespace AXIOS {

  abstract class interceptor {

    public beforeRequest(config: AxiosRequestConfig, options: RequestOptions): void

    public requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig

    public responseInterceptorsStatusCatch(data: { code: number, msg: string }): void
  
    public responseInterceptors(response: AxiosResponse): Promise<AxiosResponse<any>>
    
    public responseInterceptorsCatch(error: AxiosError): Promise<AxiosError>
  }

  interface RequestOptions {
    isIgnoreCancelToken?: boolean
  }

  interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions
    interceptor?: interceptor
  }
}