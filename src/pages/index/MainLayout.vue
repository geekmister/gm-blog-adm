<template>
  <a-layout style="min-height: 100vh">
    <!-- 导航面板 -->
    <a-layout-sider v-model:collapsed="navState.collapsed" collapsible :trigger="null">
      <div class="logo-div">
        <img src="../../assets/images/logo@2x.png" class="logo-middle"/>
        <span class="font-size-16 font-color-white font-weight-600 margin-left-10">Geekmister</span>
      </div>
      <a-menu v-model:selectedKeys="navState.selectedKeys" theme="dark" @select="onSelectOfMenuItem" mode="inline">
        <template v-for="item in navState.menuListData">
          <template v-if="item.type === 'single'">
            <a-menu-item :key="item.key">
              <component :is="item.icon"/>
              <span>{{item.name}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item.key">
              <template #title>
                <span>
                  <component :is="item.icon" />
                  <span>{{item.name}}</span>
                </span>
              </template>
              <a-menu-item v-for="childItem in item.child" :key="childItem.key">{{childItem.name}}</a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 内容面板 -->
    <a-layout>
      <a-layout-header class="header-layout">
        <div class="header-layout-left">
          <menu-unfold-outlined :style="{fontSize: '20px'}" v-if="navState.collapsed"
                                class="mouse-pointer" @click="() => (navState.collapsed = !navState.collapsed)"/>
          <menu-fold-outlined :style="{fontSize: '20px'}" class="mouse-pointer"
                              v-else @click="() => (navState.collapsed = !navState.collapsed)"/>
          <redo-outlined :style="{fontSize: '20px'}" class="margin-left-10 mouse-pointer" v-on:click="onRefreshOfPage" />
        </div>
        <div class="header-layout-right">
          <template v-if="loginStatusState">
            <a-avatar class="mouse-pointer" size="small" @click="onClickOfLogin">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </template>
          <template v-else>
            <a-avatar class="mouse-pointer" size="small" style="color: #f56a00; background-color: #fde3cf" @click="onClickOfLogin">孙</a-avatar>
          </template>
        </div>
      </a-layout-header>
      <a-layout-content class="margin-left-10 margin-right-10 margin-top-10 margin-bottom-10 mainWindow">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center;height: 70px;">极客先生博客系统管理平台 ©2022 Created by 极客部落</a-layout-footer>
    </a-layout>
  </a-layout>
  <!-- 个人信息模态窗口 -->
  <a-modal v-model:visible="personalModalShowState" title="个人信息" >
    <template #footer>
      <a-button>取消</a-button>
      <a-button type="primary" @click="onClickOfEdit">保存</a-button>
    </template>
    <a-form
        :model="userFormState"
        name="userForm"
        ref="edit"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off">
      <a-form-item label="姓名:" name="name">
        <a-input disabled="true" v-model:value="userFormState.name"></a-input>
      </a-form-item>
      <a-form-item label="用户名:" name="nickName">
        <a-input disabled="true" v-model:value="userFormState.nickName"></a-input>
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input disabled="true" v-model:value="userFormState.nickName"></a-input>
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-select disabled="true" v-model:value="userFormState.sex" :options="sexOptions"></a-select>
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input disabled="true" v-model:value="userFormState.phone"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="newPassword" :rules="[{ required: true, message: '请输入新密码！' }]">
        <a-input-password placeholder="请输入新密码" v-model:value="userFormState.newPassword"></a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import {FundOutlined, UserOutlined, RedoOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
  import {defineComponent, getCurrentInstance, onMounted, ref} from 'vue';

  import {useRouter} from "vue-router";

  import "../../assets/css/base.css";
  import "../../assets/css/common.css";

  export default defineComponent({
    name: "MainLayout",
    setup() {
      const router = useRouter();
      const instance = getCurrentInstance();

      /* 生命周期函数 */

      onMounted(() => {
        onLightOfMenuItem();
      });

      /* state数据 */

      // state: 登录状态
      const loginStatusState = ref(true);

      // state: 导航数据
      const navState = ref({
        collapsed : false,
        selectedKeys: ['/index/dashBoard'],
        menuListData: [
          {key: "/index/dashBoard", icon: FundOutlined, name: "博客概览", type: "single"},
          {
            key: "/index/articleAdm",
            icon: UserOutlined,
            name: "文章管理",
            type: "multi",
            child: [
              {key: "/index/articleAdm/List", name: "文章列表"},
              {key: "/index/articleAdm/Add", name: "添加文章"}
            ]
          },
          {
            key: "/index/scAdm",
            icon: UserOutlined,
            name: "专栏管理",
            type: "multi",
            child: [
              {key: "/index/scAdm/List", name: "专栏列表"}
            ]
          },
        ]
      });

      // state: 个人信息弹窗显示状态
      const personalModalShowState = ref(false);

      // state: 用户表单数据
      const userFormState = ref({
        id: 0,
        name: "",
        nickName: "",
        email: "",
        sex: [],
        phone: "",
        newPassword: "",
      });

      // options: 性别options
      const sexOptions = ref([
        {label: "全部性别", value: -1}, {label: "女性", value: 0}, {label: "男性", value: 1}
      ]);

      /* 人机交互事件 */

      /**
       * @function onLightMenuItem
       * @desc 高亮导航菜单
       */
      const onLightOfMenuItem = () => {
        let currentPath = router.currentRoute.value.fullPath;

        // TODO 单菜单处理
        if(currentPath.indexOf("/index/iteration") !== -1) {
          currentPath = "/index/iteration"
        }

        navState.value.selectedKeys[0] = currentPath;
      };

      /**
       * @function onSelectOfMenuItem
       * @desc 选择导航菜单
       * @param event object 事件
       */
      const onSelectOfMenuItem = (event) => {
        router.push(event.key);
      }

      /**
       * @function onRefreshOfPage
       * @desc 刷新页面
       */
      const onRefreshOfPage = () => {
        let currentPath = router.currentRoute.value.fullPath;

        location.reload();
      }

      /**
       * @function onClickOfLogin
       * @desc 点击登录事件
       */
      const onClickOfLogin = () => {
        personalModalShowState.value = true;
      }

      return {
        loginStatusState,
        navState,
        personalModalShowState,
        userFormState,
        sexOptions,
        onClickOfLogin,
        onSelectOfMenuItem,
        onRefreshOfPage
      };
    },
    components: {
      FundOutlined, UserOutlined, RedoOutlined, MenuFoldOutlined, MenuUnfoldOutlined
    }
  });
</script>

<style scoped>
  .logo-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    height: 64px;
  }

  .header-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 10px;
  }
  .header-layout-left {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .header-layout-right {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

</style>