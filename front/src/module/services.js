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
 * @return {EServices}
 */

export const ServicesCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        numbers: rule.getID(),
        title: "",
        type: "",
        picture: "",
        price: "",
        requires: "",
        content: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EServicesForm>}
 */
export const canServicesCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = ServicesCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取宠物服务 模块的表单字段数据
 * @return {EServicesForm}
 */
export const useServicesCreateForm = () => {
    const form = ServicesCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canServicesSelect = (filter, result) => {
    http.post("/api/services/selectPages").then((res) => {
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
export const useServicesSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canServicesSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EServices>}
 */
export const canServicesFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/services/findById", { id }).then((res) => {
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
 * @return {EServices}
 */
export const useServicesFindById = (id) => {
    var form = reactive({});

    canServicesFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EServices} data
 * @return {Promise<EResponseData<EServices>>}
 */
export const canServicesInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/services/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("services_insert", res.data);
                        event.emit("services_change", res.data);
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
 * @param {EServices} data
 * @return {Promise<EResponseData<EServices>>}
 */
export const canServicesUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/services/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("services_update", res.data);
                        event.emit("services_change", res.data);
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
export const canServicesDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/services/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("services_delete", res.data);
                        event.emit("services_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
