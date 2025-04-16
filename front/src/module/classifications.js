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
 * @return {EClassifications}
 */

export const ClassificationsCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        names: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EClassificationsForm>}
 */
export const canClassificationsCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = ClassificationsCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取商品分类 模块的表单字段数据
 * @return {EClassificationsForm}
 */
export const useClassificationsCreateForm = () => {
    const form = ClassificationsCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canClassificationsSelect = (filter, result) => {
    http.post("/api/classifications/selectPages").then((res) => {
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
export const useClassificationsSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canClassificationsSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EClassifications>}
 */
export const canClassificationsFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/classifications/findById", { id }).then((res) => {
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
 * @return {EClassifications}
 */
export const useClassificationsFindById = (id) => {
    var form = reactive({});

    canClassificationsFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EClassifications} data
 * @return {Promise<EResponseData<EClassifications>>}
 */
export const canClassificationsInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/classifications/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classifications_insert", res.data);
                        event.emit("classifications_change", res.data);
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
 * @param {EClassifications} data
 * @return {Promise<EResponseData<EClassifications>>}
 */
export const canClassificationsUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/classifications/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classifications_update", res.data);
                        event.emit("classifications_change", res.data);
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
export const canClassificationsDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/classifications/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classifications_delete", res.data);
                        event.emit("classifications_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
