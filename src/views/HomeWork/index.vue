<template>
  <div>
    <!-- 搜索栏 -->
    <div class="header-container">
        <van-search
          v-model="searchText"
          placeholder="请输入搜索内容"
          show-action
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      
        <!-- 类别选择 -->
        <div class="Type-container">
          <van-tabs v-model="activeType" swipeable @click="onTypeChange">
            <van-tab v-for="Type in typeList" :key="Type.id" :title="Type.name"></van-tab>
          </van-tabs>
        </div>

      </div>

    <div class="body-container">
      <!-- 轮播图 -->
      <div class="carousel">
        <van-swipe :autoplay="3000" height="240">
          <van-swipe-item v-for="item in carouselItems" :key="item.id">
            <img :src="item.image" :alt="item.name" class="carousel-img"/>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 作品列表 -->
      <div class="work-list">
        <div 
          class="work-item" 
          v-for="work in works" 
          :key="work.id"
          @click="$router.push({ path: '/WorkDetail', query: { wy_id: work.wyId, name: work.name } })"
        >
          <img v-if="work.image" :src="work.image" :alt="图片加载失败" class="work-image" />
          <img v-else :src="require('@/assets/workTestImage.png')" class="work-image" />
          <div class="work-info">
            <h3>{{ work.name }}</h3>
            <p>作者: {{ work.author }}</p>
            <p>类型: {{ work.type }}</p>
            <p>发布时间: {{ work.createTime ? work.createTime.replace(/T/g, ' ') : "" }}</p>
            <div class="work-code" @click="copyWorkCode(work.code)">{{ work.code }}</div>
          </div>
        </div>
      </div>
      <div v-if="!hasMore && works.length > 0" class="no-more-text">
        没有更多啦
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { showToast } from 'vant';
import { getWorks } from '@/api/workApi';

const searchText = ref("");
const pageNumber = ref(1);
const loading = ref(false);
const activeType = ref(0);
const typeList = reactive([
  { id: 0, name: '全部' },
  { id: 1, name: '游戏地图' },
  { id: 2, name: '功能玩法' },
  { id: 3, name: '材质光影' },
  { id: 4, name: '皮肤' }
]);
const carouselItems = reactive([
  { id: 1, image: require('@/assets/swipperTestImage.png'), name: '轮播图1' },
  { id: 2, image: require('@/assets/swipperTestImage.png'), name: '轮播图2' },
  { id: 3, image: require('@/assets/swipperTestImage.png'), name: '轮播图3' },
]);
const works = reactive([]);
const hasMore = ref(true);
const throttleTimer = ref(null);

const fetchWorks = () => {
  let requestParams = {
    pageSize: 5,
    pageNumber: pageNumber.value,
    search: searchText.value,
    type: activeType.value == 0 ? null : typeList[activeType.value].name
  };
  loading.value = true;
  getWorks(requestParams)
    .then(response => {
      works.push(...response.data.rows);
      hasMore.value = response.data.rows.length >= requestParams.pageSize;
      pageNumber.value++;
      loading.value = false;
    })
    .catch(error => {
      showToast('获取作品列表失败');
      console.error(error);
    });
};

const handleScroll = () => {
  if (throttleTimer.value) return;
  
  throttleTimer.value = setTimeout(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    if (scrollTop + windowHeight >= scrollHeight - 100 && !loading.value && hasMore.value) {
      fetchWorks();
    }
    throttleTimer.value = null;
  }, 500);
};

const onSearch = () => {
  works.splice(0, works.length);
  pageNumber.value = 1;
  fetchWorks();
};

const onTypeChange = () => {
  works.splice(0, works.length);
  pageNumber.value = 1;
  console.log(activeType.value);
  fetchWorks();
};

const copyWorkCode = (code) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      showToast('复制成功');
    })
    .catch(() => {
      showToast('复制失败');
    });
};

onMounted(() => {
  fetchWorks();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll, { passive: true });
});
</script>

<style scoped>
.body-container {
  padding: 8rem 0.8rem 0.8rem;
  background: #F1F2F4;
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.carousel {
  margin-bottom: 1.2rem;
  border-radius: 8px;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.work-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
}

.work-item {
  display: flex;
  border: 1px solid #eee;
  padding: 0.625rem;
  border-radius: 8px;
  background: #fff;
  position: relative;
}

.work-code {
  position: absolute;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom right, #e26757, #7c160b);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 5px 0 0 0;
  font-size: 0.8rem;
  font-weight: bold;
}

.work-image {
  width: 6.25rem;
  height: 6.25rem;
  object-fit: cover;
  margin-right: 0.9375rem;
  border-radius: 5px;
}

.work-info {
  text-align: left;
}

.work-info h3 {
  margin: 0.1rem 0 0.625rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 16rem;
}

.work-info p {
  margin: 0.3125rem 0;
  color: #666;
  font-size: 0.8rem;
}

.no-more-text {
  font-size: 1rem;
  padding: 0.8rem 0 2.4rem;
}
</style>