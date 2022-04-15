<template lang="">
  <router-link class="header__cart" :to="{ name: 'cart' }" aria-label="Корзина с товарами">
    <div v-if="$store.state.cartLoading || $store.state.addProductLoading">
      <img :src="SPINNER_IMG_URL" alt="Прелоадер" />
    </div>
    <div v-else>
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">{{
        $store.state.cartProducts.length
      }}</span>
    </div>
  </router-link>
</template>
<script>
import { SPINNER_IMG_URL } from '@/config';

export default {
  data() {
    return {
      SPINNER_IMG_URL,
    };
  },
};
</script>
<style lang=""></style>
