<template>
  <div v-bind:class="[self === 'login' ? 'login' : 'main']" id="app">
    <header-links v-if="self !== 'login'"></header-links>
    <message v-if="messageObj.display" v-bind:data="messageObj" class="messageContent"></message>
    <transition mode="out-in"
      enter-active="enterTransition"
      :enter-active-class="enter"
      :leave-active-class="leave"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import HeaderLinks from './shared/HeaderLinks.vue'
import LoginService from './services/loginService'
import Message from './shared/Message.vue'
import Config from './config'

export default {
  name: 'App',
  components: {
    'header-links': HeaderLinks,
    'message': Message
  },
  data () {
    return {
      enter: undefined,
      leave: undefined,
      self: undefined
    }
  },
  computed: mapGetters([
    'messageObj'
  ]),
  methods: {
    getToken () {
      let token = localStorage.getItem('vueAd9bisToken')
      if (!token) {
        token = this.$cookies.get('vueAd9bisCookie')
      }
      return token
    },
    init () {
      let token = this.getToken()
      if (!token) {
        this.$router.push({name: 'login'})
      } else {
        this.checkToken(token)
      }
    },
    checkToken (token) {
      LoginService.checkToken(token)
        .then(response => {
          if (response.data.success) {
            this.$store.commit('setToken', response.data.token)
            if (this.self === 'login') {
              this.$router.push({name: Config.defaultUrl})
            }
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.commit('setError', err.message)
          this.$router.push({name: 'login'})
        })
    },
    setSelf () {
      if (this.$route.name !== this.self && this.$route.name !== 'login' && this.self !== 'login') {
        localStorage.removeItem('vueAnimated')
      }
      this.self = this.$route.name
      if (localStorage.getItem('vueAnimated')) {
        this.enter = 'animated rubberBand'
        this.leave = 'animated rotateOut'
      } else {
        this.enter = 'animated slideInLeft'
        this.leave = 'animated slideOutRight'
      }
    }
  },
  created () {
    this.setSelf()
    this.init()
  },
  beforeUpdate () {
    this.setSelf()
    if (!this.$store.state.logged || this.self === 'login') {
      this.init()
    }
  },
}
</script>

<style>
  .messageContent {
    width: 60%;
    margin: auto;
    margin-bottom: 10px;
  }
</style>
