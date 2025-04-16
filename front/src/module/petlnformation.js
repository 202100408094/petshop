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
 * @return {EPetlnformation}
 */

export const PetlnformationCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        title: "",
        classification: "",
        content: "",
        publisher: $session.username,
        rate: "0",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EPetlnformationForm>}
 */
export const canPetlnformationCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = PetlnformationCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取宠物资讯 模块的表单字段数据
 * @return {EPetlnformationForm}
 */
export const usePetlnformationCreateForm = () => {
    const form = PetlnformationCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canPetlnformationSelect = (filter, result) => {
    http.post("/api/petlnformation/selectPages").then((res) => {
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
export const usePetlnformationSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canPetlnformationSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EPetlnformation>}
 */
export const canPetlnformationFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/petlnformation/findById", { id }).then((res) => {
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
 * @return {EPetlnformation}
 */
export const usePetlnformationFindById = (id) => {
    var form = reactive({});

    canPetlnformationFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EPetlnformation} data
 * @return {Promise<EResponseData<EPetlnformation>>}
 */
export const canPetlnformationInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/petlnformation/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("petlnformation_insert", res.data);
                        event.emit("petlnformation_change", res.data);
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
 * @param {EPetlnformation} data
 * @return {Promise<EResponseData<EPetlnformation>>}
 */
export const canPetlnformationUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/petlnformation/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("petlnformation_update", res.data);
                        event.emit("petlnformation_change", res.data);
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
export const canPetlnformationDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/petlnformation/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("petlnformation_delete", res.data);
                        event.emit("petlnformation_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
