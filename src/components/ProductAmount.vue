<template lang="">
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="amount -= 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="count">
      <input id="count" type="number" name="count" v-model.number="amount" />
    </label>

    <button type="button" aria-label="Добавить один товар" @click.prevent="amount += 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  props: ['productAmount'],
  emits: ['update:productAmount'],
  computed: {
    amount: {
      get() {
        return this.productAmount;
      },
      set(value) {
        if (value) this.$emit('update:productAmount', value);
      },
    },
  },
};
</script>
<style lang=""></style>
