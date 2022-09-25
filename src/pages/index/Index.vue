<template>
  <MainLayout></MainLayout>
</template>

<script>
import {defineComponent} from "vue";

import MainLayout from "./MainLayout.vue";

export default defineComponent({
  name: "index",
  components: {MainLayout},
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>