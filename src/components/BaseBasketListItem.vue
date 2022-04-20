<template lang="">
 <li class="cart__order">
              <h3>{{ title }}</h3>
              <b> {{  $filters.numberFormat(price) }} ₽</b>
              <span>Артикул: {{ id }}</span>
            </li>
</template>
<script>
export default {
  props: ['title', 'price', 'id']
}
</script>
