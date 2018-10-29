<template>
<div class="uk-section uk-padding uk-margin uk-section-muted  uk-margin-remove-top">
  <div class="">
    <div class="uk-padding uk-margin uk-margin-left uk-position-center uk-width-1-2">
      <div class="uk-alert-danger" uk-alert v-if="error">{{ error }}</div>
    
      <div v-if="loading"  class="uk-position-center">
        <div class="loader"></div>
      </div>
    </div>
    <div class="small"  v-if="loading == false">
        <div class="">
            <line-chart :chart-data="datacollection"></line-chart>
        </div>
    </div>
  </div>
</div>
</template>

<script>
  import LineChart from '../assets/LineChart.js'
  import ArticleService from '../ArticleService'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        articles : [],
        colors: [
            "red",
            "blue",
            "green",
        ],
        loading : false
      }
      
    },
    async created() {
        try{
        this.loading = true
        //console.log(this.articles)
        this.loading = false
        }catch(err){
        this.error = err.message;
        this.loading = false
        }
    },
    async mounted () {
        this.loading = true
        this.articles = await ArticleService.getArticle();

      this.fillData()
      let object = {
              label: 'Data One',
              backgroundColor: [],
              data: []
      }
       for (let index = 0; index < this.articles.length; index++) {
        this.datacollection.labels.push(this.articles[index].Name)
        object.data.push(this.articles[index].Qte)
        object.backgroundColor.push(this.getRandomColor())

      }
      this.datacollection.datasets.push(object)
        this.loading = false

       // console.log(this.datacollection)
    },
    methods: {
      fillData () {
        this.datacollection = {
         labels: [],
         datasets: [],
         backgroundColors: []
        }
      },
      getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    }
  }
</script>

<style>
  .small {
    max-width: 800px;
    margin:  10px auto;
  }
</style>