import _axios from "@/utils/axios";
import { RequestMethodEnum } from "@/utils/enums";

enum API {
  LOGIN = `login`,
}

export const requestUserLogin = (data: {
  mobile: string;
  code: string;
}): Promise<unknown> => {
  return _axios.request({
    url: API.LOGIN,
    method: RequestMethodEnum.POST,
    data,
  });
};
