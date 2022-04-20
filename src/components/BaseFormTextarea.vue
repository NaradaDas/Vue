<template lang="">
 <BaseFormField :title="title" :error="error">
               <textarea
                v-model="dataValue"
                id="comments"
                class="form__input form__input--area"
                name="comments"
                :placeholder="placeholder"
              ></textarea>
</BaseFormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin.js';

export default {
  mixins: [formFieldMixin],
}
</script>
<style lang="">

</style>
