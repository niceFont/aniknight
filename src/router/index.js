import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/mylist",
    name: "mylist",
    component: () => import("../views/MyList.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
