import { session } from "@/utils/utils";
export default [
    {
        path: "pay",
        name: "WebPay",
        component: () => import("@/views/zhifu/zhifu.vue"),
        meta: { authLogin: true },
    },
    {
        path: "user1/add",
        name: "Indexuser1Add",
        component: () => import("@/views/user1/add-web.vue"),
        meta: { title: "用户添加" },
    },
    {
        path: "petlnformation",
        name: "IndexpetlnformationList",
        component: () => import("@/views/petlnformation/index.vue"),
        meta: { title: "宠物资讯列表" },
    },
    {
        path: "petlnformation/detail",
        name: "IndexpetlnformationDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/petlnformation/detail-web.vue"),
        meta: { title: "宠物资讯详情" },
    },
    {
        path: "goods",
        name: "IndexgoodsList",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "商品信息列表" },
    },
    {
        path: "goods/detail",
        name: "IndexgoodsDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/goods/detail-web.vue"),
        meta: { title: "商品信息详情" },
    },
    {
        path: "shoppingcart",
        name: "IndexshoppingcartList",
        component: () => import("@/views/shoppingcart/index.vue"),
        meta: { title: "购物车列表", authLogin: true, msg: true },
    },
    {
        path: "shoppingcart/add",
        name: "IndexshoppingcartAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shoppingcart/add-web.vue"),
        meta: { title: "购物车添加", authLogin: true, msg: true },
    },
    {
        path: "progress/add",
        name: "IndexprogressAdd",
        component: () => import("@/views/progress/add-web.vue"),
        meta: { title: "订单添加", authLogin: true, msg: true },
    },
    {
        path: "services",
        name: "IndexservicesList",
        component: () => import("@/views/services/index.vue"),
        meta: { title: "宠物服务列表" },
    },
    {
        path: "services/detail",
        name: "IndexservicesDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/services/detail-web.vue"),
        meta: { title: "宠物服务详情" },
    },
    {
        path: "reservation/add",
        name: "IndexreservationAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/reservation/add-web.vue"),
        meta: { title: "服务预约添加", authLogin: true, msg: true },
    },
];
