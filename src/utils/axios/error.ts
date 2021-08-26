enum NetworkErrorEnum {
  ERROR = "Network Error",
  TIMEOUT = "timeout",
}

export const ERROR_CODE: { code: number; msg: string }[] = [
  { code: 400, msg: "请求错误" },
  { code: 401, msg: "未授权，请登录" },
  { code: 403, msg: "拒绝访问" },
  { code: 404, msg: "请求地址出错" },
  { code: 408, msg: "请求超时" },
  { code: 500, msg: "服务器内部错误" },
  { code: 501, msg: "服务未实现" },
  { code: 502, msg: "网关错误" },
  { code: 503, msg: "服务不可用" },
  { code: 504, msg: "网关超时" },
  { code: 505, msg: "HTTP版本不受支持" },
];

export const networkError = (message: string): void => {
  let msg: string;
  if (message === NetworkErrorEnum.ERROR) {
    msg = "网络错误";
  } else if (message.includes(NetworkErrorEnum.TIMEOUT)) {
    msg = "网络超时";
  } else {
    msg = "未知异常";
  }

  // toast error msg
  console.log(msg);
};
