<script setup lang="ts">
import Sider from '@/layout/sider/index.vue';
import Main from '@/layout/main.vue';
import { ref } from 'vue';
const isCollapsed = ref<boolean>(false);
const juageIsCollapse = (val: boolean): void => {
  isCollapsed.value = val;
}
</script>

<template>
  <div id="layout">
    <el-container>
      <el-aside width="auto"
      height="100%" style="background-color:#1a212e;">
        <Sider :isCollapse="isCollapsed"></Sider>
      </el-aside>
      <el-container>
        <Main @takeIsCollapse="juageIsCollapse"></Main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
#layout {
  width: 100%;
  height: auto;
  background-color: #eee;
  position: relative;
  display: flex;
}
</style>
