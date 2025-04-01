<template>
  <div class="login-container">
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="router.back"
    />
    <van-form class="login-form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="submit-button">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { login } from '@/api/login';

const username = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const onSubmit = async () => {
  try {
    const { data } = await login({
      username: username.value,
      password: password.value
    });
    
    const userInfo = data.userInfo;
    store.commit('setUserInfo', userInfo);
    localStorage.setItem('token', JSON.stringify(data.token));    // 将token存储到 localStor
    router.back();
  } catch (error) {
    console.error('登录失败:', error);
  }
};
</script>

<style scoped>
.login-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.login-form {
  margin-top: 1.2rem;
}

.submit-button {
  position: fixed;
  bottom: 20px;
  left: 16px;
  right: 16px;
}
</style>