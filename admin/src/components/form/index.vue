<template>
  <div className="login-form-page">
    <div className="left">
      <div className="system-logo">
        <h1 className="booking-system">{{ 'B' }}</h1>
      </div>
      <div className="site-name">
        <h1 className="name">
          {{ 'Booking System admin' }}
        </h1>
      </div>
    </div>
    <div className="right">
      <div className="login-form-area">
        <div className="system-title">
          <div className="system-logo">
            <h1 className="booking-system">{{ 'B' }}</h1>
          </div>
        </div>
        <div className="form">
          <el-input v-model="userinfo.form.telephone">
            <template #prepend>
              <el-button :icon="Message" />
            </template>
          </el-input>
          <el-input v-model="userinfo.form.psd" :show-password=true>
            <template #prepend>
              <el-button :icon="Lock" />
            </template>
          </el-input>
        </div>
        <div className="forget-login-psd">
          <p className="psd">{{ 'forget your password?' }}</p>
        </div>
        <div className="login-button">
          <button className="logIn" @click="login">
            {{ 'Login In' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, Message } from "@element-plus/icons-vue"
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { login_api } from '@/api/user';
import { formType } from '@/types/index';
import { checkTelephone } from '@/utils/regExp';
import { setToken } from '@/utils/token';
import { saveNowTime } from '@/utils/date';
import { useStore } from 'vuex';
import { useNotification } from '@/hooks/useNotification';
import { usersList } from '@/api/user';

const router = useRouter();
const store = useStore();
const userinfo = reactive<formType>({
  form: {
    telephone: '',
    psd: '',
  }
})
const login = async () => {
  if (checkTelephone<string>(userinfo.form.telephone)) {
    // 登录
    const res = await login_api(userinfo.form);
    const commits: { [key: string]: string } = {
      uid: 'saveUid',
      refreshToken: 'saveRefreshToken',
      time: 'saveNowTime',
      avatar: 'saveAvatarUrl',
      list: 'takeUsersList',
      queryInfo: 'queryInfo',
      auth: 'setUserAuthorityLevel'
    };
    switch (res.status) {
      case 200:
        const token: string = 'accessToken';
        // 分页信息
        const query: { [key: string]: number } = {
          pageSize: 1,
          limit: 20,
          offset: 0
        };
        if (res.data.role === '超级管理员') {
          setToken(token, res.data.accessToken);
          store.commit(commits.queryInfo, { key: 'queryInfo', value: query });
          store.dispatch(commits.list);
          store.commit(commits.time, { key: 'loginTime', value: saveNowTime() });
          store.commit(commits.uid, { key: 'uid', value: res.data.uid });
          store.commit(commits.refreshToken, { key: 'refreshToken', value: res.data.refreshToken });
          store.commit(commits.avatar, { key: 'avatar', value: res.data.avatar });
          store.commit(commits.auth, { key: 'auth', value: 'administrators' });
          router.push({
            name: 'home',
            params: {
              uid: res.data.uid,
            }
          });
          useNotification('success', '登录成功', 'Success', 200);
          break;
        } else {
          useNotification('error', '抱歉~您没有该系统的权限！cnjc_19991222@163.com', 'Error', 200);
          break;
        }
      case 400:
        useNotification('warning', '您没有该系统的权限！请联系管理员获取：cnjc_19991222@163.com', 'warning', 200);
        break;
      default:
        useNotification('error', '您的手机号或者密码错误，请重新输入哦~', 'Error', 200);
        break;
    };
  } else {
    useNotification('warning', '手机号出错啦！请检查手机号~', 'Warning', 200);
  };
};
</script>

<style scoped lang="scss">
.login-form-page {
  width: 1600px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 20px;
  border: none;
  display: flex;

  .left {
    position: relative;
    width: 70%;
    height: 100%;
    border: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: #5d52f4;
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    background-image: url('@/assets/images/demo.png');
    background-size: cover;
    background-repeat: no-repeat;

    .system-logo {
      width: 70px;
      height: 70px;
      position: absolute;
      top: 30px;
      left: 30px;
      border-radius: 10px;
      border-bottom: 5px solid #f48b52;
      border-top: 5px solid #52e9f4;
      border-left: 5px solid #f452b9;
      border-right: 5px solid #ffffff;

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

    .site-name {
      position: absolute;
      top: 10px;
      left: 120px;
      padding: 10px;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  }

  .right {
    position: relative;
    width: 30%;
    height: 100%;
    border: none;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;

    .login-form-area {
      position: absolute;
      top: 45%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 100%;
      height: 70%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      .system-title {
        width: 80%;
        height: 18%;
        display: flex;
        align-content: center;
        justify-content: center;
        text-align: center;
        line-height: 25%;

        .system-logo {
          width: 70px;
          height: 70px;
          position: absolute;
          top: 75px;
          left: 72px;
          border-radius: 10px;
          border-bottom: 5px solid #f48b52;
          border-top: 5px solid #52e9f4;
          border-left: 5px solid #f452b9;
          border-right: 5px solid #52a1f4;
          color: #52f4d9;

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

      }

      .form {
        height: 23%;
        width: 70%;
        display: flex;
        align-content: center;
        justify-content: space-around;
        flex-direction: column;
      }

      .forget-login-psd {
        position: absolute;
        top: 364px;
        left: 278px;
        line-height: 10%;

        .psd {
          font-size: 12px;
          color: #5d52f4;
        }
      }

      .login-button {
        width: 335px;
        height: 30px;
        transform: translateY(-350%);

        .logIn {
          line-height: 10px;
          text-align: center;
          width: 335px;
          height: 30px;
          border-radius: 15px;
          background-color: #5d52f4;
          outline: none;
          border: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
