<template>
  <div class="backgroundHeader">
    <div class="headerTitle">
      <h3 class="left">{{ labels.title }}</h3>
    </div>
    <div class="headerContainer">
      <div class="labels">
        <div class="row">
          <h4 class="absolute">{{ labels.advanced }}</h4>
        </div>
        <div class="row">
          <label>{{ labels.type }}</label>
        </div>
        <div class="row displayNoneSmall">
          <label>{{ labels.state }}</label>
        </div>
        <div class="row displayNoneSmall">
          <label>{{ labels.dateFrom }}</label>
        </div>
        <div class="row displayNoneSmall">
          <label>{{ labels.dateTo }}</label>
        </div>
      </div>
      <div class="data">
        <div class="row displayNoneSmall"></div>
        <div class="row">
          <b-form-select v-model="selected.type" :options="options.types" class="mb-3 dataWidth" >
            <template slot="first">
              <option :value="null" disabled>-- {{ labels.choose }} --</option>
            </template>
          </b-form-select>
        </div>
        <div class="row displayNoneBig displayNoneMedium">
          <label>{{ labels.dateFrom }}</label>
        </div>
        <div class="row">
          <b-form-select v-model="selected.state" :options="options.states" class="mb-3 dataWidth" >
            <template slot="first">
              <option :value="null" disabled>-- {{ labels.choose }} --</option>
            </template>
          </b-form-select>
        </div>
        <div class="row displayNoneBig displayNoneMedium">
          <label>{{ labels.dateTo }}</label>
        </div>
        <div class="row">
          <date-picker
            v-model="selected.dateFrom"
            :editable="false"
            :first-day-of-week="1"
            :lang="settings"
            class="dataWidth"
          ></date-picker>
        </div>
        <div class="row displayNoneBig displayNoneMedium">
          <label>{{ labels.state }}</label>
        </div>
        <div class="row">
          <date-picker
          v-model="selected.dateTo"
          :editable="false"
          :first-day-of-week="1"
          :lang="settings"
          class="dataWidth"
        ></date-picker>
        </div>
      </div>
      <div class="buttons displayNoneMedium">
        <div class="rightTitle row smallMarginTop">
          <h4>{{ labels.management }}</h4>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary dataWidth">{{ labels.add }}</button>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary dataWidth">{{ labels.edit }}</button>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary dataWidth">{{ labels.createXml }}</button>
        </div>
      </div>
      <div class="displayNoneBig displayNoneSmall">
        <div class="row">
          <h4>{{ labels.management }}</h4>
        </div>
        <div class="mediumRow">
          <button type="button" class="btn btn-primary mediumButton">{{ labels.add }}</button>
          <button type="button" class="btn btn-primary mediumButton">{{ labels.edit }}</button>
          <button type="button" class="btn btn-primary mediumButton">{{ labels.createXml }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import dateSettings from '../../datepicker.js'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'AccountHeader',
  components: { DatePicker },
  data () {
    return {
      labels: Labels.account,
      options: Config.options,
      selected: {
        dateFrom: '',
        dateTo: '',
        state: null,
        type: null
      },
      settings: dateSettings
    }
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 900px) and (min-width: 720px) {
    .data {
      margin-left: 15%;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
      "labels data";
    }
    .mediumButton {
      width: 23.5%
    }
    .mediumRow {
      position: absolute;
      left: 0;
      right: 0;
    }
  }
  @media only screen and (min-width: 901px) {
    .buttons {
      grid-area: buttons;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1fr 2fr 2fr;
      grid-template-areas:
      "labels data buttons";
    }
    .data {
      grid-area: data;
    }
    .labels {
      grid-area: labels;
    }
    .rightTitle {
      width: 110%;
    }
  }
  @media only screen and (min-width: 720px) {
    .dataWidth {
      width: 210px;
    }
  }
  @media only screen and (max-width: 719px) {
    label {
      margin-top: 10px;
    }
    .dataWidth {
      width: 100%;
    }
    .smallMarginTop {
      margin-top: 20px;
    }
  }
</style>
