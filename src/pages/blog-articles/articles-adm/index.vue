<template>
  <t-space direction="vertical" style="width: 100%">
    <div class="search-container">
      <t-form layout="inline" label-align="left" colon="true" label-width="80px">
        <t-form-item label="文章名称" name="name" >
          <t-input placeholder="请输入文章名称"/>
        </t-form-item>
        <t-form-item label-width="0px">
          <t-button theme="primary" type="sumbit">查询</t-button>
          <t-button theme="default" type="reset">重置</t-button>
        </t-form-item>
      </t-form>
      <t-button theme="primary" @click="">添加文章</t-button>
    </div>
    <t-list :split="true">
      <template v-for="item in stateArticles">
        <t-list-item>
          <div class="list-item-container">
            <div class="list-item-top-container">
              <t-space>
                <t-image :src="item.cover" :style="{ width: '235px', height: '100px' }"/>
                <div>
                  <h1>{{item.title}}</h1>
                  <p>{{item.desc}}</p>
                </div>
              </t-space>
            </div>
            <t-divider/>
            <div class="list-item-btm-container">
              <t-button>预览</t-button>
              <t-button>编辑</t-button>
              <t-button>发布</t-button>
            </div>
            <t-tag class="list-item-status">草稿</t-tag>
          </div>
        </t-list-item>
      </template>
    </t-list>
  </t-space>
</template>

<script setup lang="jsx">
 let stateArticles = [
   {cover: "https://tdesign.gtimg.com/demo/demo-image-1.png", title: "逻辑思维", desc: "逻辑思维"},
   {cover: "https://gd-hbimg.huaban.com/4da650d30aa5aaa4deffcff3a4fb7dc1e609bf2513862e-vejLzc", title: "逻辑思维", desc: "逻辑思维"},
   {cover: "https://tdesign.gtimg.com/demo/demo-image-1.png", title: "逻辑思维", desc: "逻辑思维"},
   {cover: "https://gd-hbimg.huaban.com/4da650d30aa5aaa4deffcff3a4fb7dc1e609bf2513862e-vejLzc", title: "逻辑思维", desc: "逻辑思维"}
 ]
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
  .list-item-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
  .list-item-top-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .list-item-btm-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
  .list-item-status {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>