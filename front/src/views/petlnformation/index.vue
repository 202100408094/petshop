<template>
    <div class="views-petlnformation-index">
        <div style="margin: 20px 0 0 0">
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">宠物资讯列表</h3>
                    <div class="sidebar-widget-body">
                        <div class="hot-class">
                            <form action="javascript:;" @submit="searchSubmit" class="form-search">
                                <table class="jd-search">
                                    <tbody>
                                        <tr>
                                            <td class="label">分类</td>
                                            <td>
                                                <p class="search-radio">
                                                    <a href="javascript:;" @click="selectRadio('classification','')" :class="{active:!search.classification}">全部</a>
                                                    <a
                                                        href="javascript:;"
                                                        v-for="r in mapclassification1"
                                                        @click="selectRadio('classification',r.id)"
                                                        :class="{active:search.classification == r.id}"
                                                        v-text="r.names"
                                                    >
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">标题</td>
                                            <td>
                                                <el-input type="text" style="width: 150px" v-model="search.title" placeholder="请输入关键词"> </el-input>
                                                <el-button type="success" @click="searchSubmit">搜索</el-button>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </form>
                            <div class="listBoxs news-styles2">
                                <!-- 咨询容器开始 -->
                                <div class="p_news">
                                    <template v-for="r in lists" :key="r.id">
                                        <div class="list" @click="$router.push('/petlnformation/detail?id='+r.id)">
                                            <!-- 图片显示结束 -->
                                            <div class="cotentBox">
                                                <!-- 时间开始 -->
                                                <div class="listTimeBox hidden-style2">
                                                    <div class="listTime">{{ r.addtime }}</div>
                                                    <p class="listYear">{{ resetDate('Y',r.addtime) }}年</p>
                                                    <p class="listmd">
                                                        <span class="listMouth">{{ resetDate('m',r.addtime) }}月</span>
                                                        <span class="listDate">{{ resetDate('d',r.addtime) }}日</span>
                                                    </p>
                                                </div>
                                                <div class="leftTimeBox hidden-style1">
                                                    <div class="listTime">{{ r.addtime }}</div>
                                                    <div class="newData">{{ resetDate('d',r.addtime) }}</div>
                                                    <div class="newYearMon">{{ resetDate('Y-m',r.addtime) }}</div>
                                                </div>
                                                <!-- 时间结束 -->
                                                <!-- 标题概述开始 -->
                                                <div class="listCotentBox">
                                                    <!-- 标题开始 -->
                                                    <div class="titleBox">
                                                        <a href="javascript:;" class="titleLink">
                                                            <h5 class="titleh5">{{ r.title }}</h5>
                                                        </a>
                                                    </div>
                                                    <div class="newToolBox hidden-style1">
                                                        <i class="fa fa-clock-o"></i>
                                                        发布时间：{{ r.addtime }}
                                                    </div>
                                                    <!-- 标题结束 -->
                                                    <!-- 概要开始 -->
                                                    <div class="gyBox">
                                                        <article class="lsitSummary" v-text="$substr(r.content,120)"></article>
                                                    </div>
                                                    <!-- 概要结束 -->
                                                </div>
                                                <!-- 标题概述结束 -->
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <!-- 咨询容器结束 -->
                            </div>
                            <div style="margin-top: 10px; text-align: center">
                                <el-pagination
                                    @current-change="loadList"
                                    :page-sizes="[12, 24, 36, 48,60]"
                                    v-model:current-page="search.page"
                                    v-model:page-size="search.pagesize"
                                    @size-change="sizeChange"
                                    layout="total, sizes, prev, pager, next"
                                    :total="totalCount"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- /.sidebar-widget-body -->
                </div>
            </e-container>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import router from "@/router";

    import { ref, reactive, watch, unref, onBeforeMount } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { canPetlnformationSelect, usePetlnformationSelect, canPetlnformationDelete } from "@/module";
    import { extend } from "@/utils/extend";
    import { ElMessageBox, ElMessage } from "element-plus";
    import { resetDate } from "@/utils/date";

    const route = useRoute();
    const search = reactive({
        title: "",
        classification: "",
        content: "",
        page: 1, // 当前页
        pagesize: 12, // 每页行数
        orderby: "id", // 排序字段
        sort: "desc", // 排序类型
    });
    extend(search, route.query);
    // 链接参数变化时更新这些内容
    watch(
        () => route.query,
        () => {
            extend(search, route.query);
            loadList(1);
        },
        { deep: true }
    );

    // 总行数
    const totalCount = ref(0);
    /**
     * 列表数据
     * @type {EPetlnformation[]}
     */
    const lists = ref([]);
    // 加载状态
    const loading = ref(false);

    // 排序操作
    const sortChange = (e) => {
        console.log(e);
        if (e.order == null) {
            search.orderby = "id";
            search.sort = "desc";
        } else {
            search.orderby = e.prop;
            search.sort = e.order == "ascending" ? "asc" : "desc";
        }
        loadList(1);
    };
    // 设置页数多少
    const sizeChange = (e) => {
        search.pagesize = e;
        loadList(1);
    };

    // 加载宠物资讯列表方法
    const loadList = (page) => {
        // 加载
        if (unref(loading)) return;
        loading.value = true;
        search.page = page;

        http.post("/api/petlnformation/selectPages", search).then(
            (res) => {
                loading.value = false;
                if (res.code == 0) {
                    var data = res.data;
                    lists.value = data.lists.records;
                    totalCount.value = data.lists.total;
                }
            },
            (err) => {
                loading.value = false;
                ElMessage.error(err.message);
            }
        );
    };

    onBeforeMount(() => {
        loadList(1);
    });
    const selectRadio = (target, name) => {
        search[target] = name;
        searchSubmit(1);
    };

    const searchSubmit = (page = 1) => {
        loadList(1);
    };
    const mapclassification1 = DB.name("classification").field("id,names").order("id desc").selectRef();
</script>

<style scoped lang="scss">
    .views-petlnformation-index {
    }
</style>
