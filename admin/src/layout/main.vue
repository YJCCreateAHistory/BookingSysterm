<script setup lang="ts">
import Header from '@/layout/header/index.vue';
import SectionBody from '@/layout/section/index.vue';
import { defineEmits, ref } from 'vue';

const emits = defineEmits();
const dealIsCollapse = (val: boolean): void => {
  emits('takeIsCollapse', val); // 传递数据

}
</script>

<template>
  <div className="right_area">
    <Header @handleIsCollapse="dealIsCollapse"></Header>
    <SectionBody></SectionBody>
  </div>
</template>

<style scoped lang=scss>
.right_area {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
