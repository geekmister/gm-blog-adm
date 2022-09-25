<template>
  <div class="page-search-card-div">
    <div :class="['page-search-card-row-div',isCollapse?'searchCollapse':'autoHeight']"
         :style="{maxHeight:isCollapse?`${remainHeight+10}px`:'none'}">
      <a-row :justify="space-between">
          <template v-for="(item,index) in searchArray" :key="index">
            <template v-if="item.type === 'input'">
              <a-col :span="6">
                <div class="formItem">
                  <span class="itemLabel">{{ item.zhCN }}：</span>
                  <div class="formInput">
                    <a-input type="text" :size="formSize" :data-remain="remainHeight"
                             v-model:value="searchForm[item.name]" :placeholder="item.placeholder||''"></a-input>
                  </div>
                </div>
              </a-col>
            </template>
            <template v-else-if="item.type === 'number'">
              <a-col :span="6">
                <div class="formItem">
                  <span class="itemLabel">{{ item.zhCN }}：</span>
                  <div class="formInput">
                    <a-input-number :size="formSize" :data-remain="remainHeight"
                                    v-model:value="searchForm[item.name]" :placeholder="item.placeholder||''"
                                    :controls="Boolean(item.showControls)" :max="item.max||null" :min="item.min||0"></a-input-number>
                  </div>
                </div>
              </a-col>
            </template>
            <template v-else-if="item.type === 'select'">
              <a-col :span="6">
                <div class="formItem">
                  <span class="itemLabel">{{ item.zhCN }}：</span>
                  <div class="formInput">
                    <a-select type="text" :size="formSize" class="page-search-card-condition-item-common"
                              v-model:value="searchForm[item.name]" :placeholder="item.placeholder?item.placeholder:'请选择'">
                      <a-select-option v-for="(entry,i) in item.source" :key="i" :value="entry.value">{{ entry.label }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
              </a-col>
            </template>
            <template v-else-if="item.type === 'cascade'">
              <a-col :span="6">
                <div class="formItem">
                  <span class="itemLabel">{{ item.zhCN }}：</span>
                  <div class="formInput">
                    <a-cascader v-model:value="searchForm[item.name]" :options="item.source"
                                :size="formSize" :placeholder="item.placeholder?item.placeholder:'请选择'" :field-names="item.field?item.field:{}"></a-cascader>
                  </div>
                </div>
              </a-col>
            </template>
            <template v-else-if="item.type === 'timeSelect'">
              <a-col :span="12">
                <div class="formItem">
                  <span class="itemLabel">{{ item.zhCN }}：</span>
                  <div class="formInput">
                    <a-range-picker
                        :show-time="item.hasTime?{ format: 'HH:mm' }:false" :size="formSize"
                        format="YYYY-MM-DD HH:mm" :placeholder="[(item.placeholder||'开始时间'), (item.placeholderEnd||'结束时间')]" v-model:value="searchForm[item.name]"/>
                  </div>
                </div>
              </a-col>
            </template>
          </template>
      </a-row>
    </div>
    <div class="page-search-card-btn-div" style="margin-top: 10px">
      <a-button :type="item.type" v-for="(item,index) in buttonArray" :key="index" @click="handleClick(item)"
                :size="buttonSize" style="margin-left: 5px;">{{ item.name }}
      </a-button>
    </div>
  </div>
</template>

<script>
  import {toRefs, reactive, ref, defineComponent} from "vue";

  export default defineComponent({
    name: "SearchBar",
    props: {
      searchTemplate: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    setup(props, ctx) {
      // 拆解父组件传入的属性
      let {searchTemplate} = props;
      let {searchArray, buttonArray, size: formSize} = searchTemplate;

      // 拼装响应式数据
      formSize = ref(formSize);
      let buttonSize = ref(formSize);
      let isCollapse = ref(false);

      // 拼装搜索表单
      let searchForm = {};
      let searchKeys = searchArray.map(item => {
        return {
          name: item.name,
          dataType: item.dataType,
          defaultValue: item.defaultValue ? item.defaultValue : undefined};
      })

      // 这里要判断数据类型赋给字段对应的空值，否则会报无法赋值给undefined的错误
      searchKeys.forEach(item => {
        switch (item.dataType){
          case "basic":
            searchForm[item.name] = item.defaultValue?item.defaultValue:undefined;
            break
          case "array":
            searchForm[item.name] = item.defaultValue?item.defaultValue:[];
            break
        }
      })
      searchForm = reactive(searchForm);

      // 判断搜索表单的单行行高，数据来着ant-design的组件高度
      let remainHeight;
      switch (formSize.value) {
        case 'large':
          remainHeight = ref(40);
          break;
        case 'default':
          remainHeight = ref(32);
          break;
        case 'small':
          remainHeight = ref(24);
          break;
        default:
          remainHeight = ref(32);
          break;
      }

      /**
       * @function handleClick
       * @desc 监听表单按钮的点击事件
       * @param item:模板数组中的某个元素
       */
      const handleClick = (item) => {
        if (item.event === 'searchCollapse') {

          // 当触发折叠事件时调用这个函数
          formCollapse();

        } else if (item.event === 'searchReset') {

          // 这里将表单的数据全部置空，然后发送给上层组件
          for (let p in searchForm) {
            if (searchForm.hasOwnProperty(p)) {
              if (Array.isArray(searchForm[p])) {
                searchForm[p] = [];
              } else {
                searchForm[p] = undefined;
              }
            }
          }
          ctx.emit(item.event, searchForm)

        } else {

          /* 这里是一个hack,用于解决点击搜索后报“无法给undefined设置属性”的错误。
          这样会把undefined或null过滤掉，因此基本型只能赋值为空字符串 */

          ctx.emit(item.event, JSON.parse(JSON.stringify(searchForm)));
        }
      };

      /**
       * @function formCollapse
       * @desc 根据点击事件判断是否要展开或折叠表单
       */
      const formCollapse = () => {
        let index = buttonArray.findIndex(item => {
          return item.name === '折叠' || item.name === '展开';
        })
        if (index > -1) {
          buttonArray[index].name = buttonArray[index].name === '折叠' ? '展开' : '折叠'
        }
        isCollapse.value = !isCollapse.value;
      }

      // 渲染用数据
      const data = reactive({
        searchArray,
        buttonArray
      })

      return {
        isCollapse,
        formSize,
        remainHeight,
        buttonSize,
        formCollapse,
        handleClick,
        searchForm,
        buttonArray,
        ...toRefs(data),
      }
    },
  })
</script>

<style scoped>
  .page-search-card-div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 10px 10px 10px;
    width: 100%;
    margin-top: 10px;
    background: #ffffff;
  }

  .page-search-card-row-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .page-search-card-btn-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .page-search-card-condition-item-common {
    min-width: 150px;
  }


  .formItem {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-right: 10px;
  }

  .autoHeight {
    transition: max-height ease-out 0.3s;
  }

  .searchCollapse {
    transition: max-height ease-out 0.3s;
    overflow: hidden;
  }
</style>