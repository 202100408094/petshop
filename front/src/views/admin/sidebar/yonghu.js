export default [
    {
        label: "宠物信息",
        to: "",
        children: [
            {
                label: "宠物信息添加",
                to: { path: "/admin/pet/add" },
            },
            {
                label: "宠物信息查询",
                to: { path: "/admin/pet/people" },
            },
        ],
    },
    {
        label: "用品订单",
        to: "",
        children: [
            {
                label: "用品订单查询",
                to: { path: "/admin/progress/userss" },
            },
            {
                label: "订单取消查询",
                to: { path: "/admin/cancel/userss" },
            },
            {
                label: "订单发货查询",
                to: { path: "/admin/shipment/userss" },
            },
            {
                label: "订单签收查询",
                to: { path: "/admin/signfor/userss" },
            },
        ],
    },
    {
        label: "宠物服务",
        to: "",
        children: [
            {
                label: "服务预约查询",
                to: { path: "/admin/reservation/userss" },
            },
        ],
    },
    {
        label: "个人中心",
        to: "",
        children: [
            {
                label: "修改个人资料",
                to: { path: "/admin/user1/updtself" },
            },
            {
                label: "修改密码",
                to: { path: "/admin/mod" },
            },
        ],
    },
];
