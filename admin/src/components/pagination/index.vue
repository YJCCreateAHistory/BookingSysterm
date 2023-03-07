<template>
  <div className="pagination">
    <el-pagination
    :small="flag.bol.small"
    :disabled="flag.bol.disabled" :background="flag.bol.background"
    layout="sizes, prev, pager, next, jumper"
    :total="40"
    @current-change="handleCurrentChange" />
  </div>
</template>
<script setup lang="ts">
import { reactive, defineEmits } from 'vue';
import { usersList } from '@/api/user';
import { useStore } from 'vuex';
const store = useStore();
const flag = reactive<{ [key: string]: { [key: string]: boolean } }>({
  bol: {
    small: false,
    background: false,
    disabled: false
  }
});
const emits = defineEmits<{ (emits: string, value: {[key:string]:string | number}): void }>();
const handleCurrentChange = async (val: number) => {
  store.commit('savePageNumber', {key:'userPage', value:val} )
  // 当前页码*数据偏移量：打上页码标识存在本地
  const query:{[key:string]:number} = { // 获取不同页数据
    offset: (val - 1) * 20,
    limit: 20,
  };
  const res = await usersList(query);
  res.data.index = val - 1;
  if(store.state.page.userPage.indexOf(val) === -1) {
    store.commit('handlePageChange', {key:'usersList', value:res.data});
    emits('sendPageHandle', res.data);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 30px;
  width: 100%;

  .el-pagination {
    float: right;
  }
}
</style>
