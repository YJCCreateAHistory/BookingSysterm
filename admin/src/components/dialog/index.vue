<template>
  <div id="dialog">
    <el-dialog v-model="dialogFormVisible" :title="db.title" width="500px" :modal="true">
      <div className="authority">
        <div className="authorityList">
          <el-tag v-for="(key, value) in authorityList.list" @click="setAuthority(key, value)">
            {{ key }}
          </el-tag>
        </div>
        <div className="showAuthority">
          <el-descriptions border :column="3" direction="vertical" style="width:100% !important">
            <el-descriptions-item label="已有权限">
              <el-tag style="margin:5px" v-for="(key, value) in ownProps.db" type="danger">
                {{ key }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
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
import { ref, defineProps, defineEmits, reactive } from 'vue';
import { assginAuthority } from '@/api/authority';

const db = defineProps({
  isVisible: Boolean,
  authority: Object,
  title:String,
  ownAuthority:Object
});
const authorityList = reactive<any>({
  list:db.authority
});
const ownProps = reactive<any>({
  db:db.ownAuthority
});
const dialogFormVisible = ref<boolean>(db.isVisible);
const emits = defineEmits<{ (thing: string, value: boolean): void }>();
// 设置权限
const setAuthority = (key:string, value)=>{
  delete authorityList.list.value;
  ownProps.db[value] = key;
};
// 提交
const handle = async () => {
  // const res = await assginAuthority();
  dialogFormVisible.value = false;
  emits('takeNewUserAuthority', dialogFormVisible.value)
};
const cancelSubmit = () => {
  dialogFormVisible.value = false;
  emits('takeNewUserAuthority', dialogFormVisible.value)
};
</script>
<style scoped lang="scss">
#dialog {
  .authorityList {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 24px;
    border-bottom: 1px solid #eee ;
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
    border-bottom: 1px solid #eee ;
  }

}
</style>
