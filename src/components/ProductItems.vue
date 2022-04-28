<template lang="">
  <li v-bind="$attrs" v-for="product in productsNormalized" :key="product.id">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img style="object-fit: contain" :src="product.image" :alt="product.title" />
    </router-link>
    <h3 class="catalog__title">
      <a href="#" @click.prevent="openQuickView(product.id)">{{ product.title }}</a>
    </h3>
    <span class="catalog__price">{{ product.pricePretty }} ₽</span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label :for="color.id" class="colors__label">
          <input :id="color.id" class="colors__radio sr-only" type="radio" :value="color.id" />
          <span class="colors__value" :style="{ backgroundColor: color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
     <BaseModal v-model:open="isQuickViewOpen">
               <ProductQuickView :product-id="currentProductId"/>

              </BaseModal>
</template>

<script>

import gotoPage from '@/helpers/gotoPage';
import BaseModal from '@/components/BaseModal.vue';
import { defineAsyncComponent, h } from 'vue';


export default {
  data() {
    return {

currentProductId: null,
    };
  },
  components: { BaseModal, ProductQuickView: defineAsyncComponent({
    loader: () => import('@/components/ProductQuickView.vue'),
        loadingComponent: () => h('div', 'Загрузка...'),

    delay: 0,
  }) },
  inheritAttrs: false,
  props: ['products'],
  emits: ['update:modelValue'],
  methods: {
    gotoPage,
    openQuickView(productId) {
this.currentProductId = productId;
    },
  },
  computed: {
    isQuickViewOpen: {
get() {
  return !!this.currentProductId
},
set(isOpen) {
  if (!isOpen) {
    this.currentProductId = null;
  }
}
    },
    productsNormalized() {
      return this.products.map((product) => ({
        ...product,
        pricePretty: this.$filters.numberFormat(product.price),
      }));
    },
  },

};
</script>
