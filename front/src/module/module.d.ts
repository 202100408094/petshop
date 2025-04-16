
declare interface EModuleForm<T>{
    form:T;
}

declare interface EModuleReadForm<T,R>{
    form:T;
    readMap:R;
}



declare interface EAdmins {
    // 帐号 。
    username?:string;
    // 密码 。
    pwd?:string;
        
}

declare type EAdminsForm = EModuleForm<EAdmins>;
declare interface EUser1 {
    // 用户名 。
    username?:string;
    // 密码 。
    password?:string;
    // 姓名 。
    name?:string;
    // 性别 。
    xingbie?:string;
    // 手机 。
    gender?:string;
    // 邮箱 。
    email?:string;
    // 简介 。
    brief?:string;
    // 头像 。
    profile?:string;
        
}

declare type EUser1Form = EModuleForm<EUser1>;
declare interface EClassification {
    // 分类名称 。
    names?:string;
        
}

declare type EClassificationForm = EModuleForm<EClassification>;
declare interface EPetlnformation {
    // 标题 。
    title?:string;
    // 分类 。
    classification?:number;
    // 内容 。
    content?:string;
    // 发布人 。
    publisher?:string;
    // 点击率 。
    rate?:number;
    // 发布时间 。
    addtime?:string;
        
}

declare type EPetlnformationForm = EModuleForm<EPetlnformation>;
declare interface ELink {
    // 网站名称 。
    names?:string;
    // 网址 。
    url?:string;
        
}

declare type ELinkForm = EModuleForm<ELink>;
declare interface EFloat1 {
    // 标题 。
    title?:string;
    // 图片 。
    image?:string;
    // 连接地址 。
    url?:string;
        
}

declare type EFloat1Form = EModuleForm<EFloat1>;
declare interface EStaff {
    // 工号 。
    number1?:string;
    // 密码 。
    password?:string;
    // 姓名 。
    names?:string;
    // 性别 。
    gender?:string;
    // 联系电话 。
    phone?:string;
    // 入职日期 。
    date?:string;
    // 简介 。
    introduction?:string;
    // 头像 。
    picture?:string;
        
}

declare type EStaffForm = EModuleForm<EStaff>;
declare interface EPet {
    // 宠物编号 。
    numbers?:string;
    // 宠物名称 。
    names?:string;
    // 宠物类别 。
    category?:string;
    // 宠物性别 。
    gender?:string;
    // 年龄 。
    age?:string;
    // 生活习惯 。
    habit?:string;
    // 宠物简介 。
    introduction?:string;
    // 添加人 。
    people?:string;
    // 添加时间 。
    addtime?:string;
        
}

declare type EPetForm = EModuleForm<EPet>;
declare interface EClassifications {
    // 分类名称 。
    names?:string;
        
}

declare type EClassificationsForm = EModuleForm<EClassifications>;
declare interface EGoods {
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 商品库存 。
    inventory?:number;
    // 商品销量 。
    volume?:number;
    // 商品详情 。
    details?:string;
    // 添加时间 。
    addtime?:string;
            // 购物车的数量。
    shoppingcartCount?:number;
    // 用品入库的数量。
    storesCount?:number;
    // 用品出库的数量。
    outboundCount?:number;

}

declare type EGoodsForm = EModuleForm<EGoods>;
declare interface EShoppingcart {
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 购买数量 。
    quantity?:number;
    // 小计 。
    subtotal?:number;
    // 购买用户 。
    userss?:string;
    // 添加时间 。
    addtime?:string;
        
}

declare type EShoppingcartForm = EModuleReadForm<EShoppingcart,EGoods>;
declare interface EProgress {
    // 订单号 。
    orders?:string;
    // 商品信息 。
    merchbill?:string;
    // 订单金额 。
    money?:number;
    // 收货地址 。
    address?:string;
    // 联系电话 。
    phone?:string;
    // 收货人姓名 。
    fullname?:string;
    // 备注 。
    notes?:string;
    // 下单用户 。
    userss?:string;
    // 订单状态 。
    state?:string;
    // 下单时间 。
    addtime?:string;
        iszf?:string;
    // 订单发货的数量。
    shipmentCount?:number;
    // 订单签收的数量。
    signforCount?:number;
    // 取消订单的数量。
    cancelCount?:number;

}

declare type EProgressForm = EModuleForm<EProgress>;
declare interface EShipment {
    // 订单id 。
    progressid?:number;
    // 订单号 。
    orders?:string;
    // 商品信息 。
    merchbill?:string;
    // 订单金额 。
    money?:number;
    // 收货地址 。
    address?:string;
    // 联系电话 。
    phone?:string;
    // 收货人姓名 。
    fullname?:string;
    // 下单用户 。
    userss?:string;
    // 物流公司 。
    company?:string;
    // 物流单号 。
    numbers?:string;
    // 添加时间 。
    addtime?:string;
        
}

declare type EShipmentForm = EModuleReadForm<EShipment,EProgress>;
declare interface ESignfor {
    // 订单id 。
    progressid?:number;
    // 订单号 。
    orders?:string;
    // 商品信息 。
    merchbill?:string;
    // 订单金额 。
    money?:number;
    // 收货地址 。
    address?:string;
    // 联系电话 。
    phone?:string;
    // 收货人姓名 。
    fullname?:string;
    // 下单用户 。
    userss?:string;
    // 签收备注 。
    notes?:string;
    // 签收时间 。
    addtime?:string;
        
}

