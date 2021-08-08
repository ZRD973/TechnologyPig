import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/mybutton",
    name: "MyButton",
    component: () => import("../components/myButton/Father.vue"),
  },
  {
    path: "/tab",
    name: "Tab",
    component: () => import("../components/tabControl/index.vue"),
  },
  {
    path: "/advanced",
    name: "Advanced",
    component: () => import("../components/advanced-search/demo.vue"),
  },
  {
    path: "/createVue",
    name: "CreateVue",
    component: () => import("../views/createVue.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
