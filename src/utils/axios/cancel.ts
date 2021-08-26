import axios, { AxiosRequestConfig, Canceler } from "axios";
export let pendingMap = new Map<string, Canceler>();

export class AxiosCanceler {
  private getPendingUrl(config: AxiosRequestConfig): string {
    return [config.method, config.url].join("&");
  }

  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = this.getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  public removePending(config: AxiosRequestConfig): void {
    const url = this.getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  public removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      cancel && cancel();
    });
    pendingMap.clear();
  }

  public reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
