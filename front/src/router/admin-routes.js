import { session } from "@/utils/utils";

export default [
    {
        path: "pay",
        name: "AdminPay",
        component: () => import("@/views/zhifu/zhifu.vue"),
        meta: { authLogin: true },
    },

    {
        path: "admins",
        name: "AdminadminsList",
        component: () => import("@/views/admins/list.vue"),
        meta: { title: "管理员列表", authLogin: true },
    },

    {
        path: "admins/add",
        name: "AdminadminsAdd",
        component: () => import("@/views/admins/add.vue"),
        meta: { title: "添加管理员", authLogin: true },
    },
    {
        path: "admins/updt",
        name: "AdminadminsUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/admins/updt.vue"),
        meta: { title: "编辑管理员", authLogin: true },
    },
    {
        path: "admins/updtself",
        name: "AdminadminsUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/admins/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "user1",
        name: "Adminuser1List",
        component: () => import("@/views/user1/list.vue"),
        meta: { title: "用户列表", authLogin: true },
    },

    {
        path: "user1/add",
        name: "Adminuser1Add",
        component: () => import("@/views/user1/add.vue"),
        meta: { title: "添加用户", authLogin: true },
    },
    {
        path: "user1/updt",
        name: "Adminuser1Updt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/user1/updt.vue"),
        meta: { title: "编辑用户", authLogin: true },
    },
    {
        path: "user1/updtself",
        name: "Adminuser1UpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/user1/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "user1/detail",
        props: (route) => ({ id: route.query.id }),
        name: "Adminuser1Detail",
        component: () => import("@/views/user1/detail.vue"),
        meta: { title: "用户详情", authLogin: true },
    },
    {
        path: "classification",
        name: "AdminclassificationList",
        component: () => import("@/views/classification/list.vue"),
        meta: { title: "资讯分类列表", authLogin: true },
    },

    {
        path: "classification/add",
        name: "AdminclassificationAdd",
        component: () => import("@/views/classification/add.vue"),
        meta: { title: "添加资讯分类", authLogin: true },
    },
    {
        path: "classification/updt",
        name: "AdminclassificationUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/classification/updt.vue"),
        meta: { title: "编辑资讯分类", authLogin: true },
    },
    {
        path: "petlnformation",
        name: "AdminpetlnformationList",
        component: () => import("@/views/petlnformation/list.vue"),
        meta: { title: "宠物资讯列表", authLogin: true },
    },

    {
        path: "petlnformation/publisher",
        name: "AdminpetlnformationListpublisher",
        component: () => import("@/views/petlnformation/publisher.vue"),
        meta: { title: "宠物资讯列表", authLogin: true },
    },

    {
        path: "petlnformation/add",
        name: "AdminpetlnformationAdd",
        component: () => import("@/views/petlnformation/add.vue"),
        meta: { title: "添加宠物资讯", authLogin: true },
    },
    {
        path: "petlnformation/updt",
        name: "AdminpetlnformationUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/petlnformation/updt.vue"),
        meta: { title: "编辑宠物资讯", authLogin: true },
    },
    {
        path: "petlnformation/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminpetlnformationDetail",
        component: () => import("@/views/petlnformation/detail.vue"),
        meta: { title: "宠物资讯详情", authLogin: true },
    },
    {
        path: "link",
        name: "AdminlinkList",
        component: () => import("@/views/link/list.vue"),
        meta: { title: "友情链接列表", authLogin: true },
    },

    {
        path: "link/add",
        name: "AdminlinkAdd",
        component: () => import("@/views/link/add.vue"),
        meta: { title: "添加友情链接", authLogin: true },
    },
    {
        path: "link/updt",
        name: "AdminlinkUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/link/updt.vue"),
        meta: { title: "编辑友情链接", authLogin: true },
    },
    {
        path: "float1",
        name: "Adminfloat1List",
        component: () => import("@/views/float1/list.vue"),
        meta: { title: "轮播图列表", authLogin: true },
    },

    {
        path: "float1/add",
        name: "Adminfloat1Add",
        component: () => import("@/views/float1/add.vue"),
        meta: { title: "添加轮播图", authLogin: true },
    },
    {
        path: "float1/updt",
        name: "Adminfloat1Updt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/float1/updt.vue"),
        meta: { title: "编辑轮播图", authLogin: true },
    },
    {
        path: "staff",
        name: "AdminstaffList",
        component: () => import("@/views/staff/list.vue"),
        meta: { title: "员工列表", authLogin: true },
    },

    {
        path: "staff/add",
        name: "AdminstaffAdd",
        component: () => import("@/views/staff/add.vue"),
        meta: { title: "添加员工", authLogin: true },
    },
    {
        path: "staff/updt",
        name: "AdminstaffUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/staff/updt.vue"),
        meta: { title: "编辑员工", authLogin: true },
    },
    {
        path: "staff/updtself",
        name: "AdminstaffUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/staff/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "staff/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminstaffDetail",
        component: () => import("@/views/staff/detail.vue"),
        meta: { title: "员工详情", authLogin: true },
    },
    {
        path: "pet",
        name: "AdminpetList",
        component: () => import("@/views/pet/list.vue"),
        meta: { title: "宠物信息列表", authLogin: true },
    },

    {
        path: "pet/people",
        name: "AdminpetListpeople",
        component: () => import("@/views/pet/people.vue"),
        meta: { title: "宠物信息列表", authLogin: true },
    },

    {
        path: "pet/add",
        name: "AdminpetAdd",
        component: () => import("@/views/pet/add.vue"),
        meta: { title: "添加宠物信息", authLogin: true },
    },
    {
        path: "pet/updt",
        name: "AdminpetUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/pet/updt.vue"),
        meta: { title: "编辑宠物信息", authLogin: true },
    },
    {
        path: "pet/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminpetDetail",
        component: () => import("@/views/pet/detail.vue"),
        meta: { title: "宠物信息详情", authLogin: true },
    },
    {
        path: "classifications",
        name: "AdminclassificationsList",
        component: () => import("@/views/classifications/list.vue"),
        meta: { title: "商品分类列表", authLogin: true },
    },

    {
        path: "classifications/add",
        name: "AdminclassificationsAdd",
        component: () => import("@/views/classifications/add.vue"),
        meta: { title: "添加商品分类", authLogin: true },
    },
    {
        path: "classifications/updt",
        name: "AdminclassificationsUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/classifications/updt.vue"),
        meta: { title: "编辑商品分类", authLogin: true },
    },
    {
        path: "goods",
        name: "AdmingoodsList",
        component: () => import("@/views/goods/list.vue"),
        meta: { title: "商品信息列表", authLogin: true },
    },

    {
        path: "goods/add",
        name: "AdmingoodsAdd",
        component: () => import("@/views/goods/add.vue"),
        meta: { title: "添加商品信息", authLogin: true },
    },
    {
        path: "goods/updt",
        name: "AdmingoodsUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/goods/updt.vue"),
        meta: { title: "编辑商品信息", authLogin: true },
    },
    {
        path: "goods/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmingoodsDetail",
        component: () => import("@/views/goods/detail.vue"),
        meta: { title: "商品信息详情", authLogin: true },
    },
    {
        path: "shoppingcart",
        name: "AdminshoppingcartList",
        component: () => import("@/views/shoppingcart/list.vue"),
        meta: { title: "购物车列表", authLogin: true },
    },

    {
        path: "shoppingcart/userss",
        name: "AdminshoppingcartListuserss",
        component: () => import("@/views/shoppingcart/userss.vue"),
        meta: { title: "购物车列表", authLogin: true },
    },

    {
        path: "shoppingcart/add",
        name: "AdminshoppingcartAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shoppingcart/add.vue"),
        meta: { title: "添加购物车", authLogin: true },
    },
    {
        path: "shoppingcart/updt",
        name: "AdminshoppingcartUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shoppingcart/updt.vue"),
        meta: { title: "编辑购物车", authLogin: true },
    },
    {
        path: "shoppingcart/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminshoppingcartDetail",
        component: () => import("@/views/shoppingcart/detail.vue"),
        meta: { title: "购物车详情", authLogin: true },
    },
    {
        path: "progress",
        name: "AdminprogressList",
        component: () => import("@/views/progress/list.vue"),
        meta: { title: "订单列表", authLogin: true },
    },

    {
        path: "progress/userss",
        name: "AdminprogressListuserss",
        component: () => import("@/views/progress/userss.vue"),
        meta: { title: "订单列表", authLogin: true },
    },

    {
        path: "progress/add",
        name: "AdminprogressAdd",
        component: () => import("@/views/progress/add.vue"),
        meta: { title: "添加订单", authLogin: true },
    },
    {
        path: "progress/updt",
        name: "AdminprogressUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/progress/updt.vue"),
        meta: { title: "编辑订单", authLogin: true },
    },
    {
        path: "progress/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminprogressDetail",
        component: () => import("@/views/progress/detail.vue"),
        meta: { title: "订单详情", authLogin: true },
    },
    {
        path: "shipment",
        name: "AdminshipmentList",
        component: () => import("@/views/shipment/list.vue"),
        meta: { title: "订单发货列表", authLogin: true },
    },

    {
        path: "shipment/userss",
        name: "AdminshipmentListuserss",
        component: () => import("@/views/shipment/userss.vue"),
        meta: { title: "订单发货列表", authLogin: true },
    },

    {
        path: "shipment/add",
        name: "AdminshipmentAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shipment/add.vue"),
        meta: { title: "添加订单发货", authLogin: true },
    },
    {
        path: "shipment/updt",
        name: "AdminshipmentUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shipment/updt.vue"),
        meta: { title: "编辑订单发货", authLogin: true },
    },
    {
        path: "shipment/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminshipmentDetail",
        component: () => import("@/views/shipment/detail.vue"),
        meta: { title: "订单发货详情", authLogin: true },
    },
    {
        path: "signfor",
        name: "AdminsignforList",
        component: () => import("@/views/signfor/list.vue"),
        meta: { title: "订单签收列表", authLogin: true },
    },

    {
        path: "signfor/userss",
        name: "AdminsignforListuserss",
        component: () => import("@/views/signfor/userss.vue"),
        meta: { title: "订单签收列表", authLogin: true },
    },

    {
        path: "signfor/add",
        name: "AdminsignforAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/signfor/add.vue"),
        meta: { title: "添加订单签收", authLogin: true },
    },
    {
        path: "signfor/updt",
        name: "AdminsignforUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/signfor/updt.vue"),
        meta: { title: "编辑订单签收", authLogin: true },
    },
    {
        path: "signfor/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminsignforDetail",
        component: () => import("@/views/signfor/detail.vue"),
        meta: { title: "订单签收详情", authLogin: true },
    },
    {
        path: "cancel",
        name: "AdmincancelList",
        component: () => import("@/views/cancel/list.vue"),
        meta: { title: "取消订单列表", authLogin: true },
    },

    {
        path: "cancel/userss",
        name: "AdmincancelListuserss",
        component: () => import("@/views/cancel/userss.vue"),
        meta: { title: "取消订单列表", authLogin: true },
    },

    {
        path: "cancel/add",
        name: "AdmincancelAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/cancel/add.vue"),
        meta: { title: "添加取消订单", authLogin: true },
    },
    {
        path: "cancel/updt",
        name: "AdmincancelUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/cancel/updt.vue"),
        meta: { title: "编辑取消订单", authLogin: true },
    },
    {
        path: "cancel/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmincancelDetail",
        component: () => import("@/views/cancel/detail.vue"),
        meta: { title: "取消订单详情", authLogin: true },
    },
    {
        path: "services",
        name: "AdminservicesList",
        component: () => import("@/views/services/list.vue"),
        meta: { title: "宠物服务列表", authLogin: true },
    },

    {
        path: "services/add",
        name: "AdminservicesAdd",
        component: () => import("@/views/services/add.vue"),
        meta: { title: "添加宠物服务", authLogin: true },
    },
    {
        path: "services/updt",
        name: "AdminservicesUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/services/updt.vue"),
        meta: { title: "编辑宠物服务", authLogin: true },
    },
    {
        path: "services/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminservicesDetail",
        component: () => import("@/views/services/detail.vue"),
        meta: { title: "宠物服务详情", authLogin: true },
    },
    {
        path: "reservation",
        name: "AdminreservationList",
        component: () => import("@/views/reservation/list.vue"),
        meta: { title: "服务预约列表", authLogin: true },
    },

    {
        path: "reservation/userss",
        name: "AdminreservationListuserss",
        component: () => import("@/views/reservation/userss.vue"),
        meta: { title: "服务预约列表", authLogin: true },
    },

    {
        path: "reservation/add",
        name: "AdminreservationAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/reservation/add.vue"),
        meta: { title: "添加服务预约", authLogin: true },
    },
    {
        path: "reservation/updt",
        name: "AdminreservationUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/reservation/updt.vue"),
        meta: { title: "编辑服务预约", authLogin: true },
    },
    {
        path: "reservation/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminreservationDetail",
        component: () => import("@/views/reservation/detail.vue"),
        meta: { title: "服务预约详情", authLogin: true },
    },
    {
        path: "arrange",
        name: "AdminarrangeList",
        component: () => import("@/views/arrange/list.vue"),
        meta: { title: "服务安排列表", authLogin: true },
    },

    {
        path: "arrange/userss",
        name: "AdminarrangeListuserss",
        component: () => import("@/views/arrange/userss.vue"),
        meta: { title: "服务安排列表", authLogin: true },
    },

    {
        path: "arrange/add",
        name: "AdminarrangeAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/arrange/add.vue"),
        meta: { title: "添加服务安排", authLogin: true },
    },
    {
        path: "arrange/updt",
        name: "AdminarrangeUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/arrange/updt.vue"),
        meta: { title: "编辑服务安排", authLogin: true },
    },
    {
        path: "arrange/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminarrangeDetail",
        component: () => import("@/views/arrange/detail.vue"),
        meta: { title: "服务安排详情", authLogin: true },
    },
    {
        path: "stores",
        name: "AdminstoresList",
        component: () => import("@/views/stores/list.vue"),
        meta: { title: "用品入库列表", authLogin: true },
    },

    {
        path: "stores/handler",
        name: "AdminstoresListhandler",
        component: () => import("@/views/stores/handler.vue"),
        meta: { title: "用品入库列表", authLogin: true },
    },

    {
        path: "stores/add",
        name: "AdminstoresAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/stores/add.vue"),
        meta: { title: "添加用品入库", authLogin: true },
    },
    {
        path: "stores/updt",
        name: "AdminstoresUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/stores/updt.vue"),
        meta: { title: "编辑用品入库", authLogin: true },
    },
    {
        path: "stores/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminstoresDetail",
        component: () => import("@/views/stores/detail.vue"),
        meta: { title: "用品入库详情", authLogin: true },
    },
    {
        path: "outbound",
        name: "AdminoutboundList",
        component: () => import("@/views/outbound/list.vue"),
        meta: { title: "用品出库列表", authLogin: true },
    },

    {
        path: "outbound/handler",
        name: "AdminoutboundListhandler",
        component: () => import("@/views/outbound/handler.vue"),
        meta: { title: "用品出库列表", authLogin: true },
    },

    {
        path: "outbound/add",
        name: "AdminoutboundAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/outbound/add.vue"),
        meta: { title: "添加用品出库", authLogin: true },
    },
    {
        path: "outbound/updt",
        name: "AdminoutboundUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/outbound/updt.vue"),
        meta: { title: "编辑用品出库", authLogin: true },
    },
    {
        path: "outbound/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminoutboundDetail",
        component: () => import("@/views/outbound/detail.vue"),
        meta: { title: "用品出库详情", authLogin: true },
    },

    {
        path: "yongpinxiaoshoutongji",
        name: "Pageyongpinxiaoshoutongji",
        component: () => import("@/views/yongpinxiaoshoutongji.vue"),
        meta: { title: "用品销售统计", authLogin: true },
    },
    {
        path: "fuwuyuyuetongji",
        name: "Pagefuwuyuyuetongji",
        component: () => import("@/views/fuwuyuyuetongji.vue"),
        meta: { title: "服务预约统计", authLogin: true },
    },
];
