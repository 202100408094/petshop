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
 * @return {EGoods}
 */

export const GoodsCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        numbers: rule.getID(),
        names: "",
        ification: "",
        picture: "",
        price: "",
        inventory: "",
        details: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EGoodsForm>}
 */
export const canGoodsCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = GoodsCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取商品信息 模块的表单字段数据
 * @return {EGoodsForm}
 */
export const useGoodsCreateForm = () => {
    const form = GoodsCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canGoodsSelect = (filter, result) => {
    http.post("/api/goods/selectPages").then((res) => {
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
export const useGoodsSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canGoodsSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EGoods>}
 */
export const canGoodsFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/goods/findById", { id }).then((res) => {
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
 * @return {EGoods}
 */
export const useGoodsFindById = (id) => {
    var form = reactive({});

    canGoodsFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EGoods} data
 * @return {Promise<EResponseData<EGoods>>}
 */
export const canGoodsInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/goods/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("goods_insert", res.data);
                        event.emit("goods_change", res.data);
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
 * @param {EGoods} data
 * @return {Promise<EResponseData<EGoods>>}
 */
export const canGoodsUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/goods/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("goods_update", res.data);
                        event.emit("goods_change", res.data);
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
export const canGoodsDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/goods/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("goods_delete", res.data);
                        event.emit("goods_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
