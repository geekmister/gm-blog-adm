<template>
  <GuideBar :guide-state="guideState" @addArticle="addArticle"></GuideBar>
  <SearchBar :searchTemplate="searchTemplate" @searchStart="searchStart"
             @searchReset="searchReset"></SearchBar>
  <div class="list-container space-top-10">
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listState">
      <template #renderItem="{item}">
        <a-list-item key="item.title" style="width: 100%;">
          <template #extra>
            <div class="list-item-zoom-container">
              <img width="235" height="100" alt="zoom" src="../../../assets/images/samples/sample1.png"/>
            </div>
          </template>
          <a-list-item-meta :description="item.abstract">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          <div class="list-item-release-info-container space-left-10">
            <img class="logo-size-20" src="../../../assets/images/logo@2x.png">
            <a class="space-left-10">{{item.author}}</a>
            <span class="space-left-5">发布在</span>
            <a class="space-left-5" href="https://gk.coderflyer.com">gk.coderflyer.com</a>
            <span class="space-left-20 list-item-release-info-time">{{item.publishTime}}</span>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

import GuideBar from "../../../components/GuideBar.vue";
import SearchBar from "../../../components/SearchBar.vue";

export default defineComponent({
  name: "List",
  components: {SearchBar, GuideBar},
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
    const addArticle = (e) => {
      console.log("e:", e)
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

    // 列表数据&事件
    const listState = ref([
      {
        title: "早起晚归到底为了啥？",
        scs: [{id: 1, name: "生活杂事"}, {id: 2, name: "人生感悟"}],
        abstract: "如果 10年前，我一心 “坚持” 下去了汽车装潢，可能我现在会是一家装潢店的老板，也许是连锁店，也许是一家店， 也许我已经在新疆的某个小城市买到了一套房子，也许已经有了孩子。如果在当时我在八里村把 “地摊” 升级成了 “店面”，那么我可能已经还上了西安的房贷，享受（紧握）着手里那一点点希望的安全感。如果当时我再多开一家店，可能我现在会是一个 “批发羊毛党”，和那些朋友们一样，时常讨论京东618又出什么赔本活动了。如…",
        zoom: "",
        author: "极客先生",
        head: "",
        publishTime: "2020-10-01 18:00"
      },
      {
        title: "早起晚归到底为了啥？",
        scs: [{id: 1, name: "生活杂事"}, {id: 2, name: "人生感悟"}],
        abstract: "如果 10年前，我一心 “坚持” 下去了汽车装潢，可能我现在会是一家装潢店的老板，也许是连锁店，也许是一家店， 也许我已经在新疆的某个小城市买到了一套房子，也许已经有了孩子。如果在当时我在八里村把 “地摊” 升级成了 “店面”，那么我可能已经还上了西安的房贷，享受（紧握）着手里那一点点希望的安全感。如果当时我再多开一家店，可能我现在会是一个 “批发羊毛党”，和那些朋友们一样，时常讨论京东618又出什么赔本活动了。如…",
        zoom: "",
        author: "极客先生",
        head: "",
        publishTime: "2020-10-01 18:00"
      }
    ])
    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    };

    return {
      guideState, addArticle,
      searchTemplate, searchStart, searchReset,
      listState, pagination
    }
  }
})
</script>

<style scoped>
.list-container {
  width: 100%;
  padding-bottom: 10px;
  padding-right: 10px;
  background-color: #FFFFFF;
}
.list-item-zoom-container {
  height: 100%;
  width: 235px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.list-item-release-info-container {
  display: flex; flex-direction: row; justify-content: flex-start; align-items: center;
}
.list-item-release-info-time {
  width: 113px;
  height: 22px;
  font-family: HelveticaNeue;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0,0,0,0.25);
  line-height: 22px;
}
</style>