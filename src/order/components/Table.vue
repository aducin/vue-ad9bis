<template>
    <div class="tableContent">
      <table class="table table-bordered">
        <thead>
          <tr>
            <template v-if="data.action === 'discount' || data.action === 'mail' || data.action === 'order'">
              <th v-for="item in headersOrder" :key="item">{{ item }}</th>
            </template>
            <template v-if="data.action === 'even'">
              <th v-for="item in headersEven" :key="item.id">
                <span v-if="item.id < 5 || item.id > 7">{{ item.name }}</span>
                <span v-if="item.id === 5">{{ item.name }} {{ even.base }}</span>
                <span v-if="item.id === 6 || item.id === 7">{{ item.name }} {{ even.second }}</span>
              </th>
            </template>
            <template v-if="data.action === 'voucher'">
              <th v-for="item in headersVoucher" :key="item">{{ item }}</th>
            </template>
          </tr>
        </thead>
        <tbody class="table-striped">
          <template v-if="data.action === 'discount' || data.action === 'mail' || data.action === 'order'">
            <tr v-for="item in data.card" :key="item.productId">
                <td><img :src="item.cover" height="70" width="70" class="imgBorder"></td>
                <td class="paddingTop">{{ item.productId }}</td>
                <td class="paddingTop">
                  <a :href="link + item.productId + '-' + item.linkRewrite + '.html'" target="blank" class="pointer">{{ item.productName }}</a>
                </td>
                <td class="paddingTop">{{ item.quantity.current }}</td>
                <td class="paddingTop">{{ item.quantity.toUpdate }}</td>
                <td class="paddingTop">{{ item.productQuantity }}</td>
                <td class="paddingTopButton">
                  <a :href="'/product/' + item.productId + '/edition'" target="blank" class="btn btn-primary pointer" >{{ labels.order.edition }}</a>
                </td>
            </tr>
          </template>
          <template v-if="data.action === 'even'">
            <tr v-for="item in data.data" :key="item.productId">
              <td><img :src="item.cover" height="70" width="70" class="imgBorder"></td>
              <td class="paddingTop">{{ item.id }}</td>
              <td class="paddingTop">
                <a :href="link + item.id + '-' + item.linkRewrite + '.html'" target="blank" class="pointer">{{ item.name }}</a>
              </td>
              <td class="paddingTop">{{ item.ordered }}</td>
              <td class="paddingTop">{{ item.baseDbQuantity }}</td>
              <td class="paddingTop">{{ item.quantityBeforeChange }}</td>
              <td class="paddingTop">{{ item.quantityAfterChange }}</td>
              <td class="paddingTopSmall">
                <div>{{ item.modification }}</div>
                <div><a :href="'#/products/' + item.id + '/edition'" target="blank">{{ buttons.edition }}</a></div>
                <div><a :href="'#/products/' + item.id + '/history'" target="blank">{{ buttons.history }}</a></div>
              </td>
            </tr>
          </template>
          <template v-if="data.action === 'voucher' && data.data.data">
            <tr v-for="item in data.data.data" :key="item.productId" class="paddingTop10">
              <td >{{ item.id }}</td>
              <td>{{ item.reference }}</td>
              <td>{{ item.totalProduct }}{{ currency }}</td>
              <td>{{ item.totalShipping }}{{ currency }}</td>
              <td>{{ item.dateAdd }}</td>
              <td>{{ item.voucherNumber }}</td>
            </tr>
          </template>
        </tbody>
    </table>
    </div>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'Table',
  data () {
    return {
      buttons: Labels.buttons,
      currency: Config.currency,
      headersEven: Config.options.orderEvenHeaders,
      headersOrder: Config.options.orderDetailHeaders,
      headersVoucher: Config.options.orderVoucherHeaders,
      labels: Labels,
      link: Config.linkUrl + Config.linkSuffix
    }
  },
  props: ['data', 'even']
}
</script>

<style scoped>
  .tableContent {
    width: 100%;
  }
  .paddingTop {
    padding-top: 34px;
  }
  .paddingTop10 {
    padding-top: 10px;
  }
  .paddingTopButton {
    padding-top: 29px;
  }
  .paddingTopSmall {
    padding-top: 15px;
  }
</style>
