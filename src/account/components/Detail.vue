<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <h3 v-if="innerData.automatic" class="left">{{ labels.list }}{{ labels.automatic }}{{ innerData.amount }}{{ labels.foundAutomatic }}</h3>
      <h3 v-else class="left">{{ labels.list }}{{ innerData.amount }}{{ labels.foundCustom }}</h3>
    </div>
    <div class="accountTableContent">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="item in options.accountHeaders" :key="item.name">{{ item.value }}
              <span v-if="item.name !== 'id' && item.name !== 'remarks'" class="float-right pointer">
                <span v-if="sortBy === item.name">
                  <font-awesome-icon v-if="ascending" @click="sortTable(item.name)" icon="arrow-circle-up" />
                  <font-awesome-icon v-else @click="sortTable(item.name)" icon="arrow-circle-down" />
                </span>
                <font-awesome-icon v-if="sortBy !== item.name" @click="sortTable(item.name)" icon="arrow-circle-right" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="table-striped">
          <tr
            v-for="(item, index) in list"
            :key="item.number"
            @click="setActiveRow(item.id, item.closed)"
            v-bind:class="{ activeRow: item.id === activeRow, pointer: item.closed !== 1 }"
          >
            <td v-bind:class="{ invalid: item.closed === 1, colorSuccess: item.closed !== 1 }">{{ index + 1 }}</td>
            <td>{{ item.recipient }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.amount | currency }}</td>
            <td>{{ item.typeName }}</td>
            <td>{{ item.receipt }}</td>
            <td>{{ item.receiptTime }}</td>
            <td>{{ item.cashTime }}</td>
            <td>{{ item.locs }}</td>
            <td>{{ item.coach }}</td>
            <td>{{ item.element }}</td>
            <td>{{ item.accessories }}</td>
            <td>{{ item.book }}</td>
            <td>{{ item.car }}</td>
            <td>{{ item.remarks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AccountService from '../../services/accountService'
import MessageService from '../../services/messageService'
import Config from '../../config'
import Labels from '../../labels'
import { setList } from '../../functions/account/setList'

export default {
  name: 'AccountDetail',
  data () {
    return {
      activeRow: null,
      ascending: false,
      innerData: {},
      labels: Labels.account,
      list: [],
      options: Config.options,
      sortBy: 'id'
    }
  },
  methods: {
    setActiveRow (id, closed) {
      AccountService.edition.next(Boolean(this.activeRow === id || closed))
      if (this.activeRow === id) {
        this.activeRow = null
      } else if (closed) {
        window.scrollTo(0, 0)
        MessageService.error.next(this.labels.accountClosed)
      } else {
        this.activeRow = id
        let curIndex = this.list.findIndex(el => parseInt(el.id) === parseInt(id))
        if (curIndex !== -1) {
          AccountService.setActiveRow(this.list[curIndex])
        }
      }
    },
    setData () {
      this.innerData = this.data
      this.list = setList(this.data.list, this.sortBy, this.ascending, this.options)
    },
    sortTable (name) {
      if (name !== 'id' && name !== 'remarks') {
        if (this.sortBy !== name) {
          this.sortBy = name
        } else {
          this.ascending = !this.ascending
        }
        this.setData()
      }
    }
  },
  props: ['data'],
  created () {
    this.setData()
  }
}
</script>

<style scoped>
.backgroundHeader {
  width: 110%;
  margin-left: -5%;
  margin-bottom: 25px;
  padding-bottom: 15px;
}
.detailContener {
  margin-bottom: 5px;
}
</style>
