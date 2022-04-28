import { API_BASE_URL } from '@/config';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default function() {
const $store = useStore();
 const productData = ref(null)
const category = computed(() => {
 return productData.value.category;
})
const  colors = computed(() => {
 return productData.value.colors;
})

const productAmount = ref(1)
const status = reactive({
  isLoading: false,
  isFailed: false,
  isAddedMessage: ref(false),
  addSending: ref(false),
  added: ref(false)
})
 const fetchProduct = (productId) => {
  status.isLoading = true;
  status.isFailed = false;
axios
 .get(`${API_BASE_URL}/api/products/${productId}`)
 .then((res) => {
   productData.value = res.data;
 })
 .catch(() => {
  status.isFailed = true;
 })
 .then(() => {
  status.isLoading = false;
 });
}

const doAddToCart = (productId) => {
  status.added = false;
  status.addSending = true;
  console.log(status.addSending)
$store.dispatch( 'addProductToCart', { productId, amount: productAmount.value }).then(() => {
  status.added = true;
  status.addSending = false;
  status.isAddedMessage = true;
  console.log(status.addSending)
});
}

return {
  product: productData,
  status,
  colors,
  category,
  fetchProduct,
  productAmount,
  doAddToCart
}
}
