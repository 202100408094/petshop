<template>
    <div class="views-progress-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加订单 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="订单号 " prop="orders" :rules="[{required:true, message:'请填写订单号'}]">
                        <el-input type="text" placeholder="输入订单号" style="width: 450px" v-model="form.orders" />
                    </el-form-item>

                    <el-form-item label="商品信息 " prop="merchbill">
                        <div id="dataListmerchbill" style="text-align: left">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>商品编号</th>
                                        <th>商品名称</th>
                                        <th>分类</th>
                                        <th>商品图片</th>
                                        <th>商品价格</th>
                                        <th>购买数量</th>
                                        <th>小计</th>
                                        <th>购买用户</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="dataMap in dataSets">
                                        <td>{{ dataMap.numbers }}</td>
                                        <td>{{ dataMap.names }}</td>
                                        <td><e-select-view module="classifications" :value="dataMap.ification" select="id" show="names"></e-select-view></td>
                                        <td>
                                            <div style="width: 100%; max-width: 120px">
                                                <e-img :src="dataMap.picture" type="list"></e-img>
                                            </div>
                                        </td>
                                        <td>{{ dataMap.price }}</td>
                                        <td>{{ dataMap.quantity }}</td>
                                        <td>{{ dataMap.subtotal }}</td>
                                        <td>{{ dataMap.userss }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-form-item>

                    <el-form-item
                        label="订单金额 "
                        prop="money"
                        required
                        :rules="[{required:true, message:'请填写订单金额'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入订单金额" style="width: 450px" v-model.number="form.money" />
                    </el-form-item>

                    <el-form-item label="收货地址 " prop="address" required :rules="[{required:true, message:'请填写收货地址'}]">
                        <el-input type="text" placeholder="输入收货地址" style="width: 450px" v-model="form.address" />
                    </el-form-item>

                    <el-form-item
                        label="联系电话 "
                        prop="phone"
                        required
                        :rules="[{required:true, message:'请填写联系电话'}, {validator:rule.checkPhone, message:'请输入正确手机号码'}]"
                    >
                        <el-input type="text" placeholder="输入联系电话" style="width: 450px" v-model="form.phone" />
                    </el-form-item>

                    <el-form-item label="收货人姓名 " prop="fullname" required :rules="[{required:true, message:'请填写收货人姓名'}]">
                        <el-input type="text" placeholder="输入收货人姓名" style="width: 450px" v-model="form.fullname" />
                    </el-form-item>

                    <el-form-item label="备注 " prop="notes"> <el-input type="textarea" v-model="form.notes"></el-input> </el-form-item>

                    <el-form-item label="下单用户 " prop="userss"> <el-input v-model="form.userss" readonly style="width: 250px"></el-input> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form></el-card
            >
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import rule from "@/utils/rule";
    import router from "@/router";

    import { ref, reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useProgressFindById, canProgressFindById, canProgressUpdate } from "@/module";

    const route = useRoute();
    const props = defineProps({
        id: [String, Number],
        btnText: {
            type: String,
            default: "保存",
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
    const form = useProgressFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canProgressUpdate(form).then(
                (res) => {
                    loading.value = false;
                    if (res.code == 0) {
                        emit("success", res.data);
                        if (props.isHouxu) {
                            ElMessage.success("更新成功");
                            router.go(-1);
                        }
                    } else {
                        ElMessageBox.alert(res.msg);
                    }
                },
                (err) => {
                    loading.value = false;
                    ElMessageBox.alert(err.message);
                }
            );
        });
    };

    const dataSets = DB.name("progressmerchbill").where("progressid", route.query.id).order("id asc").selectRef();
</script>

<style scoped lang="scss">
    .views-progress-updt {
    }
</style>
