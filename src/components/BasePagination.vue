<template lang="">
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow pagination__link--disabled"
        aria-label="Предыдущая страница"
        @click.prevent="paginate('previous')"
        :class="{ 'pagination__link--disabled': page === 1 }"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        @click.prevent="paginate('pageNumber', pageNumber)"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
      >
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginate('next')"
        :class="{ 'pagination__link--disabled': page === pages }"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['page', 'count', 'perPage'],
  emits: ['update:page'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(btnName, pageNumber) {
      if (btnName === 'previous') {
        if (this.page === 1) return;
        this.$emit('update:page', this.page - 1);
      } else if (btnName === 'next') {
        if (this.page === this.pages) return;
        this.$emit('update:page', this.page + 1);
      } else {
        this.$emit('update:page', pageNumber);
      }
    },
  },
};
</script>
<style lang=""></style>
