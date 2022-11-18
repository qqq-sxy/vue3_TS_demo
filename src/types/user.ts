export interface ListInt {
  id: number;
  nikeName: string;
  userName: string;
  role: RoleInt[];
}

export interface ActiveInt {
  id: number;
  nikeName: string;
  userName: string;
  role: number[];
}

interface RoleInt {
  role: number;
  roleName: string;
}

interface SelectDateInt {
  nikeName: string;
  role: number;
}

interface RoleListInt {
  roleName: string;
  roleId: number;
  suthorty: number[];
}

export class InitData {
  selectData: SelectDateInt = {
    nikeName: "",
    role: 0,
  };
  list: [ListInt][] = []; //这个了解一下
  listDate: [ListInt][] = [];
  roleList: RoleListInt[] = [];
  active: ActiveInt = {
    id: 0,
    nikeName: "",
    userName: "",
    role: [],
  };
  isShow = false;
}
