const resoreNameMixin = {
  data () {
    return {
      restoreNameSearch: false
    }
  },
  methods: {
    goBack (restore) {
      if (!restore) {
        localStorage.removeItem('vue-nameParams')
      }
      this.$router.push({ name: 'product' })
    },  
    setRestore () {
      let nameParams = localStorage.getItem('vue-nameParams')
      this.restoreNameSearch = nameParams && nameParams !== 'null'
    }
  }
}

export default resoreNameMixin
