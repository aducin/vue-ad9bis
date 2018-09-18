<template>
  <div class="outerContent">
    <div class="content">
      <h3 class="left">{{ labels.product.historyTitle }}{{ $route.params.id }}</h3>
      <div v-if="productData.type === 'history' && productData.history.length === 0" class="left row">
        <h4>{{ labels.product.noHistory }}</h4>
      </div>
      <div class="tableContent">
        <table v-if="productData.history && productData.history.length > 0" class="table table-bordered">
          <thead>
            <tr>
                <th v-for="item in headers" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <tbody class="table-striped">
            <tr v-for="(item, index) in productData.history" :key="index">
              <td class="paddingTop">{{ index + 1 }}</td>
              <td class="paddingTop">{{ item.date }}</td>
              <td class="paddingTop">{{ item.amount }}</td>
              <td class="paddingTop">{{ item.user }}</td>
              <td class="paddingTop">
                <span v-if="item.shop === 'new'">Nowy</span>
                <span v-else>Stary</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
            <div
              :class="{'col-md-4 col-lg-3': restoreNameSearch, 'col-md-6 col-lg-4': !restoreNameSearch}"
              class="col col-12">
              <router-link
                  :to="`/product/${$route.params.id}/edition`"
                  tag="button"
                  class="btn btn-primary buttons"
              >{{ labels.buttons.edition }}</router-link>
            </div>
            <div v-if="restoreNameSearch" class="col col-sm-12 col-md-4 col-lg-3">
              <button @click="goBack(true)" class="btn btn-primary buttons">{{ buttons.restoreList }}</button>
            </div>
            <div
              :class="{'col-md-4 col-lg-3': restoreNameSearch, 'col-md-6 col-lg-4': !restoreNameSearch}"
              class="col col-12">
              <button @click="goBack(false)" class="btn btn-danger buttons">{{ buttons.clear }}</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '../../services/productService'
import restoreNameMixin from '../../mixins/restoreName'
import universalMixin from '../../mixins/universal'
import Config from '../../config'
import Labels from '../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductHistory',
  mixins: [restoreNameMixin, universalMixin],
  data () {
    return {
      headers: Config.options.productHistoryHeaders,
      labels: Labels,
      restoreNameSearch: false
    }
  },
  methods: {
    getData () {
      ProductService.getHistory({ action: 'history', id: this.$route.params.id })
        .then(response => {
          if (response.data.success) {
            this.$store.dispatch('productHistory', { edition: 'history', list: response.data.list })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => this.$store.commit('setError', err.message))
    }
  },
  computed: {
    ...mapGetters([
      'productData'
    ])
  },
  watch: {
    '$route' () {
      this.getData()
    }
  },
  created () {
    this.getData()
    this.setRestore()
  }
}
</script>

<style scoped>
  .row {
      padding-top: 10px;
  }
  .tableContent {
    width: 80%;
  }
</style>
