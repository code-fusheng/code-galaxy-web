<template>
  <!-- 顶部导航拦 -->
  <div class="menu-container">
    <!-- 导航栏项目 -->
    <div class="menu-item-list">
      <div class="menu-item">
        <!-- 导航栏Logo -->
        <router-link to="/">
          <span class="item-text"><a-icon type="fire" theme="filled" :style="{ fontSize: '20px' }" /></span>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/test">
          <span class="item-text">测试</span>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/article">
          <span class="item-text">在线阅读</span>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/forum">
          <span class="item-text">论坛社区</span>
        </router-link>
      </div>
      <div class="menu-item">
        <a-dropdown placement="bottomCenter" class="user-dropdown">
          <span class="item-text">考试中心</span>
          <a-menu slot="overlay" :style="{marginTop:'5px'}">
            <a-menu-item>
              <router-link to="/exam">
                <span>在线考试</span>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/exam">
                <span>模拟测试</span>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/exam/question-train/index">
                <span>题库练习</span>
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="menu-item">
        <a-dropdown placement="bottomCenter" class="user-dropdown">
          <span class="item-text">工具箱</span>
          <a-menu slot="overlay" :style="{marginTop:'5px'}">
            <a-menu-item>
              <router-link to="/tool/create/article-create">
                <span>创建文章</span>
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="menu-item">
        <router-link to="/search">
          <span class="item-text"><a-icon type="search" :style="{ fontSize: '18px' }" /></span>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/message">
          <span class="item-text"><a-icon type="bell" :style="{ fontSize: '18px' }" /></span>
        </router-link>
      </div>
      <div class="menu-item">
        <a-dropdown placement="bottomCenter" class="user-dropdown">
          <span class="item-text"><a-icon type="user" :style="{ fontSize: '18px' }" /></span>
          <a-menu slot="overlay" :style="{marginTop:'5px'}">
            <a-menu-item>
              <a href="javascript:;"> <a-icon type="user"/>
                <router-link to="/user">
                  <span>账户</span>
                </router-link>
              </a>
            </a-menu-item>
            <a-menu-item v-if="!userInfo">
              <a href="javascript:;" @click="$store.dispatch('LoginPage')"> <a-icon type="upload"/> 登录</a>
            </a-menu-item>
            <a-menu-item v-if="userInfo">
              <a href="javascript:;"> <a-icon type="download" /> 退出</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  data() {
    return {
        created() {
          console.log(this.$store.state.userInfo)
        }
    }
  }
}
</script>
<style scoped>

</style>

<style scoped>
  .menu-container {
    width: 100%;
    height: 44px;
    margin: 0;
    margin-bottom: 10px;
    background-color: #333333;
    text-align: center;
    line-height: 44px;
    /* 开发调试样式 */
    /* border: 1px red solid; */
  }

  .menu-item-list {
    margin: auto;
    max-width: 980px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  @media screen and (max-width:414px) {
    .menu-container {
      height: 308px;
    }
    .menu-item-list {
      flex-direction: column;
    }
  }

  .menu-item {
    cursor: pointer;
  }
  .item-text {
    color: #d6d6d6;
  }
  .menu-item:hover .item-text{
    color: #f5f5f7;
  }

  /* .user-dropdown {
    margin-left: 15px;
    margin-right: 8px;
    margin-bottom: 8px;
  } */

  /* ant-ui 样式 */


</style>
