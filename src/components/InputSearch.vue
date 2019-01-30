<template>
  <div>
    <div class="index">
      <div class="keyword">
        <el-input
          v-model="keyword"
          @change="keywordChange"
          clearable>
            <template slot="prepend">搜索</template>
        </el-input>

      </div>
      <div class="date">
        <span class="label">时间</span>
          <el-date-picker
            v-model="date"
            type="date"
            style="width: 200px"
            placeholder="选择日期"
            @change="dateChange">
          </el-date-picker>
      </div>
     <!-- <Table
      border
      :loading="loadingtGet"
      :columns="columnsGet"
      :data="tableList"
      size="small"
    ></Table> -->
    <el-table
      v-loading="loadingtGet"
      :data="tableList"
      style="width: 100%">
      <template v-for="(col ,index) in columnsGet">
          <el-table-column :prop="col.prop" :label="col.label"></el-table-column>
      </template>
  </el-table>
    <div class="pagination">
      <!-- <Page
        show-sizer
        show-total
        :current="paginationGet.current"
        :total="paginationGet.total"
        :page-size="paginationGet.pageSize"
        :page-size-opts="paginationGet.pageSizeOpts"
        @on-change="paginationChange"
        @on-page-size-change="paginationSizeChange"
      ></Page> -->
      <el-pagination
        layout="prev, pager, next"
        :current-page="paginationGet.current"
        :total="paginationGet.total"
        :page-size="paginationGet.pageSize"
        @current-change="paginationChange"
        @size-change="paginationSizeChange">
      </el-pagination>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import {
  INDEX_KEYWORD,
  INDEX_DATE,
  INDEX_TABLE_LIST,
  INDEX_LOADING,
  INDEX_PAGINATION,
  INDEX_COLUMNS
} from "../store/mutation-types";

import { InterTableInfo, InterPagination } from "../store/modules/search";

@Component
export default class InputSearch extends Vue {
  // getter
  @Getter(INDEX_KEYWORD) public keywordGet: string;
  @Getter(INDEX_DATE) public dateGet: string;
  @Getter(INDEX_TABLE_LIST) public tableListGet: InterTableInfo[];
  @Getter(INDEX_LOADING) public loadingtGet: boolean;
  @Getter(INDEX_PAGINATION) public paginationGet: InterPagination;
  @Getter(INDEX_COLUMNS) public columnsGet: string;

  // data
  public keyword: string = "";  // 搜索
  public date: string = "";  // 时间
  public tableList: InterTableInfo[] = [];  // 列表

  // action
  @Action(INDEX_KEYWORD) public keywordAct: (val: string) => void;
  @Action(INDEX_DATE) public dateAct: (val: string) => void;
  @Action(INDEX_TABLE_LIST) public tableListAct: () => void;
  @Action(INDEX_PAGINATION) public paginationAct: (val: InterPagination) => void;
  // watch
  @Watch("tableListGet")
  public tableListGetWatch(list: InterTableInfo[]): void {
    this.tableList = list;
  }
   // methods
  public initDate() {  // 初始化data
    this.keyword = this.keywordGet;
    this.date = this.dateGet;
    this.tableList = this.tableListGet;
  }

  public keywordChange(event: any): void {  // keyword 监听
    this.keywordAct(event.target.value);
    this.tableListAct();
  }

  public dateChange(val: string) {  // date 监听
    this.dateAct(val);
    this.tableListAct();
  }

  public paginationChange(val: number): void {
    console.log("paginationChange", val);
    const newPagination: InterPagination = {
      ...this.paginationGet,
      current: Number(val),
    };
    this.paginationAct(newPagination);
    this.tableListAct();
  }

  public paginationSizeChange(val: number): void {
    console.log("paginationSizeChange: ", val);
    const newPagination: InterPagination = {
      ...this.paginationGet,
      pageSize: Number(val),
    };
    this.paginationAct(newPagination);
    this.tableListAct();
  }

  // hook
  public mounted(): void {
    this.initDate();
    this.tableListAct();
  }
}
</script>
<style scoped lang="scss">
.index {
  padding: 50px 40px;
  .sift {
    position: relative;
    height: 32px;
    margin-bottom: 20px;
    .keyword {
      position: absolute;
      width: 300px;
      left: 0;
    }
    .date {
      position: absolute;
      width: 300px;
      right: 0;
      text-align: right;
      .label {
        height: 32px;
        border: 1px solid #dddee1;
        display: inline-block;
        vertical-align: top;
        padding: 7px;
        background: #eeeeee;
        margin-right: -5px;
      }
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
