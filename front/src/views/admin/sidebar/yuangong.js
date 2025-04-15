export default [
    {
        label: "宠物用品",
        to: "",
        children: [
            {
                label: "宠物用品查询",
                to: { path: "/admin/goods" },
            },
        ],
    },
    {
        label: "用品入库",
        to: "",
        children: [
            {
                label: "用品入库记录",
                to: { path: "/admin/stores" },
            },
        ],
    },
    {
        label: "用品出库",
        to: "",
        children: [
            {
                label: "用品出库记录",
                to: { path: "/admin/outbound" },
            },
        ],
    },
    {
        label: "宠物服务",
        to: "",
        children: [
            {
                label: "服务预约查询",
                to: { path: "/admin/reservation" },
            },
        ],
    },
    {
        label: "个人中心",
        to: "",
        children: [
            {
                label: "修改个人资料",
                to: { path: "/admin/staff/updtself" },
            },
            {
                label: "修改密码",
                to: { path: "/admin/mod" },
            },
        ],
    },
];
