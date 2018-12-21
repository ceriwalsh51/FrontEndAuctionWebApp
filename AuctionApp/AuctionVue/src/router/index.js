import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auctions from '@/components/Auctions'
import Auction from '@/components/Auction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auctions',
      name: 'Auctions',
      component: Auctions
    },
    {
      path: '/auction',
      name: 'Auction',
      component: Auction
    }
  ]
})
