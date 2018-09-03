<template>
  <div class="tableContent">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="item in headers" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody class="table-striped">
        <tr v-for="item in data.list" :key="item.id">
          <td class="paddingTop">{{ item.id }}</td>
          <td><img :src="imageUrl + item.id + '-' + item.image + '-thickbox.jpg'" height="70" width="70" class="imgBorder"></td>
          <td class="paddingTop">
            <a
              :href="link + item.id + '-' + item.link_rewrite + '.html'"
              target="blank"
              class="pointer"
            >{{ item.name }}</a>
          </td>
          <td class="paddingTop">{{ item.quantity }}</td>
          <td class="paddingTop" v-if="!item.discount.old">
            <p>{{ item.price.old }}{{ currency }}</p>
          </td>
          <td v-if="item.discount.old" class="invalid paddingTopSmall">
            <p>{{ item.priceReal.old }}{{ currency }}</p>
            <p>{{ labels.checkDiscount }}</p>
          </td>
          <td class="paddingTop" v-if="!item.discount.new">
            <p>{{ item.price.new }}{{ currency }}</p>
          </td>
          <td v-if="item.discount.new" class="invalid paddingTopSmall">
            <p>{{ item.priceReal.new }}{{ currency }}</p>
            <p>{{ labels.checkDiscount }}</p>
          </td>
          <td>
            <font-awesome-icon
              v-b-tooltip.hover
              :title="labels.editionBasic"
              @click="setBasic(item.id)"
              icon="list-alt"
              class="float-left marginTop pointer"
            />
            <font-awesome-icon
              v-b-tooltip.hover
              :title="labels.editionFull"
              @click="setFull(item.id)"
              icon="list"
              class="marginTop pointer"
            />
            <font-awesome-icon
              v-b-tooltip.hover
              :title="labels.history"
              @click="setHistory(item.id)"
              icon="newspaper"
              class="float-right marginTop pointer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MessageService from '../../services/messageService'
import ProductService from '../../services/productService'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'ProductDetail',
  data () {
    return {
      currency: Config.currency,
      headers: Config.options.productListHeaders,
      imageUrl: Config.imageUrl,
      labels: Labels.product,
      link: Config.linkUrl + Config.linkSuffix
    }
  },
  methods: {
    setBasic (id) {
      ProductService.getBasicId(id)
        .then(response => {
          if (response.data.success !== false) {
            this.$store.dispatch('productLoading', true)
            this.$store.dispatch('productData', { data: response.data, edition: 'basic' })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.dispatch('error')
          MessageService.error.next(err.message)
        })
    },
    setFull (id) {
      this.$router.push({ name: 'productEdition', params: {id} })
    },
    setHistory (id) {
      this.$router.push({ name: 'productHistory', params: {id} })
    }
  },
  props: ['data']
}
</script>

<style scoped>
  .marginTop {
    margin-top: 28px;
  }
  .paddingTop {
    padding-top: 35px;
  }
  .paddingTopSmall {
    padding-top: 22px;
  }
  .tableContent {
    width: 80%;
  }
</style>
