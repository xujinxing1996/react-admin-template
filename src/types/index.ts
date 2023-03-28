export type PageData<T> = {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
};
