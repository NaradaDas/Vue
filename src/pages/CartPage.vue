<template lang="">
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalAmount }} </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div v-show="cartLoading">
            <img :src="SPINNER_IMG_URL" alt="Прелоадер" />
          </div>
          <div v-show="cartLoadingFailed">Не удалось загрузить корзину товаров :(</div>

          <ul class="cart__list">
            <CartItem
              v-for="(item, index) in products"
              :key="item.id"
              v-model:item="products[index]"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ $filters.numberFormat(totalPrice) }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import totalProductsNumber from '@/helpers/totalProductsNumber';
import { SPINNER_IMG_URL } from '@/config';

export default {
  data() {
    return {
      cartData: null,
      SPINNER_IMG_URL,
    };
  },
  methods: {
    ...mapActions(['loadCart']),
    loadData() {
      this.loadCart().then(() => {
        this.cartData = this.cartProductsData;
      });
    },
  },
  computed: {
    ...mapState(['cartProductsData', 'cartLoading', 'addProductLoading', 'cartLoadingFailed']),
    ...mapGetters({ totalPrice: 'cartTotalPrice' }),
    totalAmount() {
      const quantity = this.products.reduce((acc, product) => product.quantity + acc, 0);
      return totalProductsNumber(quantity);
    },
    products: {
      get() {
        return this.cartData ? this.cartData : [];
      },
      set(value) {
        this.cartData = value;
      },
    },
  },
  components: { CartItem },
  created() {
    this.loadData();
  },
  watch: {
    cartProductsData() {
      this.cartData = this.cartProductsData;
    },
  },
};
</script>
<style lang=""></style>
