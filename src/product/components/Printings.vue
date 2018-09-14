<template>
  <div>
    <busy v-if="loading" class="marginAuto"></busy>
    <div v-if="!loading" class="outerContent">
      <div class="content">
        <div class="row">
          <button class="btn btn-primary">{{ labels.addPrinting }}</button>
        </div>
        <h3 v-if="printings.empty" class="left">{{ labels.noPrintings }}</h3>
        <div v-if="!printings.empty">
          <h3 class="left">{{ labels.printings }}</h3>
          <div class="tableContent paddingBottom">
            <table class="table table-bordered">
              <thead>
                <tr>
                    <th v-for="item in config.options.printingsHeaders" :key="item">{{ item }}</th>
                </tr>
              </thead>
              <tbody class="table-striped">
                <tr v-for="(item, index) in printings.list" :key="index">
                  <td class="paddingTop">{{ index + 1 }}</td>
                  <td class="paddingTop">
                    <a :href="`${config.printingUrl}${item.id}/${item.name}`" target="_blank" class="pointer">{{ item.name }}</a>
                  </td>
                  <td class="paddingTop">{{ item.description }}</td>
                  <td class="paddingTop">{{ item.createdTime }}</td>
                  <td class="paddingTop">
                    <a :href="`${config.printingUrl}${item.id}/${item.name}`" target="_blank" class="pointer" download>
                      <font-awesome-icon
                        v-b-tooltip.hover
                        :title="labels.download"
                        icon="file"
                        class="float-left marginTop pointer"
                      />
                    </a>
                    <font-awesome-icon
                      v-b-tooltip.hover
                      @click="deleteItem(item.id)"
                      :title="labels.delete"
                      icon="trash"
                      class="float-right marginTop pointer"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>{{ printings }}</p>
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
  name: 'Printings',
  data () {
    return {
      labels: Labels.product,
      loading: false,
      config: Config
    }
  },
  components: {
    'busy': Circle
  },
  methods: {
    deleteItem (id) {
      ProductService.deletePrinting(id)
      .then(response => {
        if (response.data.success) {
          MessageService.success.next(response.data.reason)
        } else {
          throw new Error(response.data.reason)
        }
      })
      .catch(err => MessageService.error.next(err.message))
      .finally(() => {
        window.scrollTo(0, 0)
      })   
    },
    getData () {
      this.loading = true
      ProductService.getPrintings()
        .then(response => {
          if (response.data.success) {
            this.$store.dispatch('printings', {
              deliveryList: response.data.deliveryList,
              empty: response.data.empty,
              emptyDelivery: response.data.emptyDelivery,
              list: response.data.list
            })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => MessageService.error.next(err.message))
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapGetters([
      'printings'
    ])
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.paddingTop {
  padding-top: 10px;

}
.row {
    height: 32px;
    margin-bottom: 15px;
}
</style>
