<template>
    <div class="views-zhuye">
        <div>
            <el-carousel indicator-position="outside" height="620px">
                <el-carousel-item v-for="item in bhtList" :key="item.id">
                    <a href="javascript:;">
                        <div
                            style="background-size: cover"
                            @click="$goto(item.url)"
                            :style="{'background-image': 'url('+$formatImageSrc(item.image)+')',width:'100%', height: '620px'}"
                        ></div>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">
                        <div class="more">
                            <router-link to="/services">更多>></router-link>
                        </div>
                        宠物服务
                    </h3>
                    <div class="sidebar-widget-body">
                        <el-row :gutter="30">
                            <el-col v-for="r in serviceslist" :md="6" :key="r.id" style="margin-bottom: 20px">
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
                    </div>
                    <!-- /.sidebar-widget-body -->
                </div>
            </e-container>
        </div>
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">
                        <div class="more">
                            <router-link to="/goods">更多>></router-link>
                        </div>
                        宠物用品
                    </h3>
                    <div class="sidebar-widget-body">
                        <div class="floor_goods_wrap clearfix">
                            <el-row :gutter="20">
                                <el-col :md="6" v-for="r in goodslist">
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
                    </div>
                    <!-- /.sidebar-widget-body -->
                </div>
            </e-container>
        </div>
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">
                        <div class="more">
                            <router-link to="/petlnformation">更多>></router-link>
                        </div>
                        宠物资讯
                    </h3>
                    <div class="sidebar-widget-body">
                        <div class="hot-class">
                            <div class="listBoxs news-styles2">
                                <!-- 咨询容器开始 -->
                                <div class="p_news">
                                    <template v-for="r in petlnformationlist" :key="r.id">
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

    import { ref, reactive } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { resetDate } from "@/utils/date";

    const route = useRoute();
    // 获取轮播图信息
    const bhtList = DB.name("float1").order("id desc").limit(5).selectRef();

    /**
     * 定义响应式变量serviceslist,并获取数据宠物服务模块的数据
     * @type {UnwrapNestedRefs<EServices[]>}
     */
    const serviceslist = DB.name("services").limit("4").order("id desc").selectRef();

    /**
     * 定义响应式变量goodslist,并获取数据商品信息模块的数据
     * @type {UnwrapNestedRefs<EGoods[]>}
     */
    const goodslist = DB.name("goods").limit("8").order("rand()").selectRef();

    /**
     * 定义响应式变量petlnformationlist,并获取数据宠物资讯模块的数据
     * @type {UnwrapNestedRefs<EPetlnformation[]>}
     */
    const petlnformationlist = DB.name("petlnformation").limit("6").order("id desc").selectRef();
</script>

<style scoped lang="scss">
    .views-zhuye {
    }
</style>
