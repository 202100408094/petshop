import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canProgressFindById } from "./progress";

/**
 * 响应式的对象数据
 * @return {ECancel}
 */

export const CancelCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        orders: "",
        merchbill: "",
        money: route.query?.sum_xiaoji,
        address: "",
        phone: "",
        fullname: "",
        userss: $session.username,
        reason: "",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["progressid", "orders", "merchbill", "money", "address", "phone", "fullname", "userss"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ECancelForm>}
 */
export const canCancelCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = CancelCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canProgressFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.progressid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取取消订单 模块的表单字段数据
 * @return {ECancelForm}
 */
export const useCancelCreateForm = (id) => {
    const form = CancelCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canProgressFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.progressid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canCancelSelect = (filter, result) => {
    http.post("/api/cancel/selectPages").then((res) => {
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
export const useCancelSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canCancelSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ECancel>}
 */
export const canCancelFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/cancel/findById", { id }).then((res) => {
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
 * @return {ECancel}
 */
export const useCancelFindById = (id) => {
    var form = reactive({});

    canCancelFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ECancel} data
 * @return {Promise<EResponseData<ECancel>>}
 */
export const canCancelInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/cancel/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancel_insert", res.data);
                        event.emit("cancel_change", res.data);
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
 * @param {ECancel} data
 * @return {Promise<EResponseData<ECancel>>}
 */
export const canCancelUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/cancel/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancel_update", res.data);
                        event.emit("cancel_change", res.data);
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
export const canCancelDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/cancel/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("cancel_delete", res.data);
                        event.emit("cancel_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
