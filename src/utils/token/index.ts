import Storage from "../storage";

const TOKEN = "token";

export const token = () => {
  return Storage.getItem(TOKEN);
};

export const tokenClear = () => {
  Storage.removeItem(TOKEN);
};
