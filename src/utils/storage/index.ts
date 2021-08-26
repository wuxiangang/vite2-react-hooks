import { TypeEnums } from "@/utils/enums";

class Storage {
  public getItem(key: string, type?: string) {
    try {
      const val = localStorage.getItem(key);
      switch (type) {
        case TypeEnums.JSON:
          if (val) return JSON.parse(val);
          break;
        case TypeEnums.NUMBER:
          return Number(val);
        case TypeEnums.BOOLEAN:
          return Boolean(val);
        default:
          return val;
      }
    } catch (e) {}

    return null;
  }
  public setItem(params: anyObject) {
    try {
      Object.keys(params).forEach((key) => {
        const val = params[key];
        localStorage[key] =
          val && typeof val === TypeEnums.OBJECT ? JSON.stringify(val) : val;
      });
    } catch (e) {}
  }
  public removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
  public clear() {
    try {
      localStorage.clear();
    } catch (e) {}
  }
}

export default new Storage();
