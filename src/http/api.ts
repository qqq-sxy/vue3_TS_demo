import $http from "./index";

interface loginData {
  userName: string;
  password: string;
}

export const login = (data: loginData) =>
  $http({ url: "/login", method: "post", data });

export const getList = (data: any) =>
  $http({ url: "/getList", method: "pgetost", data });

export const getRoleList = () => $http({ url: "/getRoleList", method: "get" });

export const getUserList = () => $http({ url: "/getUserList", method: "get" });

export const getTauthority = () =>
  $http({ url: "/getTauthority", method: "get" });

export const getRouter = () => $http({ url: "/getRouter", method: "get" });
