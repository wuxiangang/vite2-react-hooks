import React, { lazy } from "react";
import Router, { Props, RouterProps } from "react-access-router";
import { Redirect } from "react-router-dom";
import Layout from "@/layout/Layout";

const Login = <Redirect to={{ pathname: "/login" }} />;

export const routes: Props[] = [
  {
    path: "/",
    // 会自动修改 document title
    title: "总览",
    // 是否验证token
    // 组件
    component: lazy(() => import("../App")),
    // any thing you will use, type object
    meta: {},
    layoutComponent: Layout,
  },
  {
    path: "/a",
    title: "收银台",
    auth: true,
    // 验证权限是否满足, 多个array 单个 string | number
    role: ["admin"],
    component: lazy(() => import("../App")),
  },
  {
    path: "/b",
    title: "收银台2",
    component: lazy(() => import("../App")),
  },
  {
    path: "/login",
    title: "登录",
    component: lazy(() => import("../App")),
  },
];

export default function BaseRouter() {
  const useSuspense = { fallback: null };
  const routeProps: RouterProps = {
    // component use lazy, must add Suspense,
    routes,
    // use Suspense
    useSuspense,
    // use History or Hash
    mode: "history",
    // if router need check auth, this is callback, return React dom
    onAuthRender(route: any) {
      if (route.auth) return Login;
    },
    // while can not find router, it will redirect to 404 path
    path404: "/404",
  };

  return <Router {...routeProps} />;
}
