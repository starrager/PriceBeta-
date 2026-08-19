import {createRouter,createWebHistory} from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes=[
    {
        path:'/',
        component:HomePage
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    }
]

const router=createRouter({
    history:createWebHistory(),routes
})

export default router