<template lang="">
  <router-link class="header__cart" :to="{ name: 'cart' }" aria-label="Корзина с товарами">
    <BaseLoadingIndicator v-if="loadingStatus" :loading="loadingStatus" />
    <div v-else>
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">{{ cartProductQuantity }}</span>
    </div>
  </router-link>
</template>
<script>
import { mapState } from 'vuex';
import BaseLoadingIndicator from '@/components/BaseLoadingIndicator.vue';

export default {
  data() {
    return {
      loadingStatus: false,
      cartProductQuantity: 0,
    };
  },
  components: { BaseLoadingIndicator },

  computed: {
    ...mapState(['addProductLoading', 'cartLoading', 'cartProducts', 'sendOrderLoading']),
  },
  methods: {
    syncWithStore() {
      this.loadingStatus = this.cartLoading || this.addProductLoading || this.sendOrderLoading;
      this.cartProductQuantity = this.cartProducts.length;
    },
  },
  created() {
    this.syncWithStore();
  },
  watch: {
    sendOrderLoading() {
      this.syncWithStore();
    },
    addProductLoading() {
      this.syncWithStore();
    },
    cartLoading() {
      this.syncWithStore();
    },
    cartProducts() {
      this.syncWithStore();
    },
  },
};
</script>
<style lang=""></style>
