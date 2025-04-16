<template>
    <div class="views-arrange-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加服务安排 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="标题 " prop="title"> {{ form.title }} </el-form-item>

                    <el-form-item v-if="isRead" label="编号 " prop="numbers"> {{ form.numbers }} </el-form-item>

                    <el-form-item v-if="isRead" label="类型 " prop="type"> {{ form.type }} </el-form-item>

                    <el-form-item v-if="isRead" label="价格 " prop="price" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]"> {{ form.price }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约单号 " prop="numberss"> {{ form.numberss }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约用户 " prop="userss"> {{ form.userss }} </el-form-item>

                    <el-form-item label="安排时间 " prop="times" :rules="[{required:true, message:'请填写安排时间'}]">
                        <el-date-picker v-model="form.times" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="服务人员 " prop="staff" required :rules="[{required:true, message:'请填写服务人员'}]">
                        <div style="width: 100%">
                            <e-select-list :model="form" v-model="form.staff" module="staff" select-update="number1,names" search-update=""></e-select-list>
                            <table>
                                <tr>
                                    <td width="120">工号</td>
                                    <td>{{ form.number1 }}</td>
                                </tr>
                                <tr>
                                    <td width="120">姓名</td>
                                    <td>{{ form.names }}</td>
                                </tr>
                            </table>
                        </div>
                    </el-form-item>

                    <el-form-item label="工号 " prop="number1"> <el-input type="text" placeholder="输入工号" style="width: 450px" v-model="form.number1" /> </el-form-item>

                    <el-form-item label="姓名 " prop="names"> <el-input type="text" placeholder="输入姓名" style="width: 450px" v-model="form.names" /> </el-form-item>

                    <el-form-item label="备注 " prop="notes"> <el-input type="textarea" v-model="form.notes"></el-input> </el-form-item>

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
    import { useArrangeCreateForm, canArrangeInsert } from "@/module";

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
    const { form, readMap } = useArrangeCreateForm(props.id);
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
                    canArrangeInsert(form).then(
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
    .views-arrange-add {
    }
</style>
