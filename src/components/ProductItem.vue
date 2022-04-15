<template lang="">
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img style="object-fit: contain" :src="product.image" :alt="product.title" />
    </router-link>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>
    <span class="catalog__price">{{ $filters.numberFormat(product.price) }} ₽</span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors" :key="color.id">
        <label :for="color.id" class="colors__label">
          <input :id="color.id" class="colors__radio sr-only" type="radio" :value="color.id" />
          <span class="colors__value" :style="{ backgroundColor: color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      btnId: [`${this.product.id}1`, `${this.product.id}2`, `${this.product.id}3`],
    };
  },
  props: ['product', 'index'],
  emits: ['update:modelValue'],
  methods: {
    gotoPage,
  },
  computed: {
    numberFormat() {
      return numberFormat(this.product.price);
    },
    colors() {
      return this.product.colors;
    },
  },

};
</script>
