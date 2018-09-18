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
            :disabled="action === 'productEdition' || action === 'productHistory'"
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
            :disabled="action === 'productEdition' || action === 'productHistory'"
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
          <input type="text"
            @input="searchName"
            :disabled="action === 'productEdition' || action === 'productHistory'"
            v-model="selected.name"
            class="form-control dataWidth"
            :placeholder="placeholders.name" />
        </div>
      </div>
      <div class="idSearch">
        <div v-bind:class="{invalid: $v.selected.id.$error && isNaN(selected.id)}" class="row">
          <h4>{{ labels.byId }}</h4>
        </div>
        <div class="row">
          <input type="text"
            @input="$v.selected.id.$touch()"
            :disabled="action === 'productEdition' || action === 'productHistory'"
            v-model="selected.id"
            v-bind:class="{invalidBorder: $v.selected.id.$error}"
            class="form-control center dataWidth"
            :placeholder="placeholders.chooseNumber"
          />
        </div>
        <div class="row">
          <button type="button"
            :disabled="$v.$invalid"
            v-bind:class="{notAllowed: $v.$invalid}"
            @click="basicId"
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
import labelsProductMixin from '../../mixins/labelsProduct'
import MessageService from '../../services/messageService'
import nameSearchMixin from '../../mixins/nameSearch'
import ProductService from '../../services/productService'
import universalMixin from '../../mixins/universal'
import Labels from '../../labels'
import { mapGetters } from 'vuex'

const selected = { category: null, id: null, manufactorer: null, name: '' }

export default {
  name: 'ProductHeader',
  mixins: [labelsProductMixin, nameSearchMixin, universalMixin],
  data () {
    return {
      selected: {...selected}
    }
  },
  methods: {
    basicId () {
      ProductService.getBasicId(this.selected.id)
        .then(response => {
          if (response.data.success !== false) {
            this.$store.dispatch('productLoading', true)
            this.$store.dispatch('productData', { data: response.data, edition: 'basic' })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.dispatch('error')
          MessageService.error.next(err.message)
        })
    },
    searchName () {
      if (!this.nameSearch) {
        this.nameSearch = true
        setTimeout(() => {
          if (this.selected.name.length >= 3) {
            let params = {
              name: this.selected.name,
              nameSearch: true,
              category: this.selected.category || null,
              manufacturer: this.selected.manufactorer || null
            }
            localStorage.setItem('vue-nameParams', JSON.stringify(params))
            this.searchingName(params)
          }
        }, this.timer)
      }
    }
  },
  props: ['action'],
  computed: mapGetters([
    'productCategories',
    'productManufactorers'
  ]),
  validations: {
    selected: {
      id: { required, numeric, minValue: minValue(13) }
    }
  },
  created () {
    ProductService.clearHeader.subscribe(() => this.selected =  {...selected})
    ProductService.nameSearch.subscribe(() => this.searchName())
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
      "labels n51ame";
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
