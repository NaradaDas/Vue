<template lang="">
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.product.image" width="120" height="120" :alt="product.product.title" />
    </div>
    <h3 class="product__title">{{ product.product.title }}</h3>

    <span class="product__code"> Артикул: {{ product.productId }} </span>

    <ProductAmount class="product__counter" v-model:productAmount="amount" />

    <b class="product__price">
      {{ $filters.numberFormat(product.amount * product.product.price) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProductFromCart(product.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import { mapActions } from 'vuex';
import ProductAmount from '@/components/ProductAmount.vue';

export default {
  components: { ProductAmount },
  props: ['item'],
  emits: ['update:item'],
  computed: {
    amount: {
      get() {
        return this.product.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.product.id,
          amount: value,
        });
        return value;
      },
    },
    product() {
      return {
        ...this.item,
        productId: this.item.product.id,
        amount: this.item.quantity,
        product: {
          ...this.item.product,
          image: this.item.product.image.file.url,
        },
      };
    },
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteProductFromCart']),
  },
};
</script>
<style lang=""></style>
