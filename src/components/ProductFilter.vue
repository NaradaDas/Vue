<template lang="">
  <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label for="price-from" class="form__label form__label--price">
        <input
          id="price-from"
          class="form__input"
          type="text"
          name="min-price"
          v-model.number="currentPriceFrom"
        />
        <span class="form__value">От</span>
      </label>
      <label for="price-to" class="form__label form__label--price">
        <input
          id="price-to"
          class="form__input"
          type="text"
          name="max-price"
          v-model.number="currentPriceTo"
        />
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label for="categories" class="form__label form__label--select">
        <select
          id="categories"
          class="form__select"
          name="category"
          v-model.number="currentCategoryId"
        >
          <option value="0">Все категории</option>
          <option :value="category.id" v-for="category in categories" :key="category.id">
            {{ category.title }}
          </option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ul class="colors">
        <li class="colors__item" v-for="color in colors" :key="color.id">
          <label :for="color.id" class="colors__label">
            <input
              :id="color.id"
              class="colors__radio sr-only"
              type="radio"
              name="color"
              :value="color.id"
              v-model.number="currentColorId"
            />
            <span class="colors__value" :style="color.style"> </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Объемб в ГБ</legend>
      <ul class="check-list">
        <li class="check-list__item">
          <label for="value1" class="check-list__label">
            <input
              id="value1"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="8"
              checked=""
            />
            <span class="check-list__desc">
              8
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="value2" class="check-list__label">
            <input
              id="value2"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="16"
            />
            <span class="check-list__desc">
              16
              <span>(461)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="value3" class="check-list__label">
            <input
              id="value3"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="32"
            />
            <span class="check-list__desc">
              32
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="value4" class="check-list__label">
            <input
              id="value4"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="64"
            />
            <span class="check-list__desc">
              64
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="value5" class="check-list__label">
            <input
              id="value5"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="128"
            />
            <span class="check-list__desc">
              128
              <span>(313)</span>
            </span>
          </label>
        </li>
        <li class="check-list__item">
          <label for="value6" class="check-list__label">
            <input
              id="value6"
              class="check-list__check sr-only"
              type="checkbox"
              name="volume"
              value="264"
            />
            <span class="check-list__desc">
              264
              <span>(313)</span>
            </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <button class="filter__submit button button--primery" type="submit">Применить</button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset()">
      Сбросить
    </button>
  </form>
</template>
<script>
import categories from '../data/categories';
import colors from '../data/colors';

export default {

  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'page'],
  emits: [
    'update:priceFrom',
    'update:priceTo',
    'update:categoryId',
    'update:colorId',
    'update:page',
  ],
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:page', 1);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.$emit('update:page', 1);
    },
  },
};
</script>
<style lang=""></style>
