<template>
    <div class="views-pet-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 宠物信息详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="宠物编号"> {{ map.numbers }} </el-descriptions-item>
                        <el-descriptions-item label="宠物名称"> {{ map.names }} </el-descriptions-item>
                        <el-descriptions-item label="宠物类别"> {{ map.category }} </el-descriptions-item>
                        <el-descriptions-item label="宠物性别"> {{ map.gender }} </el-descriptions-item>
                        <el-descriptions-item label="年龄"> {{ map.age }} </el-descriptions-item>
                        <el-descriptions-item label="生活习惯"> {{ map.habit }} </el-descriptions-item>
                        <el-descriptions-item label="添加人"> {{ map.people }} </el-descriptions-item>
                        <el-descriptions-item label="添加时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="宠物简介"> {{ map.introduction }} </el-descriptions-item>
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
    import { usePetFindById, canPetFindById } from "@/module";

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
     * @type {EPet}
     */
    const map = usePetFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canPetFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-pet-detail {
    }
</style>
