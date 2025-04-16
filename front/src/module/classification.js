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
 * @return {EClassification}
 */

export const ClassificationCreateForm = () => {
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
 * @return {Promise<EClassificationForm>}
 */
export const canClassificationCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = ClassificationCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取资讯分类 模块的表单字段数据
 * @return {EClassificationForm}
 */
export const useClassificationCreateForm = () => {
    const form = ClassificationCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canClassificationSelect = (filter, result) => {
    http.post("/api/classification/selectPages").then((res) => {
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
export const useClassificationSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canClassificationSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EClassification>}
 */
export const canClassificationFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/classification/findById", { id }).then((res) => {
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
 * @return {EClassification}
 */
export const useClassificationFindById = (id) => {
    var form = reactive({});

    canClassificationFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EClassification} data
 * @return {Promise<EResponseData<EClassification>>}
 */
export const canClassificationInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/classification/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classification_insert", res.data);
                        event.emit("classification_change", res.data);
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
 * @param {EClassification} data
 * @return {Promise<EResponseData<EClassification>>}
 */
export const canClassificationUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/classification/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classification_update", res.data);
                        event.emit("classification_change", res.data);
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
export const canClassificationDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/classification/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("classification_delete", res.data);
                        event.emit("classification_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
