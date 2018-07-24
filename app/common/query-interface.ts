export declare interface Query {
  disabledPage?: boolean, // 是否禁用分页，true将会忽略`page`和`rows`参数
  page?: number,
  rows?: number
}

export declare type QueryResult<T> = {
  list: T[],
  total: number
} | T[] | T