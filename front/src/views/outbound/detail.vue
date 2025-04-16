<template>
    <div class="views-outbound-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 用品出库详情 </span>
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
                        <el-descriptions-item label="出库编号"> {{ map.numbers1 }} </el-descriptions-item>
                        <el-descriptions-item label="出库数量"> {{ map.quantity }} </el-descriptions-item>
                        <el-descriptions-item label="出库小计"> {{ map.subtotal }} </el-descriptions-item>
                        <el-descriptions-item label="出库说明"> {{ map.describes }} </el-descriptions-item>
                        <el-descriptions-item label="经手人"> {{ map.handler }} </el-descriptions-item>
                        <el-descriptions-item label="出库时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border> </el-descriptions>
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
    import { useOutboundFindById, canOutboundFindById } from "@/module";

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
     * @type {EOutbound}
     */
    const map = useOutboundFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canOutboundFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-outbound-detail {
    }
</style>
