<template>
    <div class="views-staff-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 员工详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="工号"> {{ map.number1 }} </el-descriptions-item>
                        <el-descriptions-item label="密码"> {{ map.password }} </el-descriptions-item>
                        <el-descriptions-item label="姓名"> {{ map.names }} </el-descriptions-item>
                        <el-descriptions-item label="性别"> {{ map.gender }} </el-descriptions-item>
                        <el-descriptions-item label="联系电话"> {{ map.phone }} </el-descriptions-item>
                        <el-descriptions-item label="入职日期"> {{ map.date }} </el-descriptions-item>
                        <el-descriptions-item label="头像"> <e-img :src="map.picture" class="detail-image" style="max-width: 120px" /> </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="简介"> {{ map.introduction }} </el-descriptions-item>
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
    import { useStaffFindById, canStaffFindById } from "@/module";

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
     * @type {EStaff}
     */
    const map = useStaffFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canStaffFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-staff-detail {
    }
</style>
