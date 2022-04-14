<template lang="">
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', product.id)">
      <img style="object-fit: contain" :src="product.image" :alt="product.title" />
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>
    <span class="catalog__price">{{ numberFormat }} ₽</span>
    <ul class="colors colors--black">
      <li class="colors__item">
        <label :for="btnId[0]" class="colors__label">
          <input
            :id="btnId[0]"
            class="colors__radio sr-only"
            type="radio"
            value="#73b6ea"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #73b6ea"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label :for="btnId[1]" class="colors__label">
          <input
            :id="btnId[1]"
            class="colors__radio sr-only"
            type="radio"
            v-model="color"
            value="#8be000"
          />
          <span class="colors__value" style="background-color: #8be000"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label :for="btnId[2]" class="colors__label">
          <input
            :id="btnId[2]"
            class="colors__radio sr-only"
            type="radio"
            v-model="color"
            value="#222"
          />
          <span class="colors__value" style="background-color: #222"> </span>
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
      color: '#73b6ea',
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
  },
};
</script>
