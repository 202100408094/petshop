export default [
    {
        label: "账号管理",
        to: "",
        children: [
            {
                label: "管理员账号管理",
                to: { path: "/admin/admins" },
            },
            {
                label: "管理员账号添加",
                to: { path: "/admin/admins/add" },
            },
            {
                label: "密码修改",
                to: { path: "/admin/mod" },
            },
        ],
    },
    {
        label: "用户管理",
        to: "",
        children: [
            {
                label: "用户添加",
                to: { path: "/admin/user1/add" },
            },
            {
                label: "用户查询",
                to: { path: "/admin/user1" },
            },
        ],
    },
    {
        label: "员工管理",
        to: "",
        children: [
            {
                label: "员工添加",
                to: { path: "/admin/staff/add" },
            },
            {
                label: "员工查询",
                to: { path: "/admin/staff" },
            },
        ],
    },
    {
        label: "用品分类管理",
        to: "",
        children: [
            {
                label: "用品分类添加",
                to: { path: "/admin/classifications/add" },
            },
            {
                label: "用品分类查询",
                to: { path: "/admin/classifications" },
            },
        ],
    },
    {
        label: "宠物用品管理",
        to: "",
        children: [
            {
                label: "宠物用品添加",
                to: { path: "/admin/goods/add" },
            },
            {
                label: "宠物用品查询",
                to: { path: "/admin/goods" },
            },
            {
                label: "用品入库查询",
                to: { path: "/admin/stores" },
            },
            {
                label: "用品出库查询",
                to: { path: "/admin/outbound" },
            },
        ],
    },
    {
        label: "宠物服务管理",
        to: "",
        children: [
            {
                label: "宠物服务添加",
                to: { path: "/admin/services/add" },
            },
            {
                label: "宠物服务查询",
                to: { path: "/admin/services" },
            },
        ],
    },
    {
        label: "用品订单管理",
        to: "",
        children: [
            {
                label: "用品订单查询",
                to: { path: "/admin/progress" },
            },
            {
                label: "取消订单查询",
                to: { path: "/admin/cancel" },
            },
            {
                label: "订单发货查询",
                to: { path: "/admin/shipment" },
            },
            {
                label: "订单签收查询",
                to: { path: "/admin/signfor" },
            },
        ],
    },
    {
        label: "服务预约管理",
        to: "",
        children: [
            {
                label: "服务预约查询",
                to: { path: "/admin/reservation" },
            },
            {
                label: "服务安排查询",
                to: { path: "/admin/arrange" },
            },
        ],
    },
    {
        label: "宠物资讯管理",
        to: "",
        children: [
            {
                label: "分类添加",
                to: { path: "/admin/classification/add" },
            },
            {
                label: "分类查询",
                to: { path: "/admin/classification" },
            },
            {
                label: "资讯添加",
                to: { path: "/admin/petlnformation/add" },
            },
            {
                label: "资讯查询",
                to: { path: "/admin/petlnformation" },
            },
        ],
    },
    {
        label: "数据分析报表",
        to: "",
        children: [
            {
                label: "用品销售统计",
                to: { path: "/admin/yongpinxiaoshoutongji" },
            },
            {
                label: "服务预约统计",
                to: { path: "/admin/fuwuyuyuetongji" },
            },
        ],
    },
    {
        label: "系统管理",
        to: "",
        children: [
            {
                label: "友情链接添加",
                to: { path: "/admin/link/add" },
            },
            {
                label: "友情链接查询",
                to: { path: "/admin/link" },
            },
            {
                label: "轮播图添加",
                to: { path: "/admin/float1/add" },
            },
            {
                label: "轮播图查询",
                to: { path: "/admin/float1" },
            },
        ],
    },
];
