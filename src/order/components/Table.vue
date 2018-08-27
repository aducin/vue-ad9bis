<template>
    <div class="tableContent">
    <table class="table table-bordered">
        <thead>
        <tr>
            <th v-for="item in headers" :key="item">{{ item }}</th>
        </tr>
        </thead>
        <tbody class="table-striped">
        <tr v-for="item in card" :key="item.productId">
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
      currency: Config.currency,
      headers: Config.options.orderDetailHeaders,
      labels: Labels,
      link: Config.linkUrl + Config.linkSuffix
    }
  },
  props: ['card']
}
</script>

<style scoped>
  .imgBorder {
    border: 1px solid #BDBBBB;
    border-radius: 5px;
  }
  .tableContent {
    width: 100%;
    margin: auto;
    margin-top: 10px;
  }
  .paddingTop {
    padding-top: 34px;
  }
  .paddingTopButton {
    padding-top: 29px;
  }
</style>
