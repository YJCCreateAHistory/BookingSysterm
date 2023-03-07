const routes = [
  {
    path:'/home/:uid',
    name:'home',
    component:()=>import('@/view/home/index.vue'),
    meta:{
      title:'home',
      keepAlive:true
    }
  }
]

export default routes;
