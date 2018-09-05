import Vue from 'vue'
import Vuex from 'vuex'

const defaultAccount = {
  amount: null,
  automatic: false,
  list: [],
  maxAmount: null
}
const defaultOrder = {
  action: null,
  card: {},
  customer: {},
  data: {},
  db: null,
  id: null,
  voucher: null
}
const defaultProduct = {
  categories: [],
  data: {},
  history: null,
  lists: false,
  loading: false,
  manufactorers: [],
  nameList: [],
  type: null
}
const modifyProduct = (obj, payload) => {
  obj.data = payload.edition === 'edition' || payload.edition === 'basic' ? payload.data : {}
  obj.type = payload.edition
  obj.history = payload.edition === 'history' ? payload.list : []
  obj.loading = false
  obj.nameList = payload.edition === 'nameSearch' || payload.edition === 'basic' ? payload.list : []
  return obj
}

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    account: {...defaultAccount},
    error: false,
    modified: {
      empty: false,
      list: []
    },
    logged: false,
    order: {...defaultOrder},
    postal: {
      amount: 0,
      list: [],
      loading: false
    },
    product: {...defaultProduct},
    token: undefined
  },
  getters: {
    accounts: state => {
      return state.account
    },
    apiToken: state => {
      return state.token
    },
    modifiedData: state => {
      return state.modified
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
    productData: state => {
      return {
        data: state.product.data,
        type: state.product.type,
        history: state.product.history,
        list: state.product.nameList
      }
    },
    productLoading: state => {
      return state.product.loading
    },
    storeError: state => {
      return state.error
    }
  },
  mutations: {
    clearProduct: (state) => {
      state.product = {...defaultProduct}
    },
    removeError: (state) => {
      state.error = false
    },
    setAccount: (state, payload) => {
      state.account = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setLoggedOut: (state) => {
      state.logged = false
      state.token = undefined
    },
    setModified: (state, payload) => {
      state.modified = {
        empty: payload.empty,
        list: payload.list
      }
    },
    setOrderData: (state, payload) => {
      state.order = {
        action: payload.action,
        card: payload.data.cartDetails,
        customer: payload.data.customer,
        data: {
          reference: payload.data.reference,
          totalPaid: payload.data.totalPaid,
          totalPaidDiscount: payload.data.totalPaidDiscount || null,
          totalProduct: payload.data.totalProduct,
          totalProductDiscount: payload.data.totalProductDiscount || null,
          totalShipment: payload.data.totalShipment
        },
        db: payload.db,
        id: payload.id,
        voucher: null
      }
    },
    setOrderEmpty: (state) => {
      state.order = {...defaultOrder}
    },
    setOrderEven: (state, payload) => {
      state.order = {...defaultOrder,
        action: payload.action,
        data: payload.data,
        db: payload.db,
        id: payload.id
      }
    },
    setOrderVoucher: (state, payload) => {
      state.order = {...defaultOrder,
        action: payload.action,
        customer: payload.data.customer,
        data: payload.data,
        db: payload.db,
        id: payload.id,
        voucher: payload.data.lastVoucher
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
    setProductData: (state, payload) => {
      state.product = modifyProduct(state.product, payload)
    },
    setProductHistory: (state, payload) => {
      state.product = modifyProduct(state.product, payload)
    },
    setProductLists: (state, payload) => {
      state.product.lists = true
      state.product.categories = payload.categories
      state.product.manufactorers = payload.manufactorers
    },
    setProductLoading: (state, payload) => {
      state.product.loading = payload
    },
    setProductName: (state, payload) => {
      state.product = modifyProduct(state.product, payload)
    },
    setToken: (state, payload) => {
      state.logged = true
      state.token = payload
    }
  },
  actions: {
    accountData: ({ commit }, payload) => commit('setAccount', payload),
    clearProduct: ({ commit }, payload) => commit('clearProduct'),
    error: ({ commit }, payload) => commit('setError', payload),
    modified: ({ commit }, payload) => commit('setModified', payload),
    orderDetails: ({ commit }, payload) => commit('setOrderData', payload),
    orderDiscount: ({ commit }, payload) => commit('setOrderData', payload),
    orderEmpty: ({ commit }) => commit('setOrderEmpty'),
    orderEven: ({ commit }, payload) => commit('setOrderEven', payload),
    orderMail: ({ commit }, payload) => commit('setOrderData', payload),
    orderVoucher: ({ commit }, payload) => commit('setOrderVoucher', payload),
    productData: ({ commit }, payload) => commit('setProductData', payload),
    productHistory: ({ commit }, payload) => commit('setProductHistory', payload),
    productLoading: ({ commit }, payload) => commit('setProductLoading', payload),
    productName: ({ commit }, payload) => commit('setProductName', payload)
  }
})
