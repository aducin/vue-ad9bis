<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <h3 class="left">{{ labels.history }}</h3>
      <div class="tableContent">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="item in headers" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <tbody class="table-striped">
            <tr v-for="item in postalList" :key="item.number">
              <td>{{ item.number }}</td>
              <td>{{ item.current }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-btn v-b-modal.modal1>Launch demo modal</b-btn>
    </div>
  </div>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'PostalDetail',
  data () {
    return {
      headers: Config.options.postalHeaders,
      labels: Labels.postal
    }
  },
  computed: mapGetters([
    'postalList'
  ])
}
</script>

<style scoped>
  .tableContent {
    width: 70%;
    margin: auto;
    margin-top: 20px;
  }
</style>
