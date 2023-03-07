<template>
  <div id="header">
    <div className="container">
      <div className="left">
        <div @click="handleIsExpand">
          <el-icon v-if="isCollapse">
            <Expand />
          </el-icon>
          <el-icon v-if="!isCollapse">
            <Fold />
          </el-icon>
        </div>
      </div>
      <div className="right">
        <div className="web_message">
          <el-dropdown>
            <el-icon>
              <ChatDotRound />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="View">站内信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div className="admin_avatar">
          <el-avatar :src="avatarUrl" />
        </div>
        <div className="admin_setting">
          <el-dropdown>
            <el-icon>
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Setting">网站设置</el-dropdown-item>
                <el-dropdown-item :icon="User">信息管理</el-dropdown-item>
                <el-dropdown-item :icon="Switch" @click="exit">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Setting, User, Switch, View } from '@element-plus/icons-vue';
import { defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { removeToken } from '@/utils/token';
const store = useStore();
const router = useRouter();
let isCollapse = ref<any>(false);
const emits = defineEmits();
const avatarUrl = ref<string>(store.state.user.avatar);
const handleIsExpand = () => {
  isCollapse.value = !isCollapse.value;
  emits('handleIsCollapse', isCollapse.value); // 传递数据
}
// 退出登录
const exit = async () => {
  const arr:string[] = [];
  const temp = JSON.parse(JSON.stringify(store.state)); // Proxy=>Object
  for(const [key, value] of Object.entries(temp)) {
    arr.push(key);
  }
  store.commit('removeAllProfile', {key:arr, value:{}});
  removeToken('accessToken', 'vuex');
  await router.push({
    name: 'Login'
  })
  ElNotification({
          title: 'Success',
          message: '退出成功',
          type: 'success',
        })
}
</script>


<style scoped lang="scss">
#header {
  width: 100%;
  height: 50px;
  background-color: #1a212e;
  display: flex;

  .container {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .left {
      -webkit-transform: translateX(10px);
      -moz-transform: translateX(10px);
      transform: translateX(10px);
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
      .el-icon svg {}
      .el-icon {
        color: #fff !important;
        font-size: 16px;
      }
    }
    .right {
      width: 150px;
      display: flex;
      justify-content: space-around;
      .web_message,
      .admin_avatar,
      .admin_setting {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;

        &:hover {
          cursor: pointer;
        }
      }
      .web_message {
        .el-icon svg {}

        .el-icon {
          color: #fff !important;
        }
      }
      .admin_setting {
        .el-icon svg {}
        .el-icon {
          color: #fff !important;
        }
      }
    }
  }
}
</style>
