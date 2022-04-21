import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import totalProductsNumber from '@/helpers/totalProductsNumber';

const store = createStore({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    addProductLoading: false,
    cartLoadingFailed: false,
    sendOrderLoading: false,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orederInfo) {
      state.orderInfo = orederInfo;
    },
    resetCard(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    turnOnCartLoading(state) {
      state.cartLoading = true;
    },
    turnOfCartLoading(state) {
      state.cartLoading = false;
    },
    turnOnAddProductLoading(state) {
      state.addProductLoading = true;
    },
    turnOfAddProductLoading(state) {
      state.addProductLoading = false;
    },
    turnOnCartLoadingFailed(state) {
      state.cartLoadingFailed = true;
    },
    turnOfCartLoadingFailed(state) {
      state.cartLoadingFailed = false;
    },
    changeOrderLoadingStatus(state) {
      state.sendOrderLoading = !state.sendOrderLoading;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = {
          data: state.cartProductsData
            .find((p) => p.product.id === item.productId).product,
        };

        return {
          ...item,
          product: {
            ...product.data,
            image: product.data.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product
        .price * item.amount + acc), 0);
    },
    cartTotalAmount(state) {
      const quantity = state.cartProductsData.reduce((acc, product) => product.quantity + acc, 0);
      return totalProductsNumber(quantity);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateOrderInfo', res.data);
          return res.data;
        });
    },
    loadCart(context) {
      context.commit('turnOfCartLoadingFailed');
      context.commit('turnOnCartLoading');
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
          return res;
        })
        .catch(() => context.commit('turnOnCartLoadingFailed'))
        .then(() => context.commit('turnOfCartLoading'));
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('turnOnAddProductLoading');
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
        })
        .then(() => context.commit('turnOfAddProductLoading'));
    },
    deleteProductFromCart(context, productId) {
      context.commit('turnOnCartLoading');
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId,
        },
      })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
          context.commit('turnOfCartLoading');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          context.commit('updateCartProductsData', res.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    loadFilters() {
      return Promise.all([
        axios.get(`${API_BASE_URL}/api/colors`),
        axios.get(`${API_BASE_URL}/api/productCategories`),
      ]).then((res) => res);
    },
    sendOrder(context, formData) {
      context.commit('changeOrderLoadingStatus');
      return axios.post(`${API_BASE_URL}/api/orders`, {
        ...formData,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((res) => {
          context.commit('resetCard');
          context.commit('updateOrderInfo', res.data);
          context.commit('changeOrderLoadingStatus');
          return res;
        });
    },

  },
});

export default store;
