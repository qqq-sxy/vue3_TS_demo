<template>
    <div class="login-box">
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="70px" class="loginForm">
            <h1>后台管理系统</h1>
            <!-- prop属性绑定的字段名，在表单验证的时候，就会验证el-input元素绑定的loginForm.userName是否符合验证规则 -->
            <el-form-item label="账号：" prop="userName">
                <el-input v-model="loginForm.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button class="submit-btn" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
//这三个组件是干嘛的啊？
import { defineComponent, reactive, toRefs } from "vue";
//reactive用来创建响应式对象，它接收一个对象/数组参数，返回对象的响应式副本，当该对象的属性值发生变化，会自动更新使用该对象的地方
import type { FormInstance } from "element-plus";
import { useRouter } from 'vue-router'

import { InitData } from '../types/login'
import { login } from '../http/api'

export default defineComponent({
    setup() {
        const data = reactive(new InitData());
        const router = useRouter()
        const rules = {//表单验证规则
            userName: [
                { required: true, meessage: '请输入账号', trigger: 'blur' },
                { min: 6, max: 24, meessage: '账号长度需要在6-24之间', trigger: 'blur' }
            ],
            password: [
                { required: true, meessage: '请输入账号', trigger: 'blur' },
                { min: 6, max: 24, meessage: '账号长度需要在6-24之间', trigger: 'blur' }
            ],
        };
        const submitForm = (loginFormRef: FormInstance) => {
            loginFormRef.validate((valid: boolean) => {
                if (valid) {
                    // alert("验证通过，发送请求")
                    login(data.loginForm).then(res => {
                        // console.log(res);
                        localStorage.setItem("token", res.data.token)
                        router.push('/')

                    })
                }
            })//这个是啥意思
        }
        return {
            ...toRefs(data),
            rules,
            submitForm
        };
    },
});
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    box-sizing: border-box;
    padding-top: 90px;

    .loginForm {
        width: 400px;
        padding: 20px;
        background: #fff;
        border-radius: 20px;
        margin: 0 auto;

        .submit-btn {
            width: 100%;
        }

        h1 {
            text-align: center;
            margin: 10px 0;
        }


    }
}
</style>

