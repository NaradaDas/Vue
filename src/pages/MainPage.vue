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
        <ProductList :products="products" />
        <BasePagination :count="countProducts" :per-page="productsPerPage" v-model:page="page" />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import totalProductsNumber from '@/helpers/totalProductsNumber';

// import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,
      // productsData: null,
    };
  },
  // methods: {
  //   loadProducts() {
  //     axios.get('https://vue-study.skillbox.cc/api/products').then((response) => {
  //       this.productsData = response.data;
  //     });
  //   },
  // },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }

      if (this.filterColorId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colorId === this.filterColorId,
        );
      }

      return filteredProducts;
    },
    total() {
      return products.length;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      // return this.productsData ? this.productsData.items : [];
    },
    countProducts() {
      return this.filteredProducts.length;
    },
    totalAmount() {
      const quantity = this.countProducts;
      return totalProductsNumber(quantity);
    },
  },
  // created() {
  //   this.loadProducts();
  // },
};
</script>
