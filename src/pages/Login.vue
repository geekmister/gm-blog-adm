<template>
  <div class="container">
    <img class="bg-icon-1" src="../assets/images/login-pbg-icon-1@2x.png"/>
    <img class="bg-icon-2" src="../assets/images/login-pbg-icon-2@2x.png"/>
    <img class="bg-icon-3" src="../assets/images/login-pbg-icon-3@2x.png"/>
    <img class="bg-icon-4" src="../assets/images/login-pbg-icon-4@2x.png"/>
    <div class="form-container">
      <div class="flag-container">
        <div class="flag-logo-div">
          <img src="../assets/images/logo@2x.png" class="flag-logo-img"/>
          <span class="flag-title">Geekmister</span>
        </div>
        <span class="flag-desc">程序员 | 创业者 | 自媒体 | 黑客 | 白帽子</span>
      </div>
      <a-tabs v-model:active-key="activeKey" centered>
        <a-tabs-tab-pane key="1" tab="账号密码登录">
          <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed" name="login" class="form-input-container">
            <a-form-item name="nickName" :rules="[{ required: true, message: '请输入用户名称!' }]">
              <a-input v-model:value="formState.nickName" placeholder="请输入用户名称" class="form-input-item-input">
                <template #prefix>
                  <img src="../assets/icons/icon-user@2x.png" class="form-input-item-icon"/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: '请输入用户密码!' }]">
              <a-input-password v-model:value="formState.password" placeholder="请输入用户密码" class="form-input-item-input">
                <template #prefix>
                  <img src="../assets/icons/icon-lock@2x.png" class="form-input-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="form-btn">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tabs-tab-pane>
      </a-tabs>
    </div>
    <span class="footer-container">Copyright &copy; 2022 极客先生荣誉出品</span>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

import {useRouter} from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();

    // state: 表单数据
    const formState = ref({
      nickName: "", password: ""
    });

    // state: Tab卡片焦点卡片数据
    const activeKey = ref(1);

    /**
     * 提交表单且数据验证成功后回调事件
     * @param values {object} 表单对象
     */
    const onFinish = (values) => {

    };

    /**
     * 提交表单且数据验证失败后回调事件
     * @param errorInfo {object} 错误信息
     */
    const onFinishFailed = (errorInfo) => {
    };

    return {
      formState,
      activeKey,
      onFinish,
      onFinishFailed,
    }
  }
})
</script>

<style scoped>
.container {
  width: 100%; height: 100vh; background-color: #F0F3F7;
}
.bg-icon-1 {
  width: 234px; height: 195px; transform: rotate(-5deg); position: absolute; top: 99px; left: 176px;
}
.bg-icon-2 {
  width: 149px; height: 105px; opacity: 1; transform: rotate(-7deg); position: absolute; left: 77px; bottom: 55px;
}
.bg-icon-3 {
  width: 66px; height: 73px; opacity: 1; transform: rotate(-11deg); position: absolute; right: 276px; top: 73px;
}
.bg-icon-4 {
  width: 317px; height: 283px; opacity: 1; transform: rotate(-10deg); position: absolute; right: -78px; bottom: 89px;
}
.form-container {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: center; position: relative;
  top: calc(30% - 100px);
}
.flag-container {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: center; margin-bottom: 40px;
}
.flag-logo-div {
  display: flex; flex-direction: row; justify-content: flex-start; align-items: center;
}
.flag-logo-img {
  width: 45px; height: 45px;
}
.flag-title {
  width: 178px; height: 33px; font-family: PingFangSC-Medium; font-weight: 500; font-size: 33px; color: rgba(0,0,0,0.85);
  text-align: center; line-height: 33px; margin-left: 20px;
}
.flag-desc {
  width: 245px; height: 22px; font-family: PingFangSC-Regular; font-weight: 400; font-size: 14px; color: rgba(0,0,0,0.45);
  line-height: 22px; margin-top: 10px;
}
.form-input-container {
  width: 368px;
}
.form-input-item-icon {
  width: 16px; height: 16px;
}
.form-input-item-input {
  width: 368px; height: 40px; background: #FFFFFF; border: 1px solid #D9D9D9; border-radius: 2px;
}
.form-btn {
  width: 100%; height: 40px;
}
.footer-container {
  height: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0,0,0,0.45);
  line-height: 20px;
  position: absolute;
  left: calc(50% - 117px);
  bottom: 25px;
}
</style>