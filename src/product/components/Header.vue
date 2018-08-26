<template>
  <div class="backgroundHeader">
    <div class="headerTitle">
      <h3 class="left">{{ labels.title }}</h3>
    </div>
    <div class="headerContainer">
      <div class="labels">
        <div class="row">
          <h4>{{ labels.byName }}</h4>
        </div>
        <div class="row">
          <label>{{ labels.chooseCategory }}</label>
        </div>
        <div class="row displayNoneSmall">
          <label>{{ labels.chooseManufactorer }}</label>
        </div>
        <div class="row displayNoneSmall">
          <label>{{ labels.name }}</label>
        </div>
      </div>
      <div class="nameSearch">
        <div class="row displayNoneSmall"></div>
        <div class="row">
          <b-form-select
            v-model="selected.category"
            :disabled="productCategories.length === 0"
            :options="productCategories"
            class="mb-3 dataWidth"
          >
            <template slot="first">
              <option :value="null" disabled>-- {{ labels.choose }} --</option>
            </template>
          </b-form-select>
        </div>
        <div class="row displayNoneBig displayNoneMedium">
          <label>{{ labels.chooseManufactorer }}</label>
        </div>
        <div class="row">
          <b-form-select
            v-model="selected.manufactorer"
            :disabled="productManufactorers.length === 0"
            :options="productManufactorers"
            class="mb-3 dataWidth"
          >
            <template slot="first">
              <option :value="null" disabled>-- {{ labels.choose }} --</option>
            </template>
          </b-form-select>
        </div>
        <div class="row displayNoneBig displayNoneMedium">
          <label>{{ labels.name }}</label>
        </div>
        <div class="row">
          <input type="text" v-model="selected.name" class="form-control dataWidth" :placeholder="placeholders.name" />
        </div>
      </div>
      <div class="idSearch">
        <div v-bind:class="{invalid: $v.selected.id.$error && isNaN(selected.id)}" class="row">
          <h4>{{ labels.byId }}</h4>
        </div>
        <div class="row">
          <input
            type="text"
            @input="$v.selected.id.$touch()"
            v-model="selected.id"
            v-bind:class="{invalidBorder: $v.selected.id.$error}"
            class="form-control dataWidth"
            :placeholder="placeholders.chooseNumber"
          />
        </div>
        <div class="row">
          <button
            :disabled="$v.$invalid"
            type="button"
            v-bind:class="{notAllowed: $v.$invalid}"
            class="btn btn-primary dataWidth"
          >{{ labels.search }}</button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import Labels from '../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductHeader',
  data () {
    return {
      labels: Labels.product,
      placeholders: Labels.placeholders,
      selected: {
        category: null,
        id: null,
        manufactorer: null,
        name: ''
      }
    }
  },
  computed: mapGetters([
    'productCategories',
    'productManufactorers'
  ]),
  validations: {
    selected: {
      id: {
        required,
        numeric,
        minValue: minValue(13)
      }
    }
  },
  updated () {
    console.log(this.selected.id)
    console.log(this.$v.selected.id.$error)
  }
}
</script>

<style scoped>
  .dataWidth {
    width: 100%;
  }
  .headerContainer {
     margin: auto;
     margin-bottom: 40px;
     padding-bottom: 10px;
     width: 80%;
  }
  @media only screen and (max-width: 719px) {
    label {
      margin-top: 10px;
    }
    .idSearch {
      margin-top: 20px;
    }
  }
  @media only screen and (max-width: 900px) and (min-width: 720px) {
    .dataWidth {
      width: 210px;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
      "labels name";
    }
  }
  @media only screen and (min-width: 901px) {
    .dataWidth {
      width: 80%;
      max-width: 210px;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
      "labels name id";
    }
    .idSearch {
      grid-area: id;
    }
    .labels {
      grid-area: labels;
    }
    .nameSearch {
      grid-area: name;
    }
  }
</style>
