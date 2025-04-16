<template>
    <div class="views-services-web-detail">
        <div>
            <e-container>
                <div class="">
                    <div class="goods-info clearfix">
                        <div class="gallery-list">
                            <e-shangpinban :images="map.picture"></e-shangpinban>
                        </div>
                        <div class="goods-right-content">
                            <h3 class="title" v-text="map.title"></h3>
                            <div class="descount">
                                <div>
                                    <span class="name"> 编号： </span>
                                    <span class="val"> {{ map.numbers }} </span>
                                </div>
                                <div>
                                    <span class="name"> 类型： </span>
                                    <span class="val"> {{ map.type }} </span>
                                </div>
                                <div>
                                    <span class="name"> 价格： </span>
                                    <span class="val"> {{ map.price }} </span>
                                </div>
                                <div>
                                    <span class="name"> 要求： </span>
                                    <span class="val"> {{ map.requires }} </span>
                                </div>
                                <div>
                                    <span class="name"> 发布时间： </span>
                                    <span class="val"> {{ map.addtime }} </span>
                                </div>
                            </div>

                            <el-form :model="reservationForm" ref="reservationFormElement" v-show="$session.username"> </el-form>


                            <template v-if="$session.cx == '用户'">
                                <el-button style="margin-right: 20px"   type="primary" @click="$router.push('/reservation/add?id='+map.id)">服务预约</el-button>

                            </template>


                        </div>
                    </div>
                    <div class="goods-content" v-html="map.content"></div>
                </div>
            </e-container>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import router from "@/router";
    import rule from "@/utils/rule";
    import EShangpinban from "@/components/shangpin/shangpinban.vue";

    import { ref, reactive, watch, computed, unref } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { extend } from "@/utils/extend";
    import { useServicesFindById, canServicesFindById, canReservationCreateForm, canReservationInsert } from "@/module";
    import { ElLoading, ElMessage, ElMessageBox } from "element-plus";

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
     * @type {EServices}
     */
    const map = useServicesFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canServicesFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据

    const reservationForm = ref({});
    const readMap = ref({});
    const reservationFormElement = ref(null);

    watch(
        () => map,
        async () => {
            if (!map.id || !session("username")) return;

            var s = await canReservationCreateForm(map.id, map);
            reservationForm.value = s.form;
            readMap.value = s.readMap;
        },
        { deep: true }
    );

    const onAddCard = async () => {
        if (!session("username")) {
            var r = await ElMessageBox.confirm("请先登录");
            router.push({ path: "/login", query: { redirect: route.fullPath } });
            return;
        }
        reservationFormElement.value.validate().then(async () => {
            const loadingInstance = ElLoading.service({
                fullscreen: true,
                lock: true,
                text: "正在提交...",
            });
            try {
                const res = await canReservationInsert(reservationForm.value);
                loadingInstance.close();
                if (res.code == 0) {
                    ElMessage.success("添加服务预约成功");
                } else {
                    ElMessage.error(res.msg);
                }
            } catch (e) {
                ElMessage.error(e.message);
                loadingInstance.close();
            }
        });
    };
</script>

<style scoped lang="scss">
    .views-services-web-detail {
    }
</style>
