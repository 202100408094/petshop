<template>
    <div class="views-arrange-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 服务安排详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="标题"> {{ map.title }} </el-descriptions-item>
                        <el-descriptions-item label="编号"> {{ map.numbers }} </el-descriptions-item>
                        <el-descriptions-item label="类型"> {{ map.type }} </el-descriptions-item>
                        <el-descriptions-item label="价格"> {{ map.price }} </el-descriptions-item>
                        <el-descriptions-item label="预约单号"> {{ map.numberss }} </el-descriptions-item>
                        <el-descriptions-item label="预约用户"> {{ map.userss }} </el-descriptions-item>
                        <el-descriptions-item label="安排时间"> {{ map.times }} </el-descriptions-item>
                        <el-descriptions-item label="服务人员">
                            <p>工号：{{ map.number1 }}</p>
                            <p>姓名：{{ map.names }}</p>
                        </el-descriptions-item>
                        <el-descriptions-item label="工号"> {{ map.number1 }} </el-descriptions-item>
                        <el-descriptions-item label="姓名"> {{ map.names }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="备注"> {{ map.notes }} </el-descriptions-item>
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
    import { useArrangeFindById, canArrangeFindById } from "@/module";

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
     * @type {EArrange}
     */
    const map = useArrangeFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canArrangeFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-arrange-detail {
    }
</style>
