<template>
<div class="uk-section uk-padding uk-margin">
  <div class="uk-container">
    <div class="uk-padding uk-margin uk-margin-left uk-position-center uk-width-1-2">
      <div class="uk-alert-danger" uk-alert v-if="error">{{ error }}</div>
    
      <div v-if="loading"  class="uk-position-center">
        <div class="loader"></div>
      </div>
    </div>
    <div class="uk-width-1-1 "  v-if="loading == false">
    <div>
      <form class="uk-search uk-search-large">
      <span uk-search-icon></span>
      <input class="uk-search-input " type="search" placeholder="Recherche ..." v-model="search"  v-on:input="filteredList">
      </form>
      <hr>
    </div>
    <div class="uk-child-width-3-4" uk-grid>
    <table class="uk-table uk-table-hover uk-table-divider uk-width-3-4">
    <thead>
      <tr>
        <th scope="col" class="articlelisttop">Nom de l'article</th>
        <th scope="col">Quantite</th>
        <th scope="col">Date d'ajout</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(article , index) in articles" v-bind:key="article.id" v-bind:index="index" v-bind:item="article" class="articlelist">
        <td scope="row">
          <router-link :to="'article/'+article.id" class="uk-text-capitalize" >
            {{ article.Name}}
          </router-link>  
        </td>
        <td>{{article.Qte}}</td>
        <td>{{ `${article.CreatedAt.getDate()}/${article.CreatedAt.getMonth()}/${article.CreatedAt.getFullYear()}`}}</td>
        <td>
          <button v-on:click="deleteArticle(article.id)" class="uk-button uk-button-default ">Supprimer  <i class="fa fa-trash uk-margin-left"></i></button>
          <button class="uk-button uk-button-default uk-margin-left"><router-link :to="'article/'+article.id">
            <i class="fa fa-cog  uk-margin-right"></i>
            Modifier
          </router-link>  </button> 
        </td>
      </tr>
    </tbody>
  </table>
      <div v-if="articlessearch" class="uk-width-1-4">
      <div v-if="show">
        <div class="uk-card uk-card-default uk-card-body uk-margin-bottom" v-for="a in articlessearch" v-bind:key="a.id">
            <h4>
              <router-link :to="'article/'+a.id" class="uk-text-capitalize" >
                {{ a.Name}}
              </router-link>  
            </h4>
            <p>
              Quantite : {{ a.Qte }}
            </p>
        </div>
      </div>
    </div>

</div>
</div>
</div>
</div>


</template>

<script>
import ArticleService from '../ArticleService';
export default {
  name: 'articles',
  data(){
    return {
      articles : [],
      articlessearch :[],
      show : false,
      error:'',
      Name :'',
      Desc :'',
      Qte :'',
      loading: false,
      search :''
    }
  },
  async created() {
    try{
      this.loading = true
      this.articles = await ArticleService.getArticle();
      this.loading = false
    }catch(err){
      this.error = err.message;
      this.loading = false
    }
  },
  methods :{
    async deleteArticle(id) {
      this.loading = true
      await ArticleService.deleteArticle(id);
      this.articles = await ArticleService.getArticle();
      this.loading = false
    },
    async filteredList() {
      this.loading = true
      this.show = true
      this.articlessearch = this.articles
      this.articlessearch = this.articles.filter(articles => {
      return articles.Name.toLowerCase().includes(this.search.toLowerCase())
      })
      this.loading = false
      if(this.search == '' || this.articlessearch == ''){
        this.show = false
        this.loading = true
        this.articlessearch = this.articles
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.articlelist{

  border-left: 5px rgba(33,150,243) solid;
}
.articlelisttop{
  border-left: 5px rgba(0,0,0) solid;
}
</style>
