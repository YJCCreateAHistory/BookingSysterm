<template>
  <div id="dialog">
    <el-dialog v-model="dialogFormVisible" :title="db.title" width="500px" :modal="true">
      <div className="authority" v-if="db.title === '添加权限'">
        <div className="authorityList">
          <el-descriptions border :column="3" direction="vertical" style="width:100% !important">
            <el-descriptions-item label="待分配一级权限">
              <el-tag style="margin:5px" v-for="(key, value) in authorityList.list.firstAuthority"
                @click="setAuthority(key, value, 'f')">
                {{ key }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="待分配二级权限">
              <el-tag style="margin:5px" v-for="(key, value) in authorityList.list.secondAuthority"
                @click="setAuthorities(key, value, 's')">
                {{ key }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div className="showAuthority">
          <el-descriptions border :column="3" direction="vertical" style="width:100% !important">
            <el-descriptions-item label="已有一级权限">
              <el-tag style="margin:5px" v-for="(key, value) in ownProps.db.first" type="danger" closable
                @close="removeFirst(key, value)">
                {{ key }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="已有二级权限">
              <el-tag style="margin:5px" v-for="(key, value) in ownProps.db.second" type="danger" closable
                @close="removeSecond(key, value)">
                {{ key }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div className="userInfo" v-if="db.title === '修改用户信息'">
        <el-form label-width="140px">
          <el-form-item
            v-for="(key, value) in userinfo.db"
            v-if="isNoShowList.map(item=>item === value)"
            :label="value" :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]">
            <el-input :value="key" :disabled="disabledList.indexOf(value) !== -1"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer="scope">
        <span>
          <el-button @click="handle">{{ '提交' }}</el-button>
          <el-button @click="cancelSubmit">{{ '取消' }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, reactive, inject } from 'vue';
import { assginAuthority } from '@/api/authority';
import { useNotification } from '@/hooks/useNotification';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { objectTypes } from '@/types/index';
const store = useStore();
const router = useRouter();
const db = defineProps({
  isVisible: Boolean,
  authority: Object,
  title: String,
  ownAuthority: Object,
  uid: String,
  userinfo: Object
});
/**
 * @description 用户权限表单
*/
const authorityList = reactive<any>({ list: db.authority });
const ownProps = reactive<any>({ db: db.ownAuthority });
const dialogFormVisible = ref<boolean>(db.isVisible);
const emits = defineEmits<{ (thing: string, value: any): void }>();
// 设置权限
const setAuthorities = (key: string, value: number, cateFlag: string): void => {
  delete authorityList.list.value;
  switch (cateFlag) {
    case 'f':
      if (!ownProps.db.first[value]) ownProps.db.first[value] = key;
      else { useNotification('warning', '已经有这个权限啦~', 'Warning', 200); }
      break;
    case 's':
      if (!ownProps.db.second[value]) ownProps.db.second[value] = key;
      else useNotification('warning', '已经有这个权限啦~', 'Warning', 200);
      break;
    default:
      useNotification('warning', '已经有这个权限啦~', 'Warning', 200);
      break;
  };
};
// 移除
const removeFirst = (key: string, value: number): void => {
  delete ownProps.db.first[value];
};
const removeSecond = (key: string, value: number): void => {
  delete ownProps.db.second[value];
};
// 提交
const handle = async (): Promise<void> => {
  ownProps.db.uid = db.uid;
  const res = await assginAuthority<{ [key: string]: any }>(ownProps.db);
  if (res.status === 200) {
    store.dispatch('takeUsersList');
    dialogFormVisible.value = false;
    emits('takeNewUserAuthority', dialogFormVisible.value);
    emits('newAuthorityList', ownProps.db);
  }
};
const cancelSubmit = (): void => {
  dialogFormVisible.value = false;
  emits('takeNewUserAuthority', dialogFormVisible.value)
};

/**
 * @description 用户信息表单
*/
const userinfo = reactive({
  db: db.userinfo
});
const label = [
  {key: 1,label: 'ID'},
  {key: 2,label: '用户ID'},
  {key: 3,label: '姓名'},
  {key: 4,label: '电话'},
  {key: 5,label: '头像'},
  {key: 6,label: '院系'},
  {key: 7,label: '专业班级'},
  {key: 8,label: '创建时间'},
  {key: 9,label: '登录时间'},
  {key: 10,label: '更新时间'},
];
const disabledList = [
  'role', 'one_authority', 'two_authority', 'three_authority',
  'create_time', 'last_login', 'id', 'uid'
];
const isNoShowList = ['psd', 'role', 'one_authority', 'two_authority', 'three_authority'];
const newInfo = reactive({
  db: {
    id: '',
    uid: '',
    name: '',
    telephone: '',
    avatar:'',
    faculties:'',
    class:'',
    create_time:'',
    last_login:"",
    update_time:''
  }
});
</script>
<style scoped lang="scss">
#dialog {
  .authorityList {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 24px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;

    .el-tag {
      margin: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .showAuthority {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 24px;
    border-bottom: 1px solid #eee;
  }

}
</style>
