import type { FormInstance } from "element-plus";
import { ref } from "vue";

export interface LoginFormInt {
  userName: string;
  password: string;
}

export class InitData {
  loginForm: LoginFormInt = {
    userName: "",
    password: "",
  };
  //这个泛型好好了解一下
  loginFormRef = ref<FormInstance>();
}
