import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Video',
        name: 'Video',
        component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue')
    },
    {
        path: '/Reader',
        name: 'Reader',
        component: () => import(/* webpackChunkName: "about" */ '../views/Reader')
    },
    {
        path: '/Book',
        name: 'FrameReader',
        component: () => import(/* webpackChunkName: "about" */ '../views/FrameReader.vue')
    },
    {
        path: '/Notice',
        name: 'Notice',

        component: () => import(/* webpackChunkName: "about" */ '../views/Notice.vue')
    },
];

const router = new VueRouter({
    routes
});

export default router
