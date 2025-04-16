<template>
    <div class="views-fuwuyuyuetongji">
        <div>
            <e-container>
                <el-form action="javascript:;" @submit="searchSubmit" inline>
                    <el-form-item label="类型">
                        <el-select v-model="search.type"
                            ><el-option label="请选择" value=""></el-option><el-option label="美容" value="美容"></el-option>
                            <el-option label="洗澡" value="洗澡"></el-option>
                            <el-option label="驱虫" value="驱虫"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select> </el-form-item
                ></el-form>
            </e-container>
        </div>
        <div>
            <e-container>
                <div style="padding: 10px; background: #ffffff">
                    <el-table :data="reservationList">
                        <el-table-column prop="title" label="标题" width="180" />
                        <el-table-column prop="count" label="预约次数" sortable />
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

    const search = reactive({ type: "" });
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
    const reservationList = ref([]);
    const loadDatabaseList = async () => {
        var where = " 1=1 ";
        if (search.type) {
            where += ` AND fwy.type='${search.type}' `;
        }
        reservationList.value = await DB.name("reservation").alias("fwy").field("fwy.title").group("fwy.title").field("count(*) count").order("count DESC").where(where).select();
    };

    loadDatabaseList();
    const barOptions = computed(() => {
        var list = unref(reservationList);
        return {
            title: {
                text: "",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}：{c},{d}%",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "服务预约数量",
                    type: "pie",
                    radius: "50%",
                    data: list.map((s) => {
                        return {
                            value: parseFloat(s.count),
                            name: s.title,
                        };
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
    });
</script>

<style scoped lang="scss">
    .views-fuwuyuyuetongji {
    }
</style>
