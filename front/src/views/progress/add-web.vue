<template>
    <div class="views-progress-web-add">
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">结算订单</h3>
                    <div class="sidebar-widget-body">
                        <div class="order-checkout-info">
                            <div class="order-product-list">
                                <div class="order-checkout-title">
                                    <div class="product-item-title">确认商品信息</div>
                                </div>
                                <div style="margin-bottom: 10px" class="card-list-content">
                                    <div class="card-list-item card-list-item">
                                        <div class="card-info">
                                            <div class="card-info-title">商品信息</div>
                                        </div>
                                        <div class="card-price">
                                            <div class="card-price-now">商品价格</div>
                                        </div>
                                        <div class="card-number">
                                            <div class="card-price-now">购买数量</div>
                                        </div>
                                        <div class="card-total">
                                            <div class="card-price-now">小计</div>
                                        </div>
                                    </div>
                                    <div class="card-list-item" v-for="(item) in dataSets" :key="item.id">
                                        <div class="card-info">
                                            <div class="card-img">
                                                <e-img :src="item.picture" pb="100" />
                                            </div>

                                            <div class="card-content">
                                                <div class="card-title">{{ item.names }}</div>
                                            </div>
                                        </div>
                                        <div class="card-price">
                                            <div class="card-price-now price">￥{{ item.price }}</div>
                                        </div>
                                        <div class="card-number">{{ item.quantity }}</div>
                                        <div class="card-total price">￥<span class="card-total-span">{{ item.subtotal }}</span></div>
                                    </div>
                                </div>

                                <div class="order-checkout-title">
                                    <div class="product-item-title">填写订单信息</div>
                                </div>
                                <div class="order-checkout-form">
                                    <el-form :model="form" ref="formModel" label-position="right" label-width="140px" status-icon validate-on-rule-change>
                                        <el-form-item label="收货地址" prop="address" required :rules="[{required:true, message:'请填写收货地址'}]">
                                            <el-input type="text" placeholder="输入收货地址" style="width: 450px" v-model="form.address" />
                                        </el-form-item>
                                        <el-form-item
                                            label="联系电话"
                                            prop="phone"
                                            required
                                            :rules="[{required:true, message:'请填写联系电话'}, {validator:rule.checkPhone, message:'请输入正确手机号码'}]"
                                        >
                                            <el-input type="text" placeholder="输入联系电话" style="width: 450px" v-model="form.phone" />
                                        </el-form-item>
                                        <el-form-item label="收货人姓名" prop="fullname" required :rules="[{required:true, message:'请填写收货人姓名'}]">
                                            <el-input type="text" placeholder="输入收货人姓名" style="width: 450px" v-model="form.fullname" />
                                        </el-form-item>
                                        <el-form-item label="备注" prop="notes"> <el-input type="textarea" v-model="form.notes"></el-input> </el-form-item>
                                    </el-form>
                                </div>

                                <div class="card-bottom-fix">
                                    <div class="card-bottom-box">
                                        <div class="container-box">
                                            <div class="card-bottom-checkout">
                                                <div class="checkout-tips">共计 <i>{{ selectCount }}</i> 件商品，</div>
                                                <div class="checkout-price">
                                                    订单金额：<span class="price">￥<i>{{ orderTotal }}</i></span>
                                                </div>
                                                <a href="javascript:;" class="checkout-button" @click="submitCheckout">创建订单</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    import rule from "@/utils/rule";
    import router from "@/router";

    import { ref, reactive, computed, unref, watch } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useProgressCreateForm, canProgressInsert } from "@/module";
    import { extend } from "vue-design-plugin";

    const route = useRoute();
    const props = defineProps({
        btnText: {
            type: String,
            default: "",
        },
        isRead: {
            type: Boolean,
            default: true,
        },
        isHouxu: {
            type: Boolean,
            default: true,
        },
        labelWidth: {
            type: String,
            default: "140px",
        },
    });
    const { form } = useProgressCreateForm();
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);
    var submit = () => {
        return new Promise((resolve, reject) => {
            formModel.value
                .validate()
                .then((res) => {
                    if (loading.value) return;
                    loading.value = true;
                    canProgressInsert(form).then(
                        (res) => {
                            loading.value = false;
                            if (res.code == 0) {
                                emit("success", res.data);
                                if (props.isHouxu) {
                                    ElMessage.success("添加成功");
                                    formModel.value.resetFields();
                                }
                            } else {
                                ElMessageBox.alert(res.msg);
                            }
                            resolve(res);
                        },
                        (err) => {
                            loading.value = false;
                            ElMessageBox.alert(err.message);
                            reject(err);
                        }
                    );
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const dataSets = ref([]);
    const loaddataSets = async () => {
        if (route.query.liji) {
            dataSets.value = JSON.parse(sessionStorage.getItem("JSON") || "[]");
            form._lijigoumai = "1";
            form._JSON = dataSets.value;
            form._biao = "progressmerchbill";
        } else {
            dataSets.value = await DB.name("shoppingcart").where("userss", session("username")).where("id", "in", route.query.ids).order("id desc").select();
        }
    };
    loaddataSets();
    form.targetIds = route.query.ids; // 添加提交值
    const selectCount = computed(() => {
        var tmpList = unref(dataSets);
        var count = 0;
        for (var item of tmpList) {
            count += item.quantity;
        }
        return count;
    });

    const orderTotal = ref(0);
    watch(
        dataSets,
        () => {
            var tmpList = unref(dataSets);
            var total = 0;
            for (var item of tmpList) {
                total += item.price * item.quantity;
            }
            orderTotal.value = total.toFixed(2);
            form.money = total.toFixed(2);
        },
        { deep: true, immediate: true }
    );
    const submitCheckout = () => {
        submit()
            .then((res) => {
                if (res.code == 0) {
                    // 创建订单成功，跳转到支付页面
                    var row = res.data;
                    router.replace({
                        path: "/pay",
                        query: { biao: "progress", id: row.id, ordersn: row.orders, zongji: row.money, isShaxiang: "", redirect: "/admin/progress/userss" },
                    });
                }
            })
            .catch((err) => {});
    };
</script>

<style scoped lang="scss">
    .views-progress-web-add {
    }
</style>
