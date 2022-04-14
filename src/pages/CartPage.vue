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
      <span class="content__info"> {{ countProductWordForms }} </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
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
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    countProductWordForms() {
      const totalAmount = this.products.reduce((acc, product) => (product.amount + acc), 0);
      if (String(totalAmount).endsWith('1')) {
        return `${totalAmount} товар`;
      }
      if (
        String(totalAmount).endsWith('2')
        || String(totalAmount).endsWith('3')
        || String(totalAmount).endsWith('4')
      ) {
        return `${totalAmount} товара`;
      }
      if (this.products.length === 0) {
        return 'Корзина пуста';
      }
      return `${totalAmount} товаров`;
    },
  },
  components: { CartItem },
};
</script>
<style lang=""></style>
