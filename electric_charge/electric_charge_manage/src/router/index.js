import Vue from "vue";
import VueRouter from "vue-router";
import { getStore } from "../utils/storage";

Vue.use(VueRouter);

let userInfo = JSON.parse(getStore("userInfo"));

export const routerMap = [
  {
    path: "/priceManage",
    name: "PriceManage",
    meta: { title: "价格管理" },
    component: () => import("../views/PriceManage")
  },
  {
    path: "/group",
    name: "Group",
    meta: { title: "设备管理" },
    component: () => import("../views/Group")
  },
  {
    path: "/houseManage",
    name: "HouseManage",
    meta: { title: "房源管理" },
    component: () => import("../views/HouseManage")
  }
];

export let routersList = [
  {
    path: "/pay",
    name: "Pay",
    meta: { title: "用户缴费" },
    component: () => import("../views/Pay")
  },
  {
    path: "/bill",
    name: "Bill",
    meta: { title: "费用统计" },
    redirect: "/bill/userBill",
    component: () => import("../views/Bill"),
    children: [
      {
        path: "/bill/userBill",
        name: "UserBill",
        meta: { title: "用户账单" },
        component: () => import("../views/Bill/UserBill")
      }
    ]
  }
];

if (userInfo && userInfo.role === 1) {
  routersList.push(...routerMap);
}

export const RouterList = routersList;

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout"),
    children: RouterList,
    redirect: "/pay"
  },
  {
    path: "/login",
    component: () => import("../views/Login")
  },
  {
    path: "*",
    component: () => import("../views/404")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/pay") {
    if (getStore("token")) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
