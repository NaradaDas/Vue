import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

const routes = [
  { name: 'main', component: MainPage, path: '/vue-technozavr/' },
  { name: 'product', component: ProductPage, path: '/vue-technozavr/product/:id' },
  { name: 'cart', component: CartPage, path: '/vue-technozavr/cart' },
  { name: 'order', component: OrderPage, path: '/vue-technozavr/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/vue-technozavr/order/info/:id' },
  { name: 'NotFoundPage', component: NotFoundPage, path: '/vue-technozavr/:pathMatch(.*)*' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
