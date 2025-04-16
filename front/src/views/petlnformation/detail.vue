<template>
    <div class="views-petlnformation-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 宠物资讯详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="标题"> {{ map.title }} </el-descriptions-item>
                        <el-descriptions-item label="分类">
                            <e-select-view module="classification" :value="map.classification" select="id" show="names"></e-select-view>
                        </el-descriptions-item>
                        <el-descriptions-item label="发布人"> {{ map.publisher }} </el-descriptions-item>
                        <el-descriptions-item label="点击率"> {{ map.rate }} </el-descriptions-item>
                        <el-descriptions-item label="发布时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
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
    import { usePetlnformationFindById, canPetlnformationFindById } from "@/module";

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
     * @type {EPetlnformation}
     */
    const map = usePetlnformationFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canPetlnformationFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-petlnformation-detail {
    }
</style>
