<template>
  <div>
    <busy v-if="lastOrders.loading" class="marginAuto"></busy>
    <div v-if="!lastOrders.loading" class="outerContent">
      <div v-if="!lastOrders.newest.new && !lastOrders.newest.old" class="content">
        <h3 class="left">{{ labels.noLastOrders }}</h3>
      </div>
      <div v-if="lastOrders.newest.new || lastOrders.newest.old" class="content">
          <h3 class="left">{{ labels.lastOrders }}</h3>
          <div v-for="(v, k, i) in lastOrders.newest" :key="i">
            <div v-if="lastOrders.newest[k]" class="tableContent paddingBottom">
              <div class="col-12 marginBottom10px">
                <h4>{{ labels.panels[k] }}</h4>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th v-for="item in options.lastOrders" :key="item">{{ item }}</th>
                  </tr>
                </thead>
                <tbody class="table-striped">
                  <tr v-for="(item, index) in lastOrders.list[k]" :key="index">
                    <td class="paddingTop">
                      <a :href="`#/order/${k}/${item.id}`" target="_blank" class="pointer">{{ item.id }}</a>
                    </td>
                    <td class="paddingTop">{{ item.reference }}</td>
                    <td class="paddingTop">{{ item.dateAdd }}</td>
                    <td class="paddingTop">{{ item.totalProduct }}{{ currency }}</td>
                    <td class="paddingTop">{{ item.totalShipping }}{{ currency }}</td>
                    <td>
                      <button @click="deleteRow(k, item.id)" class="btn btn-primary">{{ labels.deleteOrder }}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="lastOrders.newest.new">
          </div>
          <div v-if="lastOrders.newest.old">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import MessageService from '../../services/messageService'
import ProductService from '../../services/productService'

import Config from '../../config'
import Labels from '../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'LastOrders',
  data () {
    return {
      currency: Config.currency,
      labels: Labels.product,
      options: Config.options
    }
  },
  components: {
    'busy': Circle
  },
  methods: {
    deleteRow (panel, id) {
      ProductService.modifyLastOrder(panel, id, this.$store.state.token)
        .then(response => {
          if (response.data.success) {
            MessageService.success.next(response.data.reason)
            this.getOrders()
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => MessageService.error.next(err.message))
        .finally(() => {
          window.scrollTo(0, 0)
        })
    },
    getOrders () {
      ProductService.getLastOrders()
        .then(response => {
          if (response.data.success) {
            this.$store.dispatch('lastOrders', { list: response.data.list, newest: response.data.newest })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => MessageService.error.next(err.message))
    }
  },
  computed: {
    ...mapGetters([
      'lastOrders'
    ])
  },
  created () {
    this.getOrders()
  }
}

</script>

<style scoped>
.paddingBottom {
    padding-bottom: 10px;
}
.paddingTop {
  padding-top: 15px;
}
@media only screen and (min-width: 767px) {
    .table {
        width: 80%;
        margin: auto;
    }
}
</style>
