<template>
    <div class="views-staff-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加员工 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item
                        label="工号 "
                        prop="number1"
                        required
                        :rules="[{required:true, message:'请填写工号'}, {validator:rule.checkRemote, message:'内容重复了', checktype:'insert', module:'staff', col:'number1', trigger:'blur'}]"
                    >
                        <el-input type="text" placeholder="输入工号" style="width: 450px" v-model="form.number1" />
                    </el-form-item>

                    <el-form-item label="密码 " prop="password" required :rules="[{required:true, message:'请填写密码'}]">
                        <el-input type="password" placeholder="输入密码" style="width: 450px" v-model="form.password" />
                    </el-form-item>

                    <el-form-item label="姓名 " prop="names" required :rules="[{required:true, message:'请填写姓名'}]">
                        <el-input type="text" placeholder="输入姓名" style="width: 450px" v-model="form.names" />
                    </el-form-item>

                    <el-form-item label="性别 " prop="gender" required :rules="[{required:true, message:'请填写性别'}]">
                        <el-select v-model="form.gender"
                            ><el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="联系电话 "
                        prop="phone"
                        required
                        :rules="[{required:true, message:'请填写联系电话'}, {validator:rule.checkPhone, message:'请输入正确手机号码'}]"
                    >
                        <el-input type="text" placeholder="输入联系电话" style="width: 450px" v-model="form.phone" />
                    </el-form-item>

                    <el-form-item label="入职日期 " prop="date" :rules="[{required:true, message:'请填写入职日期'}]">
                        <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="简介 " prop="introduction"> <el-input type="textarea" v-model="form.introduction"></el-input> </el-form-item>

                    <el-form-item label="头像 " prop="picture"> <e-upload-image v-model="form.picture" is-paste></e-upload-image> </el-form-item>

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
    import { useStaffCreateForm, canStaffInsert } from "@/module";
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
    const { form } = useStaffCreateForm();
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
                    canStaffInsert(form).then(
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
</script>

<style scoped lang="scss">
    .views-staff-add {
    }
</style>
