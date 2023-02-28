<template>
  <div id="menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <Logo :collapse="collapse.isCollapse"></Logo>
      <el-menu :collapse="collapse.isCollapse" background-color="#1a212e" default-active="1" text-color="#fff"
        active-text-color="#5290f4">
        <el-sub-menu v-for="item in menuList" :key="item.key" :index="item.key">
          <template #title>
            <i :class="item.icon">
            </i>&nbsp;&nbsp;
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="child in item.children " :key="child.key" :index="child.key" style="display:flex;align-items: center;justify-content: space-between;">
            <i :class="child.icon">
            </i>&nbsp;&nbsp;
            <span>{{ child.label }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
import Logo from '@/layout/logo/index.vue';
import { defineProps } from 'vue';
const collapse = defineProps({
  isCollapse: Boolean
});
const menuList = [
  {
    label: '站点主页', key: '1', icon: 'iconfont icon-zhandianrenling', children: [
      { label: '数据统计', icon: 'iconfont icon-zhandianshujutongji', key: '1-1' }
    ]
  },
  {
    label: '用户中心', key: '2', icon: 'iconfont icon-yonghuzhongxin',
    children: [
      { label: '用户列表', icon: 'iconfont icon-liebiao', key: '2-1' },
      { label: '信息中心', icon: 'iconfont icon-fasongyoujian', key: '2-2' }
    ]
  },
  {
    label: '审批中心', key: '3', icon: 'iconfont icon-lishijilu_huaban', children: [
      { label: '借用审批', icon: 'iconfont icon-zichanjieyong', key: '3-1' },
      { label: '归还审批', icon: 'iconfont icon-danganguanli-danganguihuan', key: '3-2' }
    ]
  },
  {
    label: '汇总中心', key: '4', icon: 'iconfont icon-daohang-shujufenxi', children: [
      { label: '借用记录', icon: 'iconfont icon-lishijilu_huaban', key: '4-1' },
      { label: '损坏上报', icon: 'iconfont icon-wenjiansunhuai1', key: '4-2' }
    ]
  },
  {
    label: '通信中心', key: '5', icon: 'iconfont icon-tongxin-', children: [
      {
        label: '通信记录', icon: 'iconfont icon-lishijilu_huaban', key: '5-1'
      }
    ]
  }
]
</script>

<style scoped lang="scss">
#menu {
  height: 100vh;
  background-color: #1a212e;

  .el-menu {
    border: 0;
  }
}
</style>
