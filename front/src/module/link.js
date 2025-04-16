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
 * @return {ELink}
 */

export const LinkCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        names: "",
        url: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ELinkForm>}
 */
export const canLinkCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = LinkCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取友情链接 模块的表单字段数据
 * @return {ELinkForm}
 */
export const useLinkCreateForm = () => {
    const form = LinkCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canLinkSelect = (filter, result) => {
    http.post("/api/link/selectPages").then((res) => {
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
export const useLinkSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canLinkSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ELink>}
 */
export const canLinkFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/link/findById", { id }).then((res) => {
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
 * @return {ELink}
 */
export const useLinkFindById = (id) => {
    var form = reactive({});

    canLinkFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ELink} data
 * @return {Promise<EResponseData<ELink>>}
 */
export const canLinkInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/link/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("link_insert", res.data);
                        event.emit("link_change", res.data);
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
 * @param {ELink} data
 * @return {Promise<EResponseData<ELink>>}
 */
export const canLinkUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/link/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("link_update", res.data);
                        event.emit("link_change", res.data);
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
export const canLinkDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/link/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("link_delete", res.data);
                        event.emit("link_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
