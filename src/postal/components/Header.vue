<template>
  <div v-bind:class="{opacity5: postalLoading}" class="backgroundHeader">
    <div class="headerTitle">
      <h3 class="left">{{ labels.title }}</h3>
    </div>
    <div class="headerContainer">
      <div id="firstRow">
        <div class="col">
          <h4>{{ labels.currentAmount }}</h4>
        </div>
        <div class="col marginTop">
          <b-btn
            v-b-modal.postalModal
            @click="action = 'add'"
            class="btn btn-primary absoluteWidth buttonBackground"
          >{{ labels.add }}</b-btn>
        </div>
      </div>
      <div>
        <div class="col absoluteSmall">
          <h4 v-if="postalAmount">{{ postalAmount | currency }}</h4>
          <h4 v-else><i>{{ labels.noAmount }}</i></h4>
        </div>
        <div class="col marginTop">
          <b-btn
            v-b-modal.postalModal
            @click="action = 'subtract'"
            class="btn btn-primary absoluteWidth buttonBackground"
          >{{ labels.subtract }}</b-btn>
        </div>
      </div>
    </div>
    <postal-modal v-bind:action="action" v-bind:amount="postalAmount" @refresh="$emit('refresh')"></postal-modal>
  </div>
</template>

<script>
import Labels from '../../labels'
import PostalModal from './Modal.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'PostalHeader',
  components: {
    'postal-modal': PostalModal
  },
  data () {
    return {
      action: null,
      labels: Labels.postal
    }
  },
  computed: mapGetters(['postalAmount', 'postalLoading'])
}
</script>

<style scoped>
  .marginTop {
    margin-top: 20px;
  }
  @media only screen and (min-width: 720px) {
    button {
      width: 80%;
      min-width: 160px;
      max-width: 220px;
    }
    .headerContainer {
      width: 50%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-bottom: 20px;
    }
    .row {
      width: 65%;
      margin: auto;
    }
  }
  @media only screen and (max-width: 719px) {
    h4 {
      text-align: left;
    }
    button {
      width: 100%;
    }
    #firstRow {
      width: 100%;
    }
    .absoluteSmall {
      position: absolute;
      top: 476px;
      margin-left: 130px;
    }
  }
</style>
