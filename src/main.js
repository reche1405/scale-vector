import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'

const routes = [
    {path: '/', name:'home', component: ()=> import('./views/Home.vue')},
    {path: '/workspace/', name:"workspace", component: ()=> import('./views/Workspace.vue')}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
.use(router)
.mount('#app')
