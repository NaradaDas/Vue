import { createStore } from 'vuex';
import products from '@/data/products';

const store = createStore({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    minusCartProduct(state, productId) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      if (item.amount > 1) item.amount -= 1;
    },
    plusCartProduct(state, productId) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      item.amount += 1;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product
        .price * item.amount + acc), 0);
    },
  },
});

export default store;
