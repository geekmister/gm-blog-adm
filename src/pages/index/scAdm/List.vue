<template>
  <GuideBar :guide-state="guideState" @addArticle="addArticle"/>
  <SearchBar :searchTemplate="searchTemplate" @searchStart="searchStart" @searchReset="searchReset"/>
  <div class="table-container space-top-10">
    <a-table :columns="tableState.columns" :data-source="tableState.data"
             :pagination="tableState.pagination" :loading="tableState.loading">
      <template #bodyCell="{column, record}">
        <template v-if="column.key === 'icon'">
          <img class="logo-size-32" src="../../../assets/images/logo@2x.png">
        </template>
        <template v-else-if="column.key === 'action'">
          <a @click="detailsDrawerState.showDrawer">详情</a>
          <a class="space-left-10">编辑</a>
          <template v-if="record.status === 1">
            <a class="space-left-10">撤销</a>
          </template>
        </template>
      </template>
    </a-table>
  </div>
  <AddDrawer :visible="addDrawerState.visible" @closeDrawer="addDrawerState.closeDrawer"/>
  <DetailsDrawer :visible="detailsDrawerState.visible" @closeDrawer="detailsDrawerState.closeDrawer"/>
</template>

<script>
import {defineComponent, ref} from "vue";

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

import GuideBar from "../../../components/GuideBar.vue";
import SearchBar from "../../../components/SearchBar.vue";
import AddDrawer from "./components/AddDrawer.vue";
import DetailsDrawer from "./components/DetailsDrawer.vue";

export default defineComponent({
  name: "List",
  components: {DetailsDrawer, AddDrawer, SearchBar, GuideBar, PlusOutlined, LoadingOutlined},
  setup() {
    // 引导栏组件数据&事件
    const guideState = ref({
      routeState: [
        {name: "文章管理", path: "/index/article/index"},
        {name: "文章列表", path: "/index/article/list"}
      ],
      desc: "您可以在此页面查阅文章的相关信息！",
      btnState: [
        {name: "添加文章", event: "addArticle", type: "primary"}
      ]
    })
    const addArticle = () => {
      addDrawerState.value.showDrawer();
    }

    // 搜索栏数据&事件
    const categoryArray = [];
    const labelArray = [];
    let source = [
      {label: '已启用', value: 1},
      {label: '已禁用', value: 2}
    ]
    let searchTemplate = ref({
      size: 'default',
      buttonArray: [
        {type: 'default', name: '重置', event: 'searchReset'},
        {type: 'primary', name: '搜索', event: 'searchStart'}
      ],
      searchArray: [
        {
          order:0,
          type:'input',
          dataType: 'basic',
          name:'productName',
          placeholder: '请输入商品名称',
          defaultValue: '',
          zhCN: '商品名称',
        },
        {
          type: 'timeSelect',
          order: 1,
          name: 'createTime',
          zhCN: '创建时间',
          hasTime: true,
          dataType: 'array',
          defaultValue: [],
          placeholder: '请选择',
          placeholderEnd: '请选择',
        },
        {
          type:'cascade',
          order:2,
          name:'productCategory',
          zhCN: '商品分类',
          dataType: 'array',
          defaultValue: [],
          placeholder: '请选择分类',
          source:categoryArray,
        },
        {
          type:'select',
          order:3,
          name:'productLabel',
          zhCN: '商品标签',
          dataType: 'basic',
          defaultValue: '',
          placeholder: '请选择标签',
          source: labelArray,
        }
      ]
    });
    /**
     * @function searchStart
     * @desc 响应搜索
     * @ev {Object} 组件返回的搜索数据对象
     * */
    const searchStart = (ev)=>{
      pageData.current = 1;
      searchValue = ev;
      getProducts(ev);
    }

    /**
     * @function searchReset
     * @desc 响应搜索重置
     * */
    const searchReset = ()=>{
      pageData.current = 1;
      getProducts();
    }

    // 表格state
    const tableState = ref({
      columns: [
        {title: "图标", key: "icon", dataIndex: "icon"},
        {title: "名称", key: "name", dataIndex: "name"},
        {title: "状态", key: "status", dataIndex: "status"},
        {title: "发布时间", key: "releaseTime", dataIndex: "releaseTime"},
        {title: "创建时间", key: "createTime", dataIndex: "createTime"},
        {title: "操作", key: "action", dataIndex: "action", align: "right"}
      ],
      data: [
        {icon: "", name: "人生杂事", status: "已发布", releaseTime: "2022-07-19 14:22", createTime: "2022-07-19 14:22"},
        {icon: "", name: "人生杂事", status: "草稿", releaseTime: "-", createTime: "2022-07-19 14:22"}
      ],
      loading: false,
      pagination: {total: 0, current: 1, pageSize: 10}
    });

    // 添加专栏抽屉state
    const addDrawerState = ref({
      visible: false,
      showDrawer: () => {
        if(!addDrawerState.value.visible) {
          addDrawerState.value.visible = true;
        }
      },
      closeDrawer: (val) => {
        console.log("val:", val);
        addDrawerState.value.visible = val;
      }
    });

    // 专栏详情抽屉state
    const detailsDrawerState = ref({
      visible: false,
      showDrawer: () => {
        if(!detailsDrawerState.value.visible) {
          detailsDrawerState.value.visible = true;
        }
      },
      closeDrawer: (val) => {
        detailsDrawerState.value.visible = val;
      }
    });

    return {
      guideState, addArticle,
      searchTemplate, searchStart, searchReset,
      tableState,
      addDrawerState, detailsDrawerState
    }
  }
})
</script>

<style scoped>
.table-container {
  width: 100%; background-color: #FFFFFF; padding: 10px 10px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>