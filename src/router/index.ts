import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getRouter } from "../http/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "order", //了解一下这个属性
      // children: [
      //   {
      //     path: "order",
      //     name: "order",
      //     meta: {
      //       isShow: true,
      //       title: "订单列表",
      //     },
      //     component: () => import("../views/OrderView.vue"),
      //   },
      //   {
      //     path: "userList",
      //     name: "userList",
      //     meta: {
      //       isShow: true,
      //       title: "用户列表",
      //     },
      //     component: () => import("../views/UserView.vue"),
      //   },
      //   {
      //     path: "roleList",
      //     name: "roleList",
      //     meta: {
      //       isShow: true,
      //       title: "角色列表",
      //     },
      //     component: () => import("../views/RoleView.vue"),
      //   },
      //   {
      //     path: "authority",
      //     name: "authority",
      //     meta: {
      //       isShow: false,
      //       title: "权限列表",
      //     },
      //     component: () => import("../views/AuthorityView.vue"),
      //   },
      // ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

//路由拦截
router.beforeEach(async (to) => {
  //如果没有登录则只能进入登录页面
  let token: string | null = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    return "/login";
  } else if (to.path !== "login" && token) {
    if (router.getRoutes().length === 3) {
      //动态添加路由
      let routerData = await getRouter(); //同步语法糖看一下
      routerData = routerData.data;
      routerData.forEach((v: any) => {
        let routerObj: RouteRecordRaw = {
          path: v.name,
          name: v.name,
          meta: v.meta,
          component: () =>
            import(/* webpackChunkName: "[request]"*/ `../views/${v.path}.vue`), //这个注释看一下
        };
        router.addRoute("home", routerObj);
      });
    }
    router.replace(to.path); //看一下这个
  } else if (to.path === "/login" && token) {
    return "/";
  }
});

export default router;
