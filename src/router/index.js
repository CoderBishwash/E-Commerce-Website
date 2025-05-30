import HomePage from '@/views/HomePage.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
import WishList from '@/views/WishList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetails,
    },
    {
      path: '/shoppingcart/',
      name: 'cart',
      component: ShoppingCart,
    },
    {
      path: '/wishlist/',
      name: 'wishlist',
      component: WishList,
    },
  ],
})

export default router
