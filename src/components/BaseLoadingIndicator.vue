<template lang="">
  <div v-show="loading">
    <img :src="SPINNER_IMG_URL" alt="Прелоадер" />
  </div>
</template>
<script>
import { SPINNER_IMG_URL } from '@/config';

export default {
  data() {
    return {
      SPINNER_IMG_URL,
    };
  },
  props: ['loading'],
};
</script>
