<template lang="">
<div>
   <div class="cart__block">
          <ul class="cart__orders">
          <BaseBasketListItem v-for="item in cartProductsData" :title="item.product.title" :price="item.price" :id="item.product.id"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: {{ cartTotalAmount }} на сумму <b>{{ cartTotalPrice }} ₽</b></p>
          </div>

          <button v-if="$route.name === 'order'" class="cart__button button button--primery" type="submit">Оформить заказ</button>

        </div>
            <BaseLoadingIndicator class="content container" :loading="sendOrderLoading" />
</div>
</template>
<script>
import BaseBasketListItem from '@/components/BaseBasketListItem.vue';
import BaseLoadingIndicator from '@/components/BaseLoadingIndicator.vue';
import { mapState } from 'vuex';

export default {
  props: ['cartProductsData', 'cartTotalAmount', 'cartTotalPrice'],
  components: {BaseBasketListItem, BaseLoadingIndicator},
  computed: {
    ...mapState(['sendOrderLoading']),
  },
}
</script>
<style lang="">

</style>
