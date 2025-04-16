import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canGoodsFindById } from "./goods";

/**
 * 响应式的对象数据
 * @return {EOutbound}
 */

export const OutboundCreateForm = () => {
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
        price: "",
        numbers1: rule.getID(),
        quantity: "",
        describes: "",
        handler: $session.username,
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["goodsid", "numbers", "names", "ification", "price"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EOutboundForm>}
 */
export const canOutboundCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = OutboundCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canGoodsFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.goodsid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取用品出库 模块的表单字段数据
 * @return {EOutboundForm}
 */
export const useOutboundCreateForm = (id) => {
    const form = OutboundCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canGoodsFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.goodsid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canOutboundSelect = (filter, result) => {
    http.post("/api/outbound/selectPages").then((res) => {
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
export const useOutboundSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canOutboundSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EOutbound>}
 */
export const canOutboundFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/outbound/findById", { id }).then((res) => {
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
 * @return {EOutbound}
 */
export const useOutboundFindById = (id) => {
    var form = reactive({});

    canOutboundFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EOutbound} data
 * @return {Promise<EResponseData<EOutbound>>}
 */
export const canOutboundInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/outbound/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("outbound_insert", res.data);
                        event.emit("outbound_change", res.data);
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
 * @param {EOutbound} data
 * @return {Promise<EResponseData<EOutbound>>}
 */
export const canOutboundUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/outbound/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("outbound_update", res.data);
                        event.emit("outbound_change", res.data);
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
export const canOutboundDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/outbound/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("outbound_delete", res.data);
                        event.emit("outbound_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
