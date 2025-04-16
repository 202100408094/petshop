<template>
    <div class="views-goods-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 商品信息详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="商品编号"> {{ map.numbers }} </el-descriptions-item>
                        <el-descriptions-item label="商品名称"> {{ map.names }} </el-descriptions-item>
                        <el-descriptions-item label="分类">
                            <e-select-view module="classifications" :value="map.ification" select="id" show="names"></e-select-view>
                        </el-descriptions-item>
                        <el-descriptions-item label="商品价格"> {{ map.price }} </el-descriptions-item>
                        <el-descriptions-item label="商品库存"> {{ map.inventory }} </el-descriptions-item>
                        <el-descriptions-item label="商品销量"> {{ map.volume }} </el-descriptions-item>
                        <el-descriptions-item label="添加时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="商品图片"> <e-images :src="map.picture" type="detail"></e-images> </el-descriptions-item>
                        <el-descriptions-item label="商品详情"> <div v-html="map.details"></div> </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="no-print" v-if="isShowBtn">
                    <el-button @click="$router.go(-1)">返回</el-button>
                    <el-button @click="$print('#printdetail')">打印</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";

    import { ref, reactive, watch, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { extend } from "@/utils/extend";
    import { useGoodsFindById, canGoodsFindById } from "@/module";

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
</script>

<style scoped lang="scss">
    .views-goods-detail {
    }
</style>
