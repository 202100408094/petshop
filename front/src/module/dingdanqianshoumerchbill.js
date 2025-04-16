import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

/**
 * 响应式的对象数据
 * @return {EDingdanqianshoumerchbill}
 */

export const DingdanqianshoumerchbillCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        numbers: "",
        names: "",
        ification: "",
        picture: "",
        price: "",
        quantity: "",
        userss: $session.username,
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EDingdanqianshoumerchbillForm>}
 */
export const canDingdanqianshoumerchbillCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = DingdanqianshoumerchbillCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取订单签收商品信息 模块的表单字段数据
 * @return {EDingdanqianshoumerchbillForm}
 */
export const useDingdanqianshoumerchbillCreateForm = () => {
    const form = DingdanqianshoumerchbillCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canDingdanqianshoumerchbillSelect = (filter, result) => {
    http.post("/api/dingdanqianshoumerchbill/selectPages").then((res) => {
        if (res.code == 0) {
            extend(result, res.data);
        } else {
            ElMessageBox.alert(res.msg);
        }
    });
};

/**
 * 获取分页数据
 * @param filter
 */
export const useDingdanqianshoumerchbillSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canDingdanqianshoumerchbillSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EDingdanqianshoumerchbill>}
 */
export const canDingdanqianshoumerchbillFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/dingdanqianshoumerchbill/findById", { id }).then((res) => {
            if (res.code == 0) {
                resolve(res.data);
            } else {
                reject(new Error(res.msg));
            }
        }, reject);
    });
};

/**
 * 根据id 获取一行数据
 * @param id
 * @return {EDingdanqianshoumerchbill}
 */
export const useDingdanqianshoumerchbillFindById = (id) => {
    var form = reactive({});

    canDingdanqianshoumerchbillFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EDingdanqianshoumerchbill} data
 * @return {Promise<EResponseData<EDingdanqianshoumerchbill>>}
 */
export const canDingdanqianshoumerchbillInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/dingdanqianshoumerchbill/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("dingdanqianshoumerchbill_insert", res.data);
                        event.emit("dingdanqianshoumerchbill_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据数据更新数据库
 * @param {EDingdanqianshoumerchbill} data
 * @return {Promise<EResponseData<EDingdanqianshoumerchbill>>}
 */
export const canDingdanqianshoumerchbillUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/dingdanqianshoumerchbill/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("dingdanqianshoumerchbill_update", res.data);
                        event.emit("dingdanqianshoumerchbill_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据id 或者列表id
 * @param {number|number[]} id
 * @return {Promise<EResponseData<string>>}
 */
export const canDingdanqianshoumerchbillDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/dingdanqianshoumerchbill/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("dingdanqianshoumerchbill_delete", res.data);
                        event.emit("dingdanqianshoumerchbill_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
