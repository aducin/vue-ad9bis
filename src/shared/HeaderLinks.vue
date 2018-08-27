<template>
  <div class="headerContainer">
    <div class="links">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/product" tag="a" class="nav-link pointer" active-class="active">Produkty</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/order" tag="a" class="nav-link pointer" active-class="active">Zamówienia</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/postal" tag="a" class="nav-link pointer" active-class="active">Wysyłki</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/account" tag="a" class="nav-link pointer" active-class="active">Rachunki</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/customer" tag="a" class="nav-link " active-class="active">Klienci</router-link>
        </li>
      </ul>
    </div>
    <div class="logout">
      <button @click="logout" type="button" class="btn btn-danger">Wyloguj</button>
    </div>
  </div>
</template>

<script>
import MessageService from '../services/messageService'
import Config from '../config'
import Labels from '../labels'

export default {
  name: 'HeaderLinks',
  data () {
    return {
      message: Labels.logout
    }
  },
  methods: {
    logout () {
      MessageService.success.next(this.message)
      setTimeout(() => {
        localStorage.setItem('vueAd9bisToken', null)
        localStorage.setItem('vueAnimated', true)
        this.$cookies.remove('vueAd9bisCookie')
        this.$router.push({name: 'login'})
      }, Config.timer)
    }
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 820px) {
    button, .nav-item {
      width: 100%;
      margin: auto;
      padding: 5px 0 5px;
    }
    .logout {
      margin-top: 5px;
      margin-bottom: 20px;
    }
    .nav-link {
      margin-bottom: 10px;
    }
  }
  @media only screen and (min-width: 821px) {
    button, .nav-item {
      height: 32px;
      min-width: 90px;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 5fr 1fr;
      margin-bottom: 40px;
    }
    .logout {
      text-align: right;
    }
    .nav-item {
      margin-right: 5px;
    }
  }
  .nav-link {
    background: #F6F1F1;
    border: 1px solid #B2AEAE;
    color: #392B7D;
  }
  .nav-link:hover {
    background: #C7B8B8;
    color: #FCF6F6;
    font-weight: 550;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition: all 0.4s ease;
  }
  .active:hover {
    background: #3D4397;
    cursor: not-allowed;
    font-weight: 300;
    opacity:0.5;
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
    transition:all 0.4s ease;
  }
  button:hover {
    font-weight: 550;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition:all 0.4s ease;
  }
</style>
