<template>
    <div class="views-user1-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 用户详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="用户名"> {{ map.username }} </el-descriptions-item>
                        <el-descriptions-item label="密码"> {{ map.password }} </el-descriptions-item>
                        <el-descriptions-item label="姓名"> {{ map.name }} </el-descriptions-item>
                        <el-descriptions-item label="性别"> {{ map.xingbie }} </el-descriptions-item>
                        <el-descriptions-item label="手机"> {{ map.gender }} </el-descriptions-item>
                        <el-descriptions-item label="邮箱"> {{ map.email }} </el-descriptions-item>
                        <el-descriptions-item label="头像"> <e-img :src="map.profile" class="detail-image" style="max-width: 120px" /> </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="简介"> {{ map.brief }} </el-descriptions-item>
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
    import { useUser1FindById, canUser1FindById } from "@/module";

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
     * @type {EUser1}
     */
    const map = useUser1FindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canUser1FindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-user1-detail {
    }
</style>
