<template lang="">
 <BaseFormField  :title="title" :error="error">
 <!-- eslint-disable-next-line -->
               <textarea
                v-model="dataValue"

                class="form__input form__input--area"
                name="comments"
                :placeholder="placeholder"
              ></textarea>
</BaseFormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
<style lang="">

</style>
