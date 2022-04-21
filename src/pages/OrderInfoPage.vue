<template lang="">
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderData.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <OrderInfoField :title="'Получатель'" :value="orderData.name" />
            <OrderInfoField :title="'Адрес доставки'" :value="orderData.address" />
            <OrderInfoField :title="'Телефон'" :value="orderData.phone" />
            <OrderInfoField :title="'Email'" :value="orderData.email" />
            <OrderInfoField :title="'Способ оплаты'" :value="'картой при получении'" />
          </ul>
        </div>

        <BaseBasketList
          :cartProductsData="orderData.basket.items"
          :cartTotalAmount="totalProductsNumber(orderData.basket.items.length)"
          :cartTotalPrice="$filters.numberFormat(orderData.totalPrice)"
        />
      </form>
    </section>
  </main>
</template>
<script>
import BaseBasketList from '@/components/BaseBasketList.vue';
import OrderInfoField from '@/components/OrderInfoField.vue';
import totalProductsNumber from '@/helpers/totalProductsNumber';

export default {
  data() {
    return {
      orderData: {},
    };
  },
  components: { BaseBasketList, OrderInfoField },
  methods: {
    totalProductsNumber,
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id).then((res) => {
      this.orderData = res;
    });
  },
};
</script>
<style lang=""></style>
