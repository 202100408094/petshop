<template>
    <div class="views-services-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加宠物服务 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="编号 " prop="numbers" :rules="[{required:true, message:'请填写编号'}]">
                        <el-input type="text" placeholder="输入编号" style="width: 450px" v-model="form.numbers" />
                    </el-form-item>

                    <el-form-item label="标题 " prop="title" required :rules="[{required:true, message:'请填写标题'}]">
                        <el-input type="text" placeholder="输入标题" style="width: 450px" v-model="form.title" />
                    </el-form-item>

                    <el-form-item label="类型 " prop="type" required :rules="[{required:true, message:'请填写类型'}]">
                        <el-select v-model="form.type"
                            ><el-option label="美容" value="美容"></el-option>
                            <el-option label="洗澡" value="洗澡"></el-option>
                            <el-option label="驱虫" value="驱虫"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="图片 " prop="picture" required :rules="[{required:true, message:'请填写图片'}]">
                        <e-upload-images v-model="form.picture" is-paste></e-upload-images>
                    </el-form-item>

                    <el-form-item label="价格 " prop="price" required :rules="[{required:true, message:'请填写价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        <el-input type="number" placeholder="输入价格" style="width: 450px" v-model.number="form.price" />
                    </el-form-item>

                    <el-form-item label="要求 " prop="requires"> <el-input type="text" placeholder="输入要求" style="width: 450px" v-model="form.requires" /> </el-form-item>

                    <el-form-item label="内容 " prop="content"> <e-editor v-model="form.content" @getContent="getcontentContent"></e-editor> </el-form-item>

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
    import { useServicesFindById, canServicesFindById, canServicesUpdate } from "@/module";

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
    const form = useServicesFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canServicesUpdate(form).then(
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

    const getcontentContent = (v) => {
        form.content = v;
    };
</script>

<style scoped lang="scss">
    .views-services-updt {
    }
</style>
