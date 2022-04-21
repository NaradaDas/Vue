<template lang="">

  <BaseFormField :title="title" :error="error">
  <!-- eslint-disable-next-line -->
    <input

      v-model="dataValue"
      class="form__input"
      type="text"
      :placeholder="placeholder"
    />
  </BaseFormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
<style lang=""></style>
