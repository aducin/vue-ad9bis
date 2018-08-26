<template>
  <div class="loginContainer">
    <div class="form-signin">
      <h2 v-if="$v.login.$error || $v.password.$error" class="invalid">{{ labels.error }}</h2>
      <h2 v-else>{{ labels.title }}</h2>
      <div v-if="display" v-bind:class="[type === 'success' ? 'alert-success' : 'alert-danger']" class="alert">
        <p>{{ message }}</p>
      </div>
      <input
        @blur="$v.login.$touch()"
        v-model="login"
        type="text"
        v-bind:class="[$v.login.$error ? 'invalidBorder' : 'inputBorder']"
        class="form-controll"
        :placeholder="placeholders.login"
      />
      <input
        @blur="$v.password.$touch()"
        v-model="password"
        type="password"
        v-bind:class="[$v.password.$error ? 'invalidBorder' : 'inputBorder']"
        class="form-controll"
        :placeholder="placeholders.password"
      />
      <label>
        <input v-model="remember" type="checkbox" class="form-controll" />
        <span>{{ labels.remember }}</span>
      </label>
      <button
        :disabled="$v.$invalid"
        @click="signIn"
        v-bind:class="{notAllowed: $v.$invalid}"
        class="btn btn-primary"
      >{{ labels.login }}</button>
    </div>
  </div>
</template>

<script>
import LoginService from '../services/loginService'
import { required, minLength } from 'vuelidate/lib/validators'
import Config from '../config'
import Labels from '../labels'

export default {
  name: 'Login',
  data () {
    return {
      display: false,
      labels: Labels.login,
      login: '',
      message: undefined,
      password: '',
      placeholders: Labels.placeholders,
      remember: false,
      type: undefined
    }
  },
  methods: {
    setCookie (token) {
      this.$cookies.set('vueAd9bisCookie', token, Config.timerCookie)
    },
    setDisplay (message) {
      this.message = message
      this.display = true
      setTimeout(() => {
        this.display = false
        this.message = undefined
        if (this.type === 'success') {
          this.$router.push({name: Config.defaultUrl})
        }
      }, Config.timer)
    },
    setToken (token) {
      localStorage.setItem('vueAd9bisToken', token)
      localStorage.setItem('vueAnimated', true)
    },
    signIn () {
      let data = {
        action: 'login',
        login: this.login,
        password: this.password,
        remember: this.remember
      }
      LoginService.login(data)
        .then(response => {
          this.type = response.data.success ? 'success' : 'error'
          if (this.type === 'success') {
            this.setToken(response.data.token)
            if (this.remember) {
              this.setCookie(response.data.token)
            }
          }
          this.setDisplay(response.data.reason)
        })
        .catch(err => {
          this.type = 'error'
          this.setDisplay(err.message)
        })
    }
  },
  validations: {
    login: {
      required,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(5)
    }
  }
}
</script>

<style scoped>
  button {
    font-size: 18px;
    margin-top: 20px;
    width: 100%;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 15px;
  }
  input[type="text"], input[type="password"] {
    border-radius: 4px;
    height: 36px;
    margin-top: 10px;
    text-align: center;
    width: 100%;
  }
  input:focus {
    background-color: rgb(250, 255, 189);
  }
  label {
    font-size: 16px;
    margin-top: 25px;
  }
  .alert {
    font-size: 14px;
    margin-top: 25px;
    margin-bottom: 20px;
    padding-top: 20px;
  }
  .form-signin {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
    max-width: 380px;
    margin: auto;
    margin-bottom: 30px;
    padding: 15px 35px 45px;
    text-align: center;
  }
  .inputBorder {
    border: 1px solid #ccc;
  }
  @media only screen and (min-width: 901px) {
    .loginContainer {
      padding-top: 135px;
    }
  }
  @media only screen and (max-width: 900px) {
    .loginContainer {
      padding-top: 15%;
    }
  }
</style>
