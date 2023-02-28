<script setup lang="ts">
import { defineProps } from 'vue';
const isShow = defineProps({
  collapse:Boolean
})
</script>

<template>
  <div :class="{'system-logo':!isShow.collapse, 'system-logo2':isShow.collapse }">
    <h2 className="booking-system">{{ 'B' }}</h2>
  </div>
</template>

<style scoped lang="scss">
.system-logo {
  width: 30px;
  height: 30px;
  position: relative;
  left:54px;
  border-radius: 10px;
  border-bottom: 5px solid #f48b52;
  border-top: 5px solid #52e9f4;
  border-left: 5px solid #f452b9;
  border-right: 5px solid #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;
  .booking-system {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
.system-logo2 {
  width: 30px;
  height: 30px;
  position: relative;
  left:15px;
  border-radius: 10px;
  border-bottom: 5px solid #f48b52;
  border-top: 5px solid #52e9f4;
  border-left: 5px solid #f452b9;
  border-right: 5px solid #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;

  .booking-system {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
