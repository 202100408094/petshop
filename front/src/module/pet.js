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
 * @return {EPet}
 */

export const PetCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        numbers: rule.getID(),
        names: "",
        category: "",
        gender: "",
        age: "",
        habit: "",
        introduction: "",
        people: $session.username,
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EPetForm>}
 */
export const canPetCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = PetCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取宠物信息 模块的表单字段数据
 * @return {EPetForm}
 */
export const usePetCreateForm = () => {
    const form = PetCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canPetSelect = (filter, result) => {
    http.post("/api/pet/selectPages").then((res) => {
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
export const usePetSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canPetSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EPet>}
 */
export const canPetFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/pet/findById", { id }).then((res) => {
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
 * @return {EPet}
 */
export const usePetFindById = (id) => {
    var form = reactive({});

    canPetFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EPet} data
 * @return {Promise<EResponseData<EPet>>}
 */
export const canPetInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/pet/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pet_insert", res.data);
                        event.emit("pet_change", res.data);
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
 * @param {EPet} data
 * @return {Promise<EResponseData<EPet>>}
 */
export const canPetUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/pet/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pet_update", res.data);
                        event.emit("pet_change", res.data);
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
export const canPetDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/pet/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pet_delete", res.data);
                        event.emit("pet_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
