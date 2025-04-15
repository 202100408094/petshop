<template>
    <div class="views-staff-updt">
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
                        :rules="[{required:true, message:'请填写工号'}, {validator:rule.checkRemote, message:'内容重复了', checktype:'update', module:'staff', col:'number1', id:form.id, trigger:'blur'}]"
                    >
                        <el-input type="text" placeholder="输入工号" style="width: 450px" v-model="form.number1" />
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
    import { useStaffFindById, canStaffFindById, canStaffUpdate } from "@/module";

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
    const form = useStaffFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canStaffUpdate(form).then(
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
</script>

<style scoped lang="scss">
    .views-staff-updt {
    }
</style>
