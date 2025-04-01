<template>
  <div class="user-profile">
    <!-- 顶部用户信息区域 -->
    <van-cell center class="user-info" @click="$router.push('/UserLogin')">
      <template #icon>
        <van-image round width="3.75rem" height="3.75rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="avatar" />
      </template>
      <template #title>
        <span class="username">{{ store.state.userInfo?.username || '未登录' }}</span>
      </template>
      <template #label>
        <span class="user-id">{{ store.state.userInfo?.nickname || '点击登录' }}</span>
        <van-icon name="arrow" class="arrow-icon" />
      </template>
      <template #extra>
        <van-icon name="qr" size="18" />
      </template>
    </van-cell>

    <!-- 消息区域 -->
    <van-cell-group inset class="service-group">
      <van-cell title="消息" is-link>
        <template #icon>
          <van-icon name="envelop-o" size="20" class="service-icon" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 服务区域 -->
    <van-cell-group inset class="service-group">
      <van-cell title="收藏" is-link>
        <template #icon>
          <van-icon name="star-o" size="20" class="service-icon" />
        </template>
      </van-cell>
      <van-cell title="朋友圈" is-link>
        <template #icon>
          <van-icon name="comment-o" size="20" class="service-icon" />
        </template>
      </van-cell>
      <van-cell title="视频号" is-link>
        <template #icon>
          <van-icon name="video-o" size="20" class="service-icon" />
        </template>
      </van-cell>
      <van-cell title="卡包" is-link>
        <template #icon>
          <van-icon name="credit-pay" size="20" class="service-icon" />
        </template>
      </van-cell>
      <van-cell title="表情" is-link>
        <template #icon>
          <van-icon name="smile-o" size="20" class="service-icon" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 设置区域 -->
    <van-cell-group inset class="service-group">
      <van-cell title="设置" is-link @click="$router.push('/Setting')">
        <template #icon>
          <van-icon name="setting-o" size="20" class="service-icon" />
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
</script>

<style scoped>
.user-profile {
  background-color: #f5f5f5;
}

.user-info {
  padding: 20px 16px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 0;
}

.user-info :deep(.van-cell__title) {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

:deep(.van-cell__label) {
  margin-right: auto;
}

.user-id {
  font-size: 14px;
  color: #888;
  text-align: left;
}

.avatar {
  margin-right: 10px;
}

.arrow-icon {
  margin-left: 10px;
  color: #ccc;
}

.status-cell {
  margin-bottom: 10px;
}

.service-group {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  text-align: left;
}

.service-icon {
  margin: 3px 10px 0 0;
  color: #07c160;
}

.bottom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>