<template>
    <div class="views-goods-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加商品信息 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="商品编号 " prop="numbers" :rules="[{required:true, message:'请填写商品编号'}]">
                        <el-input type="text" placeholder="输入商品编号" style="width: 450px" v-model="form.numbers" />
                    </el-form-item>

                    <el-form-item label="商品名称 " prop="names"> <el-input type="text" placeholder="输入商品名称" style="width: 450px" v-model="form.names" /> </el-form-item>

                    <el-form-item label="分类 " prop="ification" required :rules="[{required:true, message:'请填写分类'}]">
                        <el-select v-model="form.ification"><e-select-option type="option" module="classifications" value="id" label="names"></e-select-option></el-select>
                    </el-form-item>

                    <el-form-item label="商品图片 " prop="picture" required :rules="[{required:true, message:'请填写商品图片'}]">
                        <e-upload-images v-model="form.picture" is-paste></e-upload-images>
                    </el-form-item>

                    <el-form-item
                        label="商品价格 "
                        prop="price"
                        required
                        :rules="[{required:true, message:'请填写商品价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入商品价格" style="width: 450px" v-model.number="form.price" />
                    </el-form-item>

                    <el-form-item
                        label="商品库存 "
                        prop="inventory"
                        required
                        :rules="[{required:true, message:'请填写商品库存'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入商品库存" style="width: 450px" v-model.number="form.inventory" />
                    </el-form-item>

                    <el-form-item label="商品详情 " prop="details"> <e-editor v-model="form.details" @getContent="getdetailsContent"></e-editor> </el-form-item>

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
    import EEditor from "@/components/EEditor.vue";

    import { ref, reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useGoodsCreateForm, canGoodsInsert } from "@/module";
    import { extend } from "vue-design-plugin";

    const route = useRoute();
    const props = defineProps({
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
    const { form } = useGoodsCreateForm();
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
                    canGoodsInsert(form).then(
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

    const getdetailsContent = (v) => {
        form.details = v;
    };
</script>

<style scoped lang="scss">
    .views-goods-add {
    }
</style>
