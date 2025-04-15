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
 * @return {EStaff}
 */

export const StaffCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        number1: "",
        password: "",
        names: "",
        gender: "",
        phone: "",
        date: rule.date("Y-m-d"),
        introduction: "",
        picture: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EStaffForm>}
 */
export const canStaffCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = StaffCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取员工 模块的表单字段数据
 * @return {EStaffForm}
 */
export const useStaffCreateForm = () => {
    const form = StaffCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canStaffSelect = (filter, result) => {
    http.post("/api/staff/selectPages").then((res) => {
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
export const useStaffSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canStaffSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EStaff>}
 */
export const canStaffFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/staff/findById", { id }).then((res) => {
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
 * @return {EStaff}
 */
export const useStaffFindById = (id) => {
    var form = reactive({});

    canStaffFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EStaff} data
 * @return {Promise<EResponseData<EStaff>>}
 */
export const canStaffInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/staff/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("staff_insert", res.data);
                        event.emit("staff_change", res.data);
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
 * @param {EStaff} data
 * @return {Promise<EResponseData<EStaff>>}
 */
export const canStaffUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/staff/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("staff_update", res.data);
                        event.emit("staff_change", res.data);
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
export const canStaffDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/staff/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("staff_delete", res.data);
                        event.emit("staff_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
