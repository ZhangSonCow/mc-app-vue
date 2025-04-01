<template>
  <div class="setting-container">
    <!-- 顶部回退栏 -->
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 修改信息区域 -->
    <van-cell-group inset class="info-group">
      <van-cell title="修改用户名" is-link @click="showUsernameDialog = true" />
      <van-cell title="修改昵称" is-link @click="showNicknameDialog = true" />
    </van-cell-group>

    <!-- 修改用户名对话框 -->
    <van-dialog
      v-model="showUsernameDialog"
      title="修改用户名"
      show-cancel-button
      @confirm="updateUsername"
    >
      <van-field
        v-model="newUsername"
        label="新用户名"
        placeholder="请输入新用户名"
      />
    </van-dialog>

    <!-- 修改昵称对话框 -->
    <van-dialog
      v-model="showNicknameDialog"
      title="修改昵称"
      show-cancel-button
      @confirm="updateNickname"
    >
      <van-field
        v-model="newNickname"
        label="新昵称"
        placeholder="请输入新昵称"
      />
    </van-dialog>

    <!-- 退出登录按钮 -->
    <div class="logout-btn">
      <van-button
        round
        block
        type="danger"
        @click="handleLogout"
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog } from 'vant';
import { logout } from '@/api/login';

const store = useStore();
const router = useRouter();

const showUsernameDialog = ref(false);
const showNicknameDialog = ref(false);
const newUsername = ref('');
const newNickname = ref('');

const updateUsername = () => {
  if (!newUsername.value.trim()) {
    showToast('用户名不能为空');
    return;
  }
  
  const userInfo = {
    ...store.state.userInfo,
    username: newUsername.value
  };
  store.commit('setUserInfo', userInfo);
  newUsername.value = '';
};

const updateNickname = () => {
  if (!newNickname.value.trim()) {
    showToast('昵称不能为空');
    return;
  }
  
  const userInfo = {
    ...store.state.userInfo,
    nickname: newNickname.value
  };
  store.commit('setUserInfo', userInfo);
  newNickname.value = '';
};

const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要退出登录吗？',
    });
    await logout();
    store.commit('clearUserInfo');
    localStorage.removeItem('token');
    router.push('/UserInfo');
  } catch (error) {
    console.error('登出失败:', error);
  }
};
</script>

<style scoped>
.setting-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.info-group {
  margin-top: 1.2rem;
}

.logout-btn {
  position: fixed;
  bottom: 20px;
  left: 16px;
  right: 16px;
}
</style>