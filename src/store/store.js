import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const emptyState = {
  display: false,
  content: undefined,
  type: undefined
}

export const store = new Vuex.Store({
  state: {
    error: false,
    logged: false,
    message: {...emptyState},
    postal: {
      amount: 0,
      list: [],
      loading: false
    },
    product: {
      categories: [],
      lists: false,
      manufactorers: []
    },
    token: undefined
  },
  getters: {
    messageObj: state => {
      return state.message
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
    }
  },
  mutations: {
    emptyMessage: (state) => {
      state.message = emptyState
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setLoggedOut: (state) => {
      state.logged = false
      state.token = undefined
    },
    setMessage: (state, payload) => {
      state.message = {
        display: true,
        type: payload.type,
        content: payload.content
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
  }
})
