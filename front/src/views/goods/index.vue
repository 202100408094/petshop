<template>
    <div class="views-goods-index">
        <div>
            <e-container>
                <div class="floor_goods_wrap clearfix">
                    <div style="margin-bottom: 20px">
                        <form action="javascript:;" @submit="searchSubmit" class="form-search">
                            <table class="jd-search">
                                <tbody>
                                    <tr>
                                        <td class="label">分类</td>
                                        <td>
                                            <p class="search-radio">
                                                <a href="javascript:;" @click="selectRadio('ification','')" :class="{active:!search.ification}">全部</a>
                                                <a
                                                    href="javascript:;"
                                                    v-for="r in mapclassifications2"
                                                    @click="selectRadio('ification',r.id)"
                                                    :class="{active:search.ification == r.id}"
                                                    v-text="r.names"
                                                >
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="label">商品名称</td>
                                        <td>
                                            <el-input type="text" style="width: 150px" v-model="search.names" placeholder="请输入关键词"> </el-input>
                                            <el-button type="success" @click="searchSubmit">搜索</el-button>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </form>
                    </div>
                    <el-row :gutter="20">
                        <el-col :md="6" v-for="r in lists">
                            <div class="floor_goods_wrap_li">
                                <div class="floor_goods_wrap_b">
                                    <router-link :to="{path:'/goods/detail',query:{id:r.id}}" class="floor_goods_img">
                                        <e-img :src="r.picture" pb="100"></e-img>
                                    </router-link>
                                    <router-link :to="{path:'/goods/detail',query:{id:r.id}}" class="floor_goods_tit" v-html="$substr(r.names,20)"></router-link>
                                    <router-link :to="{path:'/goods/detail',query:{id:r.id}}" class="floor_goods_txt" v-html="$substr(r.details,20)"></router-link>
                                    <router-link :to="{path:'/goods/detail',query:{id:r.id}}" class="floor_goods_price"> ￥{{ r.price }}元 </router-link>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
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
    import { canGoodsSelect, useGoodsSelect, canGoodsDelete } from "@/module";
    import { extend } from "@/utils/extend";
    import { ElMessageBox, ElMessage } from "element-plus";

    const route = useRoute();
    const search = reactive({
        numbers: "",
        names: "",
        ification: "",
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
     * @type {EGoods[]}
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

    // 加载商品信息列表方法
    const loadList = (page) => {
        // 加载
        if (unref(loading)) return;
        loading.value = true;
        search.page = page;

        http.post("/api/goods/selectPages", search).then(
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
    const mapclassifications2 = DB.name("classifications").field("id,names").order("id desc").selectRef();
</script>

<style scoped lang="scss">
    .views-goods-index {
    }
</style>
