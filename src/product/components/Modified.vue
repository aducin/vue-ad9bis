<template>
  <div>
    <busy v-if="loading" class="marginAuto"></busy>
    <div v-if="!loading" class="outerContent">
      <div v-if="modifiedData.empty" class="content">
        <h3 class="left">{{ labels.product.modifiedEmpty }}</h3>
      </div>
      <div v-if="!modifiedData.empty" class="content">
        <h3 class="left">{{ labels.product.modifiedTitle }}</h3>
        <div class="tableContent">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th v-for="item in config.options.modifiedHeaders" :key="item">{{ item }}</th>
              </tr>
            </thead>
            <tbody class="table-striped">
              <tr v-for="(item, index) in modifiedData.list" :key="index">
                <td class="paddingTop">{{ index + 1 }}</td>
                <td class="paddingTop">
                  <a :href="config.linkUrl + item.id + '-' + item.link_rewrite + '.html'" target="blank">{{ item.name }}</a>
                </td>
                <td class="paddingTop">{{ item.date }}</td>
                <td><button @click="clearRow(item.id)" class="btn btn-primary">{{ labels.buttons.clear }}</button></td>
              </tr>
            </tbody>
          </table>
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
  name: 'Modified',
  data () {
    return {
      config: Config,
      labels: Labels,
      loading: false
    }
  },
  components: {
    'busy': Circle
  },
  methods: {
    clearRow (id) {
      ProductService.deleteModified(id)
        .then(response => {
          if (response.data.success) {
            MessageService.success.next(response.data.reason)
            this.getModified()
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => MessageService.error.next(err.message))
    },
    getModified () {
      this.loading = true
      ProductService.getModified()
        .then(response => {
          if (response.data.success !== false) {
            let list = !response.data.empty ? response.data : []
            this.$store.dispatch('modified', { empty: Boolean(response.data.empty), list })
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
      'modifiedData'
    ])
  },
  created () {
    this.getModified()
  }
}
</script>

<style scoped>
button {
    width: 100px;
}
.paddingTop {
  padding-top: 15px;
}
</style>
