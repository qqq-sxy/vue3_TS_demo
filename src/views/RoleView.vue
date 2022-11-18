<template>
    <div>
        <div class="select-box">
            <!-- <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="角色">
                    <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
                        <el-option label="全部" :value="0" />
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form> -->
            <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
        <el-table border :data="list" style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="角色名" width="180" />
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <!-- 这里也看一下 -->
                    <el-button type="text" size="small" @click="authorityChange(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-dialog title="编辑" v-model="isShow">
            <el-form :model="active">
                <el-form-item label="姓名" label-width="50px">
                    <el-input placeholder="请输入姓名" v-model="active.nikeName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" label-width="50px">
                    <el-select v-model="active.role" multiple placeholder="请选择角色">
                        <el-option v-for="item in dataList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template v-slot:footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="userChange">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog> -->
    </div>
</template>

<script lang="ts">
import { ElMessageBox, ElMessage, ElButton, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../http/api'
import { InitData, ListInt } from '../types/role'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const data = reactive(new InitData())
        onMounted(() => {
            getRoleList().then(res => {
                data.list = res.data
                data.dataList = res.data
            })
        })

        const eidFun = (row: ListInt) => {
            console.log(1);

        }

        const authorityChange = (row: ListInt) => {
            console.log(1);
            router.push({
                path: 'authority',
                query: {
                    id: row.roleId,
                    authority: row.authority.join(',')
                }
            })

        }

        const addRole = () => {
            ElMessageBox.prompt('请输入角色名', '添加', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',

            })
                .then(({ value }) => {
                    if (value) {
                        data.list.unshift({
                            roleName: value,
                            roleId: data.list.length + 1,
                            authority: []
                        })
                    }
                    ElMessage({
                        type: "success",
                        message: "新增成功"
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消操作',
                    })
                })
        }
        return {
            ...toRefs(data),
            eidFun,
            authorityChange,
            addRole
        }
    }
})
</script>

<style scoped>
.select-box {
    margin-bottom: 20px;
}
</style>