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
 * @return {EFloat1}
 */

export const Float1CreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        title: "",
        image: "",
        url: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EFloat1Form>}
 */
export const canFloat1CreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = Float1CreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取轮播图 模块的表单字段数据
 * @return {EFloat1Form}
 */
export const useFloat1CreateForm = () => {
    const form = Float1CreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canFloat1Select = (filter, result) => {
    http.post("/api/float1/selectPages").then((res) => {
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
export const useFloat1Select = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canFloat1Select(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EFloat1>}
 */
export const canFloat1FindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/float1/findById", { id }).then((res) => {
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
 * @return {EFloat1}
 */
export const useFloat1FindById = (id) => {
    var form = reactive({});

    canFloat1FindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EFloat1} data
 * @return {Promise<EResponseData<EFloat1>>}
 */
export const canFloat1Insert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/float1/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("float1_insert", res.data);
                        event.emit("float1_change", res.data);
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
 * @param {EFloat1} data
 * @return {Promise<EResponseData<EFloat1>>}
 */
export const canFloat1Update = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/float1/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("float1_update", res.data);
                        event.emit("float1_change", res.data);
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
export const canFloat1Delete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/float1/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("float1_delete", res.data);
                        event.emit("float1_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
