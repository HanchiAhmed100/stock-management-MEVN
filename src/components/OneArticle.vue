<template>
    <div class="uk-section uk-padding uk-margin uk-section-muted">
    <div class="uk-container">
    <div class="alert alert-danger col-12" v-if="error">{{ error }}</div>
   
    <div v-if="loading"  class="uk-position-center">
      <div class="loader"></div>
    </div>  
    <div class="uk-card uk-card-default" >   
    <div class="uk-card-header" v-for="(article , index) in articles"
        v-bind:item="article"
        v-bind:index="index"
        v-bind:key="article.id" v-if="loading == false">
          
          <div class=""  v-if="showmenu == false">
            <router-link :to="'/article'" class="pull-right"><button class="uk-button uk-button-text uk-margin uk-padding-bottom uk-padding-top"><i class="fa fa-arrow-left uk-margin-right"></i>Retour</button></router-link>
           <div class="">
                <h3 class="uk-card-title uk-margin-remove-bottom uk-text-capitalize">{{article.Name}}</h3>
                 <p class="uk-text-meta uk-margin-remove-top">Date d'ajout : <time date="">{{ `${article.CreatedAt.getDate()}/${article.CreatedAt.getMonth()}/${article.CreatedAt.getFullYear()}`}}</time></p>
                 <hr>
            </div>
              <div class="uk-card-body">
              <p><b>Description :</b> {{article.Desc}}<br><b>Quantité disponible : </b>{{article.Qte}}</p>
            </div>  
            <div class="uk-card-footer">
              <button v-on:click="show()" class="uk-button uk-button-primary">Modifer <i class="fa fa-pencil-square-o uk-margin-left"></i></button>
              <button v-on:click="deleteArticle" class="uk-button uk-button-secondary uk-margin-left" ><i class="fa fa-trash-o uk-margin-right"></i>Supprimer</button> 
            </div>     
          </div>

        
        <div v-if="showmenu">
        <div class="uk-form-stacked ">
        <button class="uk-button uk-button-text uk-margin" v-on:click="hide"><i class="fa fa-times uk-margin-right"></i> Annuler</button>
        <div clZass="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Nom : </label>
            <div class="uk-form-controls">
                <input class="uk-input uk-form-width-large uk-width-1-1" id="form-stacked-text" type="text"  v-model="Name"  placeholder="Nom de l'article ..." required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Desciption : </label>
            <div class="uk-form-controls">
                <textarea class="uk-input uk-form-width-large uk-width-1-1" id="form-stacked-text" type="text" rows="7" v-model="Desc"  placeholder="Desciption ..." required></textarea>
            </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text">Quantité : </label>
          <div class="uk-form-controls">
              <input class="uk-input uk-form-width-large uk-width-1-1" id="form-stacked-text" type="text"  v-model="Qte"  placeholder="Quantité ..." required>
          </div>
        </div>
        <div><br>
          <button v-on:click="updateArticle" class="uk-button uk-button-primary">Sauvgarder<i class="fa fa-send-o uk-margin-left"></i></button>
        </div>
      </div>

       </div>
      </div>

      </div>
      <div class="uk-alert uk-alert-primary text-center" v-if="alert">{{ alert }}</div>
    </div>
    </div>
</template>

<script>
import ArticleService from '../ArticleService';
export default {
  name: 'OneArticle',
  data(){
    return {
      articles : [],
      error:'',
      Name :'',
      Desc :'',
      Qte :'',
      id : this.$route.params.id,
      showmenu : false,
      loading: false,
      alert :''

    }
  },
  async created() {
    try{
      this.loading = true
      this.articles = await ArticleService.getOneArticle(this.id);
      this.Name = this.articles.Name
      this.Desc = this.articles.Desc
      this.Qte = this.articles.Qte      
      this.loading = false
    }catch(err){
      this.error = err.message;
      this.loading = false
    }

  },methods:{
      async updateArticle() {
        this.loading = true
        await ArticleService.updateArticle(this.id,this.Name,this.Desc,this.Qte);
        this.articles = await ArticleService.getOneArticle(this.id);
        this.Name =''
        this.Desc =''
        this.Qte =''
        this.showmenu = false
        this.alert = 'Mise a jour effectuer'
        this.loading = false
    },
    show : function() {
      this.loading = true
      this.showmenu = true
      this.loading = false
    },
    hide : function(){
      this.loading = true
      this.showmenu = false
      this.loading = false
    },
    async deleteArticle(id) {
      this.loading = true
      await ArticleService.deleteArticle(id);
      this.articles = await ArticleService.getOneArticle(this.id);
      this.loading = false
    },
   
  }
}
</script>

<style>
</style>
