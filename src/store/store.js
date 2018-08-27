import Vue from 'vue'
import Vuex from 'vuex'

const defaultOrder = {
  action: undefined,
  card: {},
  customer: {},
  db: undefined,
  id: null,
  data: {}
}

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    error: false,
    logged: false,
    postal: {
      amount: 0,
      list: [],
      loading: false
    },
    order: {...defaultOrder},
    product: {
      categories: [],
      lists: false,
      manufactorers: []
    },
    token: undefined
  },
  getters: {
    apiToken: state => {
      return state.token
    },
    orderData: state => {
      return state.order
    },
    postalAmount: state => {
      return state.postal.amount
    },
    postalList: state => {
      return state.postal.list
    },
    postalLoading: state => {
      return state.postal.loading
    },
    productCategories: state => {
      return state.product.categories
    },
    productManufactorers: state => {
      return state.product.manufactorers
    },
    storeError: state => {
      return state.error
    }
  },
  mutations: {
    removeError: (state) => {
      state.error = false
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setLoggedOut: (state) => {
      state.logged = false
      state.token = undefined
    },
    setOrderData: (state, payload) => {
      state.order = {
        action: payload.action,
        card: payload.data.cartDetails,
        customer: payload.data.customer,
        data: {
          reference: payload.data.reference,
          totalPaid: payload.data.totalPaid,
          totalProduct: payload.data.totalProduct,
          totalShipment: payload.data.totalShipment
        },
        db: payload.db,
        id: payload.id
      }
    },
    setOrderEmpty: (state) => {
      state.order = {...defaultOrder}
    },
    setOrderEven: (state, payload) => {
      state.order = {
        action: payload.action,
        card: {},
        customer: {},
        data: payload.data,
        db: payload.db,
        id: payload.id
      }
    },
    setPostalData: (state, payload) => {
      state.error = false
      state.postal.amount = payload.amount
      state.postal.list = payload.list
    },
    setPostalLoading: (state, payload) => {
      state.postal.loading = payload
    },
    setProductLists: (state, payload) => {
      state.product.lists = true
      state.product.categories = payload.categories
      state.product.manufactorers = payload.manufactorers
    },
    setToken: (state, payload) => {
      state.logged = true
      state.token = payload
    }
  },
  actions: {
    orderDetails: ({ commit }, payload) => {
      commit('setOrderData', payload)
    },
    orderEmpty: ({ commit }) => {
      commit('setOrderEmpty')
    },
    orderEven: ({ commit }, payload) => {
      commit('setOrderEven', payload)
    }
  }
})
