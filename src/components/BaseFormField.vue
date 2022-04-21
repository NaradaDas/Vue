<template lang="">
  <!-- eslint-disable-next-line -->
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>
<script>
export default {
  props: ['error', 'title'],
};
</script>
<style lang=""></style>
