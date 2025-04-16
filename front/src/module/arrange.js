import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canReservationFindById } from "./reservation";

/**
 * 响应式的对象数据
 * @return {EArrange}
 */

export const ArrangeCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        title: "",
        numbers: "",
        type: "",
        price: "",
        numberss: "",
        userss: $session.username,
        times: rule.date("Y-m-d H:i:s"),
        staff: "",
        number1: "",
        names: "",
        notes: "",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["reservationid", "title", "numbers", "type", "price", "numberss", "userss"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EArrangeForm>}
 */
export const canArrangeCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = ArrangeCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canReservationFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.reservationid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取服务安排 模块的表单字段数据
 * @return {EArrangeForm}
 */
export const useArrangeCreateForm = (id) => {
    const form = ArrangeCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canReservationFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.reservationid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canArrangeSelect = (filter, result) => {
    http.post("/api/arrange/selectPages").then((res) => {
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
export const useArrangeSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canArrangeSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EArrange>}
 */
export const canArrangeFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/arrange/findById", { id }).then((res) => {
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
 * @return {EArrange}
 */
export const useArrangeFindById = (id) => {
    var form = reactive({});

    canArrangeFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EArrange} data
 * @return {Promise<EResponseData<EArrange>>}
 */
export const canArrangeInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/arrange/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("arrange_insert", res.data);
                        event.emit("arrange_change", res.data);
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
 * @param {EArrange} data
 * @return {Promise<EResponseData<EArrange>>}
 */
export const canArrangeUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/arrange/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("arrange_update", res.data);
                        event.emit("arrange_change", res.data);
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
export const canArrangeDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/arrange/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("arrange_delete", res.data);
                        event.emit("arrange_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
