<template>
    <div class="views-goods-web-detail">
        <div>
            <e-container>
                <div class="">
                    <div class="goods-info clearfix">
                        <div class="gallery-list">
                            <e-shangpinban :images="map.picture"></e-shangpinban>
                        </div>
                        <div class="goods-right-content">
                            <h3 class="title" v-text="map.names"></h3>
                            <div class="descount">
                                <div>
                                    <span class="name"> 商品编号： </span>
                                    <span class="val"> {{ map.numbers }} </span>
                                </div>
                                <div>
                                    <span class="name"> 分类： </span>
                                    <span class="val"> <e-select-view module="classifications" :value="map.ification" select="id" show="names"></e-select-view> </span>
                                </div>
                                <div>
                                    <span class="name"> 商品价格： </span>
                                    <span class="val"> {{ map.price }} </span>
                                </div>
                                <div>
                                    <span class="name"> 商品库存： </span>
                                    <span class="val"> {{ map.inventory }} </span>
                                </div>
                                <div>
                                    <span class="name"> 商品销量： </span>
                                    <span class="val"> {{ map.volume }} </span>
                                </div>
                            </div>
                            <template v-if="$session.cx == '用户'">
                                <el-form :model="shoppingcartForm" ref="shoppingcartFormElement" v-show="$session.username">
                                    <el-form-item
                                        label="购买数量"
                                        prop="quantity"
                                        required
                                        :rules="[{required:true, message:'请填写购买数量'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                                    >
                                        <el-input-number v-model="shoppingcartForm.quantity" :min="1" step="1"></el-input-number>
                                    </el-form-item>
                                </el-form>

                                <el-button type="primary" @click="onAddCard">加入购物车</el-button>
                            </template>


                        </div>
                    </div>
                    <div class="goods-content" v-html="map.details"></div>
                </div>
            </e-container>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import router from "@/router";
    import rule from "@/utils/rule";
    import EShangpinban from "@/components/shangpin/shangpinban.vue";

    import { ref, reactive, watch, computed, unref } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { extend } from "@/utils/extend";
    import { useGoodsFindById, canGoodsFindById, canShoppingcartCreateForm, canShoppingcartInsert } from "@/module";
    import { ElLoading, ElMessage, ElMessageBox } from "element-plus";

    const route = useRoute();
    const props = defineProps({
        id: {
            type: [Number, String],
        },
        isShowBtn: {
            type: Boolean,
            default: true,
        },
    });

    /**
     * 获取详情页面的一行数据,当url参数id变更时，当url参数id变更时，自动更新map中的数据
     * @type {EGoods}
     */
    const map = useGoodsFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canGoodsFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据

    const shoppingcartForm = ref({});
    const readMap = ref({});
    const shoppingcartFormElement = ref(null);

    watch(
        () => map,
        async () => {
            if (!map.id || !session("username")) return;

            var s = await canShoppingcartCreateForm(map.id, map);
            shoppingcartForm.value = s.form;
            readMap.value = s.readMap;
        },
        { deep: true }
    );

    const onAddCard = async () => {
        if (!session("username")) {
            var r = await ElMessageBox.confirm("请先登录");
            router.push({ path: "/login", query: { redirect: route.fullPath } });
            return;
        }
        shoppingcartFormElement.value.validate().then(async () => {
            const loadingInstance = ElLoading.service({
                fullscreen: true,
                lock: true,
                text: "正在提交...",
            });
            try {
                const res = await canShoppingcartInsert(shoppingcartForm.value);
                loadingInstance.close();
                if (res.code == 0) {
                    ElMessage.success("添加购物车成功");
                } else {
                    ElMessage.error(res.msg);
                }
            } catch (e) {
                ElMessage.error(e.message);
                loadingInstance.close();
            }
        });
    };
</script>

<style scoped lang="scss">
    .views-goods-web-detail {
    }
</style>
