<template>
  <div className="card_area">
    <el-card :body-style="{ paddingBottom: '10px', paddingTop: '10px' }">
      <div className="operate_area">
        <el-input class="w-50 m-2" size="small" placeholder="Please Input" :suffix-icon="Search"
          input-style="width:10%" />
        <div className="right">
          <el-button type="primary">{{ '批量操作' }}</el-button>
          <el-button type="primary" :icon="Plus"></el-button>
          <el-button type="primary" :icon="Printer"></el-button>
        </div>
      </div>
      <div className="info_content">
        <el-table :data="userList.db" :border="true">
          <el-table-column type="expand" prop="expand" label="#">
            <template #default="scope">
              <div className="info"
                style="width: 100%;display: flex;justify-content: center;padding-top: 10px;padding-bottom: 10px;">
                <el-descriptions :title="'用户ID：' + scope.row.uid" style="width:98%;" :column="4" border
                  direction="vertical">
                  <el-descriptions-item label="用户名">
                    <span>{{ scope.row.name }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="手机号码">
                    <span>{{ scope.row.telephone }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="用户院系">
                    <span>{{ scope.row.faculties }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="班级">
                    <el-tag size="small">
                      {{ scope.row.class }}
                    </el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
              <div className="assignAuthority"
                style="width: 100%;display: flex;justify-content: center;padding-top: 10px;padding-bottom: 10px;">
                <el-descriptions title="用户权限分配" style="width:98%" :column="3" direction="vertical" border>
                  <el-descriptions-item label="一级权限">
                    <el-tag v-for='(key, value) in JSON.parse(scope.row.one_authority)' :key="scope.row.id" closable
                      @click="handelDelete(value, JSON.parse(scope.row.one_authority))"
                      style="margin:5px;cursor: pointer;">
                      {{ key }}
                    </el-tag>
                    <el-tag style="margin:5px;"
                      @click="setAuthority(JSON.parse(scope.row.two_authority), JSON.parse(scope.row.one_authority))">
                      +
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="二级权限">
                    <el-tag v-for='(key, value) in JSON.parse(scope.row.two_authority)' :key="scope.row.id" closable
                      @click="handelDelete(value, JSON.parse(scope.row.two_authority))" style="margin:5px;">
                      {{ key }}
                    </el-tag>
                    <el-tag style="margin:5px;cursor: pointer;"
                      @click="setAuthority(JSON.parse(scope.row.two_authority), JSON.parse(scope.row.one_authority))">
                      +
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="三级权限">
                    <el-tag closable @click="handelDelete(scope.row.three_authority)">
                      {{ scope.row.three_authority }}
                    </el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="item in listName" :key=item.key :prop="item.prop" :label="item.label"
            :width="item.label === 'id' ? '50px' : 'auto'" style='display: flex; justify-content: space-around;'>
            <template #default="scope" v-if="item.key === 4">
              <el-tag>{{ scope.row.role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="105px" prop="operate" label="操作" v-if="store.state.user.auth">
            <template #default="scope">
              <el-button type="primary" v-if="scope.row.role !== '超级管理员'" class="iconfont icon-bianjisekuai"
                @click="editUserinfo">&nbsp;{{ '编辑' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Pagination @sendPageHandle="receivePageChange"></Pagination>
      <Dialog v-if="dialogFormVisible" :ownAuthority="ownAuthority.db" :title="title" :isVisible="dialogFormVisible"
        :authority="authorityList.db" @takeNewUserAuthority="handleNewAuthority">
      </Dialog>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { Search, Plus, Printer } from '@element-plus/icons-vue';
import Pagination from '@/components/pagination/index.vue';
import Dialog from '@/components/dialog/index.vue';
const store = useStore();
// dialog弹窗
const dialogFormVisible = ref<boolean>(false);
const formLabelWidth = '140px';
const form = reactive<{ [key: string]: [] | string | boolean }>({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const userList = reactive({
  db: store.state.user.usersList[0]
});
const listName: Array<{ [key: string]: string | number }> = [
  { label: 'id', prop: 'id', key: 1 },
  { label: '用户id', prop: 'uid', key: 2 },
  { label: '姓名', prop: 'name', key: 3 },
  { label: '用户身份', prop: 'role', key: 4 },
  { label: '创建时间', prop: 'create_time', key: 5 },
  { label: '更新时间', prop: 'update_time', key: 6 },
  { label: '最后登录时间', prop: 'last_login', key: 7 },];
// 用户编辑
const editUserinfo = (index, value) => {
  dialogFormVisible.value = true;
};
const authorityList = reactive({ db: {} });
const title = ref<string>('添加权限')
// 拿到新权限
const handleNewAuthority = (val) => {
  dialogFormVisible.value = val;
};
// 添加权限
const ownAuthority = reactive({
  db: {}
});
const setAuthority = async (a1, a2) => {
  let temp: { [key: string]: string } = { ...JSON.parse(userList.db[0].one_authority), ...JSON.parse(userList.db[0].two_authority) };
  let own: { [key: string]: string } = { ...a1, ...a2 };
  dialogFormVisible.value = !dialogFormVisible.value;
  authorityList.db = temp;
  ownAuthority.db = own;
};
// 移除权限
const handelDelete = (val) => {

};
const receivePageChange = (val) => {
  userList.db = store.state.user.usersList[val.index];
};
// 搜索

// 编辑
const edit = reactive({
  db: {
    id: 0,
    uid: '',
    telephone: '',
    facluties: '',
    name: '',
    class: '',
    role: '',
    create_time: '',
    update_time: '',
    last_login: ''
  },
})
</script>
<style scoped lang="scss">
.card_area {
  width: 98%;
  display: flex;
  align-self: center;
  margin-top: 10px;

  .el-card {
    width: 100%;

    .breadcrumb {
      height: 40px;
      display: flex;
      border-bottom: 1px solid #eee;

      .el-breadcrumb {
        align-self: center;
      }
    }

    .operate_area {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .info_content {
      width: 100%;
      padding-top: 10px;

      .el-descriptions-item {
        display: flex;
        justify-content: space-between;
      }
    }

    .el-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

    }
  }
}
</style>
