import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "NFTList",
    component: () => import("../views/NFTList.vue"),
    meta: {
      withAuth: true,
    },
  },
  {
    path: "/nft/add",
    name: "NFTAdd",
    component: () => import("../views/NFTAdd.vue"),
    meta: {
      withAuth: true,
    },
  },
  {
    path: "/nft/edit/:nftId",
    name: "NFTEdit",
    component: () => import("../views/NFTEdit.vue"),
    meta: {
      withAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
