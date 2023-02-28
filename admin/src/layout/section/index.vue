<template>
  <div className="card_area">
    <User></User>
  </div>
</template>
<script setup lang="ts">
import User from '@/view/user/index.vue';
</script>
<style scoped lang="scss">
.card_area {
  width: 98%;
  display: flex;
  align-self: center;
  margin-top: 10px;
}
</style>
