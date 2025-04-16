<template>
    <div class="views-petlnformation-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加宠物资讯 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item
                        label="标题 "
                        prop="title"
                        required
                        :rules="[{required:true, message:'请填写标题'}, {validator:rule.checkRemote, message:'内容重复了', checktype:'update', module:'petlnformation', col:'title', id:form.id, trigger:'blur'}]"
                    >
                        <el-input type="text" placeholder="输入标题" style="width: 450px" v-model="form.title" />
                    </el-form-item>

                    <el-form-item label="分类 " prop="classification" required :rules="[{required:true, message:'请填写分类'}]">
                        <el-select v-model="form.classification"><e-select-option type="option" module="classification" value="id" label="names"></e-select-option></el-select>
                    </el-form-item>

                    <el-form-item label="内容 " prop="content" required :rules="[{required:true, message:'请填写内容'}]">
                        <e-editor v-model="form.content" @getContent="getcontentContent"></e-editor>
                    </el-form-item>

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
    import { usePetlnformationFindById, canPetlnformationFindById, canPetlnformationUpdate } from "@/module";

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
    const form = usePetlnformationFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canPetlnformationUpdate(form).then(
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
    .views-petlnformation-updt {
    }
</style>
