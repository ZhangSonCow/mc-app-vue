import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from "vant";
import "vant/lib/index.css";
import store from './store'

const app = createApp(App)

app.use(router)
app.use(Vant)
app.use(store)

app.mount('#app')
