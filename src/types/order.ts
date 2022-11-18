export interface ListInt {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface SelectDateInt {
  title: string;
  body: string;
  page: number;
  count: number;
}

export class InitData {
  selectData: SelectDateInt = {
    title: "",
    body: "",
    page: 0,
    count: 0,
  };
  list: [ListInt][] = []; //这个了解一下

  dataList: ListInt[] = [];
}
