<template>
    <div class="views-services-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 宠物服务详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="编号"> {{ map.numbers }} </el-descriptions-item>
                        <el-descriptions-item label="标题"> {{ map.title }} </el-descriptions-item>
                        <el-descriptions-item label="类型"> {{ map.type }} </el-descriptions-item>
                        <el-descriptions-item label="价格"> {{ map.price }} </el-descriptions-item>
                        <el-descriptions-item label="要求"> {{ map.requires }} </el-descriptions-item>
                        <el-descriptions-item label="发布时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="图片"> <e-images :src="map.picture" type="detail"></e-images> </el-descriptions-item>
                        <el-descriptions-item label="内容"> <div v-html="map.content"></div> </el-descriptions-item>
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
    import { useServicesFindById, canServicesFindById } from "@/module";

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
     * @type {EServices}
     */
    const map = useServicesFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canServicesFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-services-detail {
    }
</style>
