import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'
import articles from '../components/articles'
import OneArticle from '../components/OneArticle'
import create from '../components/create'
import filtre from '../components/filtre'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
        path : '/article',
        name: 'articles',
        component: articles
    },{
      path :'/article/:id',
      name : 'OneArticle',
      component : OneArticle
    },{
      path :'/create',
      name : 'create',
      component : create
    },{
      path :'/filtre',
      name : 'filtre',
      component : filtre
    }
  ]
})
