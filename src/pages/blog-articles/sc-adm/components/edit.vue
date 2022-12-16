<template>
  <t-drawer header="编辑文章专栏" :visible="props.visible" @close="closeDrawer" :close-btn="true" :confirm-btn="'保存'">
    <t-form labelAlign="left" colon="true">
      <t-form-item requiredMark="true" label="专栏名称" name="name">
        <t-input placeholder="请输入文章专栏名称" maxlength="10"/>
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script setup lang="jsx">
const props = defineProps({ visible: { type: Boolean } })

const emits = defineEmits(['closeDrawer']);
const closeDrawer = () => { emits('closeDrawer'); }
</script>

<style scoped>

</style>