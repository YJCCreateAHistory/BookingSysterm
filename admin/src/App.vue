<script setup lang="ts">
import { nextTick, provide, ref} from 'vue';
// 刷新
const forceUpdate = ref<boolean>(true);
const reload = ():void=>{
  forceUpdate.value = false;
  nextTick(():void=>{
    forceUpdate.value = true;
  })
}
provide('forceUpdate', reload);
</script>
<template>
  <router-view></router-view>
</template>
<style scoped>

</style>
