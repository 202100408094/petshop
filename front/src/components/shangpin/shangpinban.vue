<template>
    <div class="thumb-example">
        <!-- 顶部主轮播图 -->
        <swiper
            class="top-swiper"
            :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
            :modules="modules"
            :space-between="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
        >
            <!-- 动态渲染轮播图幻灯片，遍历 fileList 数组 -->
            <swiper-slide class="slide" v-for="(imageUrl, index) in fileList" :key="index">
                <e-img :src="imageUrl" alt="Slide Image" pb="80" />
            </swiper-slide>
        </swiper>
        <!-- 缩略图轮播图 -->
        <swiper
            class="thumbs-swiper"
            :modules="modules"
            :space-between="10"
            :slides-per-view="4"
            :watch-slides-progress="true"
            :prevent-clicks="false"
            :prevent-clicks-propagation="false"
            @swiper="setThumbsSwiper"
        >
            <!-- 动态渲染缩略图幻灯片，遍历 fileList 数组 -->
            <swiper-slide class="slide" v-for="(imageUrl, index) in fileList" :key="index">
                <img :src="imageUrl" alt="Thumbnail Image" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { Navigation, Thumbs } from "swiper/modules";
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/thumbs";
    import { formatImageSrc } from "@/utils";
    const props = defineProps({
        images: String,
    });
    // 定义一个 ref 来存储缩略图 Swiper 实例
    const thumbsSwiper = ref(null);

    // 定义一个函数，用于设置缩略图 Swiper 实例
    const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
    };

    // 定义要使用的 Swiper 模块
    const modules = [Navigation, Thumbs];

    // 定义图片文件列表
    const fileList = computed(() => {
        if (props.images) {
            return props.images.split(",").map((s) => formatImageSrc(s));
        }
        return [];
    });
</script>

<style lang="scss" scoped>
    .thumb-example {
        height: 400px;
    }

    .top-swiper,
    .thumbs-swiper {
        .slide {
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    .sile-viewer {
        img {
            position: absolute;
        }
    }

    .top-swiper {
        height: 80%;
        width: 100%;
    }

    .thumbs-swiper {
        height: 20%;
        box-sizing: border-box;

        .slide {
            width: 25%;
            height: 100%;
            opacity: 1;
            border: 1px solid #fff;
            &:not(.swiper-slide-thumb-active) {
                opacity: 0.8;
                border: none;
            }
        }
    }
</style>
<script>
    export default {
        name: "e-shangpinban",
    };
</script>
