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

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              :id="'0'"
              :title="'ФИО'"
              :placeholder="'Введите ваше полное имя'"
              :error="formError.name"
              v-model="formData.name"
            />

            <BaseFormText
              :id="'1'"
              :title="'Адрес доставки'"
              :placeholder="'Введите ваш адрес'"
              :error="formError.address"
              v-model="formData.address"
            />

            <BaseFormText
              :id="'2'"
              :title="'Телефон'"
              :placeholder="'Введите ваш телефон'"
              :error="formError.phone"
              v-model="formData.phone"
            />

            <BaseFormText
              :id="'3'"
              :title="'Email'"
              :placeholder="'Введи ваш Email'"
              :error="formError.email"
              v-model="formData.email"
            />

            <BaseFormTextarea
              :id="'4'"
              :title="'Комментарий к заказу'"
              :placeholder="'Ваши пожелания'"
              :error="formError.comment"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label for="delivery" class="options__label">
                  <input
                    id="delivery"
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label for="delivery2" class="options__label">
                  <input
                    id="delivery2"
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label for="pay" class="options__label">
                  <input
                    id="pay"
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label for="pay1" class="options__label">
                  <input
                    id="pay1"
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <BaseBasketList
          :cartProductsData="cartProductsData"
          :cartTotalAmount="cartTotalAmount"
          :cartTotalPrice="$filters.numberFormat(cartTotalPrice)"
        />

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import BaseBasketList from '@/components/BaseBasketList.vue';
import {
  mapActions, mapState, mapGetters, mapMutations,
} from 'vuex';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      cartList: null,
    };
  },
  components: { BaseFormText, BaseFormTextarea, BaseBasketList },
  methods: {
    ...mapMutations(['changeOrderLoadingStatus']),
    ...mapActions(['sendOrder']),
    order() {
      this.formErrorMessage = '';
      this.sendOrder(this.formData)
        .then((res) => this.$router.push({ name: 'orderInfo', params: { id: res.data.id } }))
        .catch((error) => {
          this.changeOrderLoadingStatus();
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
  computed: {
    ...mapState(['cartProductsData']),
    ...mapGetters(['cartTotalPrice', 'cartTotalAmount']),
  },
};
</script>
<style lang=""></style>
