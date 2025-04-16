<template>
    <div class="views-progress-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 订单详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="订单号"> {{ map.orders }} </el-descriptions-item>
                        <el-descriptions-item label="订单金额"> {{ map.money }} </el-descriptions-item>
                        <el-descriptions-item label="收货地址"> {{ map.address }} </el-descriptions-item>
                        <el-descriptions-item label="联系电话"> {{ map.phone }} </el-descriptions-item>
                        <el-descriptions-item label="收货人姓名"> {{ map.fullname }} </el-descriptions-item>
                        <el-descriptions-item label="下单用户"> {{ map.userss }} </el-descriptions-item>
                        <el-descriptions-item label="订单状态"> {{ map.state }} </el-descriptions-item>
                        <el-descriptions-item label="下单时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="商品信息">
                            <div id="dataListmerchbill" style="text-align: left">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>商品编号</th>
                                            <th>商品名称</th>
                                            <th>分类</th>
                                            <th>商品图片</th>
                                            <th>商品价格</th>
                                            <th>购买数量</th>
                                            <th>小计</th>
                                            <th>购买用户</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="dataMap in dataSets">
                                            <td>{{ dataMap.numbers }}</td>
                                            <td>{{ dataMap.names }}</td>
                                            <td><e-select-view module="classifications" :value="dataMap.ification" select="id" show="names"></e-select-view></td>
                                            <td>
                                                <div style="width: 100%; max-width: 120px">
                                                    <e-img :src="dataMap.picture" type="list"></e-img>
                                                </div>
                                            </td>
                                            <td>{{ dataMap.price }}</td>
                                            <td>{{ dataMap.quantity }}</td>
                                            <td>{{ dataMap.subtotal }}</td>
                                            <td>{{ dataMap.userss }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </el-descriptions-item>
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
    import { useProgressFindById, canProgressFindById } from "@/module";

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
     * @type {EProgress}
     */
    const map = useProgressFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canProgressFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据

    const dataSets = DB.name("progressmerchbill").where("progressid", route.query.id).order("id asc").selectRef();
</script>

<style scoped lang="scss">
    .views-progress-detail {
    }
</style>
