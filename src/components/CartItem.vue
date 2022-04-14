<template lang="">
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>

    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <!-- <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="minusProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <label for="count">
        <input id="count" type="text" placeholder="1" v-model.number="amount" name="count" />
      </label>

      <button type="button" aria-label="Добавить один товар" @click="plusProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div> -->

    <ProductAmount class="product__counter" v-model:productAmount="amount" />

    <b class="product__price"> {{ $filters.numberFormat(item.amount * item.product.price) }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import { mapMutations } from 'vuex';
import ProductAmount from '@/components/ProductAmount.vue';

export default {
  components: { ProductAmount },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },

  },
  methods: {
    ...mapMutations({
      deleteProduct: 'deleteCartProduct',
      minusProduct: 'minusCartProduct',
      plusProduct: 'plusCartProduct',
    }),
  },
};
</script>
<style lang=""></style>
