<template>
  <div class="work-detail-container">
    <div class="top-navigation">
      <button class="back-button" @click="goBack">
        <img src="@/assets/backArrowIcon.png" alt="返回" />
      </button>
      <div class="title">{{ workName }}</div>
    </div>
    <iframe 
      :src="'https://resource-minecraft.h5.163.com/#/pages/detail/index?id=' + wyId"
      frameborder="0"
      width="100%"
      height="100%"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'WorkDetail',
  data() {
    return {
      wyId: '',
      workName: ''
    }
  },
  created() {
    this.wyId = this.$route.query.wy_id || '';
    this.workName = this.$route.query.name || '';
  },
  methods: {
    goBack() {
        console.log('go back');
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.work-detail-container {
  padding: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.top-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2.75rem;
  background: rgba(255, 255, 255);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
}

.title {
  flex: 1;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 1rem;
  margin-right: 2.4rem;
}

.back-button {
  background: transparent;
  border: none;
  width: 2.1rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -0.5rem;
}

.back-button img {
  color: #333;
  width: 100%;
  height: 100%;
}
</style>