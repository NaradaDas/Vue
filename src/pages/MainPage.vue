<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ totalAmount }} </span>
    </div>

    <div class="content__catalog">
      <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>
        <ProductFilter
          v-model:price-from="filterPriceFrom"
          v-model:price-to="filterPriceTo"
          v-model:categoryId="filterCategoryId"
          v-model:colorId="filterColorId"
          v-model:page="page"
        />
      </aside>

      <section class="catalog">
        <BaseLoadingIndicator :loading="productsLoading" />

        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts" type="button">Попробовать еще раз</button>
        </div>
        <ProductList :products="products" />
        <BasePagination :count="countProducts" :per-page="productsPerPage" v-model:page="page" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BaseLoadingIndicator from '@/components/BaseLoadingIndicator.vue';
import totalProductsNumber from '@/helpers/totalProductsNumber';
import { API_BASE_URL, SPINNER_IMG_URL } from '@/config';

import axios from 'axios';

export default {
  data() {
    return {
      SPINNER_IMG_URL,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BaseLoadingIndicator,
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  computed: {
    total() {
      return this.products.length;
    },
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({ ...product, image: product.image.file.url }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    totalAmount() {
      const quantity = this.countProducts;
      return totalProductsNumber(quantity);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
