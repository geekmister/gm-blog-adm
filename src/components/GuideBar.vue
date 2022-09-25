<template>
  <div class="pagebar-container">
    <div class="notify-container">
      <a-breadcrumb>
        <template v-for="item in guideState.routeState">
          <a-breadcrumb-item>
            <router-link :to="item.path">{{item.name}}</router-link>
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
      <span>{{guideState.desc}}</span>
    </div>
    <div class="btn-container">
      <template v-if="guideState.btnState.length > 0">
        <template v-for="item in guideState.btnState">
          <a-button :type="item.type" @click="btnClickEvent(item.event)">{{item.name}}</a-button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "GuideBar",
  props: {
    guideState: {
      type: Object, default: () => {return {}}
    }
  },
  setup(props, ctx) {
    const {guideState} = props;

    const btnClickEvent = (event) => {
      ctx.emit(event, null)
    }

    return {
      guideState, btnClickEvent
    }
  }
})
</script>

<style scoped>
.pagebar-container {
  display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; height: 70px;
  background-color: #FFFFFF; padding-left: 10px; padding-right: 10px;
}
.notify-container {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
}
.btn-container {
  display: flex; flex-direction: row; justify-content: flex-start; align-items: center;
}
</style>