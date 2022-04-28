<template lang="HTML5">
<div>
 <fieldset>
   <legend> Сколько раз была нажата кнопка </legend>
   <h1>{{ clickCounter }}</h1>

 </fieldset>
 <br>
 <br>
 <fieldset>
   <legend> Случайное число </legend>
   <h1>{{ number }}</h1>
 </fieldset>
 <br><br>
 <fieldset>
   <legend> Каждые 5 нажатий, но не более 15, будет показываться модалка </legend>
   <button @click="countClick" type="button" ref="action">Сгенерировать число</button>
 </fieldset>
</div>
<!-- <BaseModal v-modal:open="openModal">  </BaseModal> -->
  <!-- <h1>Страница не найдена</h1> -->
</template>
<script>
import { defineComponent, ref, computed, watch, watchEffect, reactive, toRef, toRefs, defineAsyncComponent } from 'vue';

export default defineComponent ({
  components: { BaseModal: defineAsyncComponent({
    loader: () => import('@/components/BaseModal.vue'),
  }) },
  setup() {

const state = reactive({
  clickCounter: 0,
  openModal: false,
})


const reactiveData = ref(0);
const action = ref(null);
const number = ref(2021);


const getRandomNuber = () => {
  return Math.floor(Math.random()*10000)

}

const countClick = () => {
 number.value = getRandomNuber()
 state.clickCounter ++
 reactiveData.value = 12333;
}





watchEffect((onInvalidate) => {
   onInvalidate(() => {
   console.log('Данные изменяются');
    })
       console.log(action.value)
              console.log(reactiveData.value)
})

watch([state], (value, oldValue, onInvalidate) => {
  onInvalidate(() => {
    if (state.clickCounter > 15) {
state.clickCounter = 15;
    }
  })
  console.log(state.clickCounter)
  if (state.clickCounter % 5 === 0 && state.clickCounter !== 0 && state.clickCounter !== 15) {
   return alert('Продолжай нажимать!');
  } else if (state.clickCounter === 15) {
    alert('Пора остановиться')
  }
})

    return {
      action,
clickCounter: toRef(state, 'clickCounter'),
openModal: toRef(state, 'openModal'),
 countClick,
 number,
    }
  }

});
</script>
