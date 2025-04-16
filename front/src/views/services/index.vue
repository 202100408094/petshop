<template>
    <div class="views-services-index">
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">宠物服务列表</h3>
                    <div class="sidebar-widget-body">
                        <form action="javascript:;" @submit="searchSubmit" class="form-search">
                            <table class="jd-search">
                                <tbody>
                                    <tr>
                                        <td class="label">类型</td>
                                        <td>
                                            <p class="search-radio">
                                                <a href="javascript:;" @click="selectRadio('type','')" :class="{active:!search.type}">全部</a>
                                                <a href="javascript:;" :class="{active:search.type == '美容'}" @click="selectRadio('type','美容')">美容</a>
                                                <a href="javascript:;" :class="{active:search.type == '洗澡'}" @click="selectRadio('type','洗澡')">洗澡</a>
                                                <a href="javascript:;" :class="{active:search.type == '驱虫'}" @click="selectRadio('type','驱虫')">驱虫</a>
                                                <a href="javascript:;" :class="{active:search.type == '其他'}" @click="selectRadio('type','其他')">其他</a>
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

                        <el-row :gutter="30">
                            <el-col v-for="r in lists" :md="6" :key="r.id" style="margin-bottom: 20px">
                                <article class="single_product v-module-xiezi">
                                    <figure>
                                        <div class="product_thumb" @click="$goto('/services/detail?id='+r.id)">
                                            <div class="label_product"></div>
                                            <e-img class="primary_img" :src="r.picture" pb="100" :is-scale="true" />
                                        </div>
                                        <figcaption class="product_content">
                                            <h4 class="product_name"><a href="javascript:;" @click="$goto('/services/detail?id='+r.id)"> {{ r.title }}</a></h4>
                                            <div class="price_box">
                                                <span class="current_price" v-if="r.price">￥{{ r.price }}</span>
                                            </div>
                                            <div class="add_to_cart">
                                                <a href="javascript:;" title="查看详情" @click="$goto('/services/detail?id='+r.id)">查看详情</a>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </article>
                            </el-col>
                        </el-row>

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
    import { canServicesSelect, useServicesSelect, canServicesDelete } from "@/module";
    import { extend } from "@/utils/extend";
    import { ElMessageBox, ElMessage } from "element-plus";

    const route = useRoute();
    const search = reactive({
        numbers: "",
        title: "",
        type: "",
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
     * @type {EServices[]}
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

    // 加载宠物服务列表方法
    const loadList = (page) => {
        // 加载
        if (unref(loading)) return;
        loading.value = true;
        search.page = page;

        http.post("/api/services/selectPages", search).then(
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
</script>

<style scoped lang="scss">
    .views-services-index {
    }
</style>
