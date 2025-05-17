import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

import {setupRouter} from "@/router";
setupRouter(app)

import './index.css'

app.mount('#app');