declare type ESignforForm = EModuleReadForm<ESignfor,EProgress>;
declare interface ECancel {
    // 订单id 。
    progressid?:number;
    // 订单号 。
    orders?:string;
    // 商品信息 。
    merchbill?:string;
    // 订单金额 。
    money?:number;
    // 收货地址 。
    address?:string;
    // 联系电话 。
    phone?:string;
    // 收货人姓名 。
    fullname?:string;
    // 下单用户 。
    userss?:string;
    // 取消原因 。
    reason?:string;
    // 取消时间 。
    addtime?:string;
        
}

declare type ECancelForm = EModuleReadForm<ECancel,EProgress>;
declare interface EServices {
    // 编号 。
    numbers?:string;
    // 标题 。
    title?:string;
    // 类型 。
    type?:string;
    // 图片 。
    picture?:string;
    // 价格 。
    price?:number;
    // 要求 。
    requires?:string;
    // 内容 。
    content?:string;
    // 发布时间 。
    addtime?:string;
            // 服务预约的数量。
    reservationCount?:number;

}

declare type EServicesForm = EModuleForm<EServices>;
declare interface EReservation {
    // 宠物服务id 。
    servicesid?:number;
    // 标题 。
    title?:string;
    // 编号 。
    numbers?:string;
    // 类型 。
    type?:string;
    // 价格 。
    price?:number;
    // 预约单号 。
    numberss?:string;
    // 联系电话 。
    phone?:string;
    // 预约备注 。
    notes?:string;
    // 预约用户 。
    userss?:string;
    // 预约时间 。
    addtime?:string;
    // 状态 。
    state?:string;
    // 工号 。
    number1?:string;
    // 姓名 。
    names?:string;
    // 安排日期 。
    date?:string;
        iszf?:string;
    // 服务安排的数量。
    arrangeCount?:number;

}

declare type EReservationForm = EModuleReadForm<EReservation,EServices>;
declare interface EArrange {
    // 服务预约id 。
    reservationid?:number;
    // 标题 。
    title?:string;
    // 编号 。
    numbers?:string;
    // 类型 。
    type?:string;
    // 价格 。
    price?:number;
    // 预约单号 。
    numberss?:string;
    // 预约用户 。
    userss?:string;
    // 安排时间 。
    times?:string;
    // 服务人员 。
    staff?:number;
    // 工号 。
    number1?:string;
    // 姓名 。
    names?:string;
    // 备注 。
    notes?:string;
        
}

declare type EArrangeForm = EModuleReadForm<EArrange,EReservation>;
declare interface EStores {
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 入库编号 。
    numbers1?:string;
    // 入库价格 。
    price?:number;
    // 入库数量 。
    quantity?:number;
    // 入库小计 。
    subtotal?:number;
    // 入库备注 。
    notes?:string;
    // 经手人 。
    handler?:string;
    // 入库时间 。
    addtime?:string;
        
}

declare type EStoresForm = EModuleReadForm<EStores,EGoods>;
declare interface EOutbound {
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品价格 。
    price?:number;
    // 出库编号 。
    numbers1?:string;
    // 出库数量 。
    quantity?:number;
    // 出库小计 。
    subtotal?:number;
    // 出库说明 。
    describes?:string;
    // 经手人 。
    handler?:string;
    // 出库时间 。
    addtime?:string;
        
}

declare type EOutboundForm = EModuleReadForm<EOutbound,EGoods>;
declare interface ECancelmerchbill {
    // 取消订单id 。
    cancelid?:number;
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 购买数量 。
    quantity?:number;
    // 小计 。
    subtotal?:number;
    // 购买用户 。
    userss?:string;
        
}

declare type ECancelmerchbillForm = EModuleForm<ECancelmerchbill>;
declare interface EProgressmerchbill {
    // 订单id 。
    progressid?:number;
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 购买数量 。
    quantity?:number;
    // 小计 。
    subtotal?:number;
    // 购买用户 。
    userss?:string;
        
}

declare type EProgressmerchbillForm = EModuleForm<EProgressmerchbill>;
declare interface EShipmentmerchbill {
    // 订单发货id 。
    shipmentid?:number;
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 购买数量 。
    quantity?:number;
    // 小计 。
    subtotal?:number;
    // 购买用户 。
    userss?:string;
        
}

declare type EShipmentmerchbillForm = EModuleForm<EShipmentmerchbill>;
declare interface ESignformerchbill {
    // 订单签收id 。
    signforid?:number;
    // 商品信息id 。
    goodsid?:number;
    // 商品编号 。
    numbers?:string;
    // 商品名称 。
    names?:string;
    // 分类 。
    ification?:number;
    // 商品图片 。
    picture?:string;
    // 商品价格 。
    price?:number;
    // 购买数量 。
    quantity?:number;
    // 小计 。
    subtotal?:number;
    // 购买用户 。
    userss?:string;
        
}

declare type ESignformerchbillForm = EModuleForm<ESignformerchbill>;


declare interface EResponseData<T>{
    // 为0 表示成功，其他表示错误码
    code:number;
    // 错误信息
    msg:string;
    // 数据
    data:T;
}
