<template>
    <div class="views-pet-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加宠物信息 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="宠物编号 " prop="numbers" :rules="[{required:true, message:'请填写宠物编号'}]">
                        <el-input type="text" placeholder="输入宠物编号" style="width: 450px" v-model="form.numbers" />
                    </el-form-item>

                    <el-form-item label="宠物名称 " prop="names" required :rules="[{required:true, message:'请填写宠物名称'}]">
                        <el-input type="text" placeholder="输入宠物名称" style="width: 450px" v-model="form.names" />
                    </el-form-item>

                    <el-form-item label="宠物类别 " prop="category" required :rules="[{required:true, message:'请填写宠物类别'}]">
                        <el-select v-model="form.category"
                            ><el-option label="猫" value="猫"></el-option>
                            <el-option label="狗" value="狗"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="宠物性别 " prop="gender">
                        <el-select v-model="form.gender"
                            ><el-option label="雌" value="雌"></el-option>
                            <el-option label="雄" value="雄"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="年龄 " prop="age" required :rules="[{required:true, message:'请填写年龄'}]">
                        <el-input type="text" placeholder="输入年龄" style="width: 450px" v-model="form.age" />
                    </el-form-item>

                    <el-form-item label="生活习惯 " prop="habit"> <el-input type="text" placeholder="输入生活习惯" style="width: 450px" v-model="form.habit" /> </el-form-item>

                    <el-form-item label="宠物简介 " prop="introduction"> <el-input type="textarea" v-model="form.introduction"></el-input> </el-form-item>

                    <el-form-item label="添加人 " prop="people"> <el-input v-model="form.people" readonly style="width: 250px"></el-input> </el-form-item>

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
    import { usePetFindById, canPetFindById, canPetUpdate } from "@/module";

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
    const form = usePetFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canPetUpdate(form).then(
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
    .views-pet-updt {
    }
</style>
