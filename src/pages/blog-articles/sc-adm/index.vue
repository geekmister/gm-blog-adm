<template>
  <t-space direction="vertical">
    <div class="search-container">
      <t-form layout="inline" label-align="left" colon="true" label-width="80px">
        <t-form-item label="分类名称" name="name" >
          <t-input placeholder="请输入分类名称"/>
        </t-form-item>
        <t-form-item label-width="0px">
          <t-button theme="primary" type="sumbit">查询</t-button>
          <t-button theme="default" type="reset">重置</t-button>
        </t-form-item>
      </t-form>
      <t-button theme="primary" @click="openAddDrawer">新建专栏</t-button>
    </div>
    <t-base-table
      row-key="index"
      :data="data"
      :columns="columns"
      :stripe="stripe"
      :bordered="bordered"
      :hover="hover"
      :table-layout="tableLayout ? 'auto' : 'fixed'"
      :size="size"
      :pagination="pagination"
      :show-header="showHeader"
      cell-empty-content="-"
      @row-click="handleRowClick"
    />
    <template #action="{ row }">
      <p>{{row}}</p>
    </template>
  </t-space>
  <Add :visible="isVisibleAddDrawer" @closeDrawer="closeAddDrawer"></Add>
  <Edit :visible="isVisibleEditDrawer" @closeDrawer="closeEditDrawer"></Edit>
  <Details :visible="isVisibleDetailsDrawer" @closeDrawer="closeDetailsDrawer"></Details>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import Add from '../sc-adm/components/add.vue';
import Edit from '../sc-adm/components/edit.vue';
import Details from '../sc-adm/components/details.vue';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};
const columns = ref([
  {
    // 序号列，设置 colKey = serial-number 即可
    colKey: 'serial-number',
    title: '序号',
    width: '64',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column',
      style: {},
    },
  },
  { colKey: 'name', title: '分类名称'},
  { colKey: 'createTime', title: '创建时间' },
  { colKey: 'updateTime', title: '更新时间' },
  { colKey: 'action', title: '操作',
    cell: (h, { row }) => {
      return (
          <t-space direction="horizontal">
            <t-link theme="primary" onClick={openEditDrawer}>编辑</t-link>
            <t-link theme="primary" onClick={openDetailsDrawer}>详情</t-link>
            <t-link theme="primary">删除</t-link>
          </t-space>
      )
    }
  },
]);
const data = [
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']},
  {index: '0', name: '形象思维训练', createTime: '2022-12-02 16:31', updateTime: '2022-12-02 16:31', action: ['编辑', '删除']}
];
const total = 28;


const stripe = ref(true);
const bordered = ref(true);
const hover = ref(false);
const tableLayout = ref(false);
const size = ref('medium');
const showHeader = ref(true);

const handleRowClick = (e) => {
  console.log(e);
};

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 5,
  total,
};

let isVisibleAddDrawer = ref(false);
const openAddDrawer = () => { isVisibleAddDrawer.value = true; }
const closeAddDrawer = () => { isVisibleAddDrawer.value = false; }

let isVisibleEditDrawer = ref(false);
const openEditDrawer = () => { isVisibleEditDrawer.value = true; }
const closeEditDrawer = () => { isVisibleEditDrawer.value = false; }

let isVisibleDetailsDrawer = ref(false);
const openDetailsDrawer = () => { isVisibleDetailsDrawer.value = true; }
const closeDetailsDrawer = () => { isVisibleDetailsDrawer.value = false; }
</script>

<style scoped>
  .search-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 20px;
    background-color: var(--td-bg-color-container);
  }
</style>