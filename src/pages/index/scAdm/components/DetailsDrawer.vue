<template>
  <a-drawer title="添加专栏" :placement="'right'" :visible="drawerState.visible" @close="drawerState.onClose">
    <a-list item-layout="horizontal" :data-source="listState">
      <template #renderItem="{ item }">
        <a-list-item>
          <span>{{item.label}}</span>
          <template v-if="item.label === '图标'">
            <img src="../../../../assets/images/logo@2x.png"/>
          </template>
          <template v-else>
            <span>{{item.value}}</span>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-drawer>
</template>

<script>
import {defineComponent, ref, onBeforeUpdate} from "vue";

export default defineComponent({
  name: "DetailsDrawer",
  props: {
    visible: Boolean
  },
  setup(props, ctx) {

    // 抽屉state
    const drawerState = ref({
      visible: props.visible,
      onClose: () => {
        drawerState.value.visible = false;
        ctx.emit("closeDrawer", drawerState.value.visible);
      }
    });

    // 列表state
    const listState = ref([
      {label: "图标", value: ""}, {label: "名称", value: "生活杂事"}, {label: "描述", value: "生活杂事"},
      {label: "创建时间", value: "2022-08-01 17:25"}, {label: "发布时间", value: "2022-08-01 17:25"},
      {label: "撤销时间", value: "2022-08-01 17:25"}
    ]);

    onBeforeUpdate(() => {
      drawerState.value.visible = props.visible;
    })

    return {
      drawerState, listState
    }
  }
})
</script>

<style scoped>

</style>