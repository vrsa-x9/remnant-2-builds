import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Planner from './pages/Planner.vue'
import MyBuilds from './pages/MyBuilds.vue'
import Build from './pages/Build.vue'
import NotFound from './pages/404.vue'


//Create app
const app = createApp(App);

//Router
const routes = [
    { name: 'planner', path: '/', component: Planner },
    { name: 'my_builds', path: '/builds', component: MyBuilds },
    { name: 'build', path: '/build/:id', component: Build },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router);



//Tippy
import 'tippy.js/dist/tippy.css' // optional for styling
import VueTippy from 'vue-tippy'
app.use(
    VueTippy,
    {
        directive: 'tippy',
        component: 'tippy',
        defaultProps: {
            placement: 'auto-end',
            allowHTML: true,
        },
    }
)



//Mount the app
app.mount('#app')
