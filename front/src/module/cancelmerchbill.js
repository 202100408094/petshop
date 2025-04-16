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
 * @return {ECancelmerchbill}
 */

export const CancelmerchbillCreateForm = () => {
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
 * @return {Promise<ECancelmerchbillForm>}
 */
export const canCancelmerchbillCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = CancelmerchbillCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取取消订单商品信息 模块的表单字段数据
 * @return {ECancelmerchbillForm}
 */
export const useCancelmerchbillCreateForm = () => {
    const form = CancelmerchbillCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canCancelmerchbillSelect = (filter, result) => {
    http.post("/api/cancelmerchbill/selectPages").then((res) => {
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
export const useCancelmerchbillSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canCancelmerchbillSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ECancelmerchbill>}
 */
export const canCancelmerchbillFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/cancelmerchbill/findById", { id }).then((res) => {
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
 * @return {ECancelmerchbill}
 */
export const useCancelmerchbillFindById = (id) => {
    var form = reactive({});

    canCancelmerchbillFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ECancelmerchbill} data
 * @return {Promise<EResponseData<ECancelmerchbill>>}
 */
export const canCancelmerchbillInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/cancelmerchbill/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancelmerchbill_insert", res.data);
                        event.emit("cancelmerchbill_change", res.data);
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
 * @param {ECancelmerchbill} data
 * @return {Promise<EResponseData<ECancelmerchbill>>}
 */
export const canCancelmerchbillUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/cancelmerchbill/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancelmerchbill_update", res.data);
                        event.emit("cancelmerchbill_change", res.data);
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
export const canCancelmerchbillDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/cancelmerchbill/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancelmerchbill_delete", res.data);
                        event.emit("cancelmerchbill_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
