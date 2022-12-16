<template>
  <t-drawer header="文章专栏详情" :visible="props.visible" @close="closeDrawer" :close-btn="true" :footer="false">
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta title="专栏名称" description="思维游戏训练"/>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta title="创建时间" description="2022-12-16 18:42"/>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta title="更新时间" description="2022-12-16 18:42"/>
      </t-list-item>
    </t-list>
  </t-drawer>
</template>

<script setup lang="jsx">
const props = defineProps({ visible: { type: Boolean } })

const emits = defineEmits(['closeDrawer']);
const closeDrawer = () => { emits('closeDrawer'); }
</script>

<style scoped>

</style>