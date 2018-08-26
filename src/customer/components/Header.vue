<template>
  <div class="backgroundHeader">
    <div class="headerTitle">
      <h3 class="left">{{ labels.title }}</h3>
    </div>
    <div class="headerContainer">
      <div v-bind:class="{invalid: $v.email.$error}" class="label">
        <h4 class="absolute">
          <span v-if="!$v.email.$error">{{ labels.email }}</span>
          <span v-else>{{ labels.emailError }}</span>
        </h4>
      </div>
      <div class="input">
        <input
          type="text"
          @blur="$v.email.$touch()"
          v-model="email"
          v-bind:class="{invalidBorder: $v.email.$error}"
          class="form-control"
          :placeholder="placeholders.email"
         />
      </div>
      <div class="button">
        <button
          :disabled="$v.$invalid"
          type="button"
          class="btn btn-primary"
          v-bind:class="{notAllowed: $v.$invalid}"
        >{{ labels.search }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Labels from '../../labels'

export default {
  name: 'CustomerHeader',

  data () {
    return {
      email: '',
      labels: Labels.customer,
      placeholders: Labels.placeholders
    }
  },
  validations: {
    email: {
      required, email
    }
  },
  updated () {
    console.log(this.email)
    console.log(this.$v.email.email)
  }
}
</script>

<style scoped>
  .button {
    grid-area: button;
  }
  .headerContainer {
    display: grid;
    padding-bottom: 20px;
  }
  .input {
    grid-area: input;
  }
  .label {
    grid-area: label;
  }
  @media only screen and (min-width: 901px) {
    button {
      width: 160px;
    }
    .headerContainer {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
      "label input button";
    }
    input {
      width: 250px;
    }
  }
  @media only screen and (max-width: 900px) and (min-width: 720px) {
    button {
      margin-left: 5%;
      width: 95%;
    }
    .headerContainer {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
      "label label"
      "input button";
    }
    input {
      width: 95%;
    }
  }
  @media only screen and (max-width: 719px) {
    button {
      margin-top: 10px;
      width: 100%;
    }
    .headerContainer {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
      "label"
      "input"
      "button";
    }
    input {
      width: 100%;
    }
  }
</style>
