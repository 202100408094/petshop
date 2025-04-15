<template>
    <footer class="footer">
        <div class="footer_con">
            <div class="con">
                <div class="nei">
                    <div class="div_nav">
                        <div class="links">
                            友情链接:
                            <a v-for="v in likeList" :href="v.url" target="_blank">{{v.names}}</a>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="lian">
                        <p>电话：xxx-xxxxxxxx</p>
                        <p>邮箱：xxxxxxx@xx.com</p>
                        <p>手机：1xx xxx xxx</p>
                        <p>地址：xxxxxxxxxxxxx</p>
                        <p>Copyright© 2022 版权所有：{{$order.title}}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<style type="text/scss" scoped lang="scss">
    .footer {
        background: url(@/assets/images/fonter_bg.png) no-repeat;
        overflow: hidden;
        padding-bottom: 40px;
        background-size: cover;
    }
    .footer .footer_con {
        max-width: 1240px;
        width: 98%;
        margin: 60px auto 20px;
        background: #ffffff;
        padding: 10px;
    }
    .footer .footer_con .con {
        border: 1px solid #f7f5ee;
    }
    .footer .footer_con .con .nei {
        width: 60%;
        margin: auto;
        padding: 60px 0px;
    }
    .footer .footer_con .con .nei .div_nav {
        width: 100%;
        margin-left: 150px;
    }
    .footer .footer_con .con .nei .div_nav li a {
        color: #666666;
        margin: 0 10px;
    }
    .footer .footer_con .con .nei .div_nav li a:hover {
        color: #81a849;
    }
    .footer .footer_con .con .nei .links {
        position: relative;
        color: #666666;
    }
    .footer .footer_con .con .nei .links a {
        color: #666666;
        margin: 0 10px;
    }

    .footer .footer_con .con .nei .lian {
        margin-top: 30px;
        color: #999999;
        font-size: 14px;
        text-align: center;
    }
    .footer .footer_con .con .nei .lian a {
        color: #999999;
    }
    .footer .footer_con .con .nei .lian .er_a {
        position: relative;
        width: 90px;
        cursor: pointer;
    }
    .footer .footer_con .con .nei .lian .er_a .er_img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 83px;
        height: 83px;
        z-index: 99999;
        display: none;
    }
    .footer .copy {
        color: #999999;
        line-height: 22px;
        text-align: center;
    }
</style>

<script>
    import DB from "@/utils/db";
    import config from "@/config";
    export default {
        data() {
            return {
                $order: config,
                likeList: [],
            };
        },
        methods: {
            async loadListMenu(module, target) {
                this[target] = await DB.name(module).order("id desc").select();
            },
        },
        created() {
            this.loadListMenu("link", "likeList");
        },
    };
</script>
