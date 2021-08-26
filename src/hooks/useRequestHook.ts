import Apis from "@/apis";

// use api as module
export function useRequest(opt?: { module: string }) {
  if (opt) {
    if (Apis[opt.module]) return Apis[opt.module];
  }

  return Apis;
}
