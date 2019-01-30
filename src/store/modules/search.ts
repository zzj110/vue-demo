import {
  INDEX_KEYWORD,
  INDEX_DATE,
  INDEX_TABLE_LIST,
  INDEX_LOADING,
  INDEX_PAGINATION,
  INDEX_COLUMNS
} from '../mutation-types'

import { Commit } from 'vuex'
import { Loading, Pagination } from 'element-ui'

/** 格式 约束 */
export interface InterTableInfo {  // 表格 行单元接口
  name: string
  age: number
  address: string
  date: string
}


export interface InterColumn {   // 表格 表头信息接口
  prop: string
  label: string
  type?: string
}


export interface InterColumnRenderObj {  // table render obj
  index: number
  column: InterColumn
  row: InterTableInfo
}

export interface InterPagination {  // 分页 接口
  current: number
  total: number
  pageSize: number
  pageSizeOpts: number[]
}



export interface InterState {  // store 接口
  keyword: string
  date: string
  tableList: InterTableInfo[]
  loading: boolean
  pagination: InterPagination
  columns: InterColumn[]
}


const state: InterState = {
  keyword:'test',
  date:'2019-02-04',
  tableList:[],
  loading:false,
  pagination: {  // 分页
    current: 1,
    total: 0,
    pageSize: 1,
    pageSizeOpts: [1, 10, 20, 30, 40]
  },
  columns: [{  // 表头信息
    prop: 'Name',
    label: 'name'
  }, {
    prop: 'Age',
    label: 'age'
  }, {
    prop: 'Address',
    label: 'address'
  }]

}

// mutations
const mutations = {
  [INDEX_KEYWORD](orgState: InterState, value: string): void {
    orgState.keyword = value
  },
  [INDEX_DATE](orgState: InterState, value: string): void {
    orgState.date = value
  },
  [INDEX_TABLE_LIST](orgState: InterState, value: InterTableInfo[]): void {
    orgState.tableList = value
  },
  [INDEX_LOADING](orgState: InterState, value: boolean): void {
    orgState.loading = value
  },
  [INDEX_PAGINATION](orgState: InterState, value: InterPagination): void {
    orgState.pagination = value
  }
}

// actions
const actions = {
  [INDEX_KEYWORD](context: {commit: Commit,state: InterState},value: string): void {
    context.commit(INDEX_KEYWORD,value)
  },
  [INDEX_DATE](context: { commit: Commit, state: InterState }, value: number): void {
    context.commit(INDEX_DATE, value)
  },
  [INDEX_TABLE_LIST](context: { commit: Commit, state: InterState }): void {
    console.log(`keyword:${state.keyword}  date:${state.date}`)
    context.commit(INDEX_LOADING, true)  // 加载动画 开启
    setTimeout(() => {
      context.commit(INDEX_TABLE_LIST, [...state.tableList, {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      }])
      context.commit(INDEX_PAGINATION, {  // 初始化分页
        ...state.pagination,
        current: 1,
        total: state.tableList.length
      })
      context.commit(INDEX_LOADING, false)  // 加载动画 结束
    }, 1000)

  },
  [INDEX_PAGINATION](context: { commit: Commit, state: InterState }, value: InterPagination): void {
    context.commit(INDEX_PAGINATION, value)
  }

}


// getters
const getters = {
  [INDEX_KEYWORD]: (orgState: InterState) => orgState.keyword,
  [INDEX_DATE]: (orgState: InterState) => orgState.date,
  [INDEX_TABLE_LIST]: (orgState: InterState) => orgState.tableList,
  [INDEX_LOADING]: (orgState: InterState) => orgState.loading,
  [INDEX_PAGINATION]: (orgState: InterState) => orgState.pagination,
  [INDEX_COLUMNS]: (orgState: InterState) => orgState.columns
}

const search = {
  state,
  getters,
  mutations,
  actions
}
export default search

