<template>
    <div class="views-outbound-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加用品出库 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="商品编号 " prop="numbers"> {{ form.numbers }} </el-form-item>

                    <el-form-item v-if="isRead" label="商品名称 " prop="names"> {{ form.names }} </el-form-item>

                    <el-form-item v-if="isRead" label="分类 " prop="ification">
                        <e-select-view module="classifications" :value="form.ification" select="id" show="names"></e-select-view>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="商品价格 " prop="price" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]"> {{ form.price }} </el-form-item>

                    <el-form-item label="出库编号 " prop="numbers1" :rules="[{required:true, message:'请填写出库编号'}]">
                        <el-input type="text" placeholder="输入出库编号" style="width: 450px" v-model="form.numbers1" />
                    </el-form-item>

                    <el-form-item
                        label="出库数量 "
                        prop="quantity"
                        required
                        :rules="[{required:true, message:'请填写出库数量'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入出库数量" style="width: 450px" v-model.number="form.quantity" />
                    </el-form-item>

                    <el-form-item label="出库说明 " prop="describes">
                        <el-input type="text" placeholder="输入出库说明" style="width: 450px" v-model="form.describes" />
                    </el-form-item>

                    <el-form-item label="经手人 " prop="handler"> <el-input v-model="form.handler" readonly style="width: 250px"></el-input> </el-form-item>

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
    import { useOutboundCreateForm, canOutboundInsert } from "@/module";

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
    const { form, readMap } = useOutboundCreateForm(props.id);
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
                    canOutboundInsert(form).then(
                        (res) => {
                            loading.value = false;
                            if (res.code == 0) {
                                emit("success", res.data);
                                if (props.isHouxu) {
                                    ElMessage.success("添加成功");
                                    router.go(-1);
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
</script>

<style scoped lang="scss">
    .views-outbound-add {
    }
</style>
