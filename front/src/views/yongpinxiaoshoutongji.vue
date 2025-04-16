<template>
    <div class="views-yongpinxiaoshoutongji">
        <div>
            <e-container>
                <el-form action="javascript:;" @submit="searchSubmit" inline>
                    <el-form-item label="分类">
                        <el-select v-model="search.ification"
                        ><el-option label="请选择" value=""></el-option><e-select-option type="option" module="classifications" value="id" label="names"></e-select-option
                        ></el-select> </el-form-item
                    ></el-form>
            </e-container>
        </div>
        <div>
            <e-container>
                <div style="padding: 10px; background: #ffffff">
                    <el-table :data="progressmerchbillList">
                        <el-table-column prop="names" label="商品名称" width="300" />
                        <el-table-column prop="count" label="销售次数" sortable />
                        <el-table-column prop="sum_quantity" label="销售数量" sortable />
                        <el-table-column prop="sum_subtotal" label="销售小计" sortable />
                    </el-table>
                </div>

                <v3-echarts :options="barOptions" width="100%" height="300px"></v3-echarts>
            </e-container>
        </div>
    </div>
</template>

<script setup>
import http from "@/utils/ajax/http";
import DB from "@/utils/db";

import { ref, reactive, watch, computed, unref } from "vue";
import { useRoute } from "vue-router";
import { session } from "@/utils/utils";
import { extend } from "@/utils/extend";

const route = useRoute();

const search = reactive({ ification: "" });
extend(search, route.query);
const serachSubmit = () => {
    loadDatabaseList();
};
var timer;
watch(
    () => search,
    () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            serachSubmit();
        }, 200);
    },
    { deep: true }
);
const progressmerchbillList = ref([]);
const loadDatabaseList = async () => {
    var where = " 1=1 ";
    if (search.ification) {
        where += ` AND dds.ification='${search.ification}' `;
    }
    progressmerchbillList.value = await DB.name("progressmerchbill")
        .alias("dds")
        .field("dds.names")
        .group("dds.names")
        .field("count(*) count")
        .order("count DESC")
        .field("sum(dds.quantity) sum_quantity")
        .field("sum(dds.subtotal) sum_subtotal")
        .where(where)
        .select();
};

loadDatabaseList();
const barOptions = computed(() => {
    var list = unref(progressmerchbillList);
    return {
        title: {
            text: "",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: list.map((s) => s.names),
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "销售次数",
                type: "bar",
                barWidth: "20px",
                data: list.map((s) => parseFloat(s.count)),
            },
            {
                name: "销售数量",
                type: "bar",
                barWidth: "20px",
                data: list.map((s) => parseFloat(s.sum_quantity)),
            },
            {
                name: "销售小计",
                type: "bar",
                barWidth: "20px",
                data: list.map((s) => parseFloat(s.sum_subtotal)),
            },
        ],
    };
});
</script>

<style scoped lang="scss">
.views-yongpinxiaoshoutongji {
}
</style>
