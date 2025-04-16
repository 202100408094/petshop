<template>
    <div class="views-petlnformation-web-detail">
        <div>
            <e-container>
                <div class="news-info">
                    <h3 class="title" v-text="map.title"></h3>
                    <div class="descount">
                        <span class="title">
                            分类：
                            <e-select-view module="classification" :value="map.classification" select="id" show="names"></e-select-view>
                        </span>
                        <span class="title"> 点击率： {{ map.rate }} </span>
                        <span class="title"> 发布时间： {{ map.addtime }} </span>
                    </div>
                    <div class="content" v-html="map.content"></div>
                </div>
            </e-container>
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
    import { usePetlnformationFindById, canPetlnformationFindById } from "@/module";

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
    const loadWebFind = (id) => {
        http.post("/api/petlnformation/detailWeb", { id }).then((res) => {
            console.log(res.data);
        });
    };
    watch(() => props.id, loadWebFind, { immediate: true });

    /**
     * 获取详情页面的一行数据,当url参数id变更时，当url参数id变更时，自动更新map中的数据
     * @type {EPetlnformation}
     */
    const map = usePetlnformationFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canPetlnformationFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-petlnformation-web-detail {
    }
</style>
