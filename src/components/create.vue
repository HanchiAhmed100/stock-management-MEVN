<template>
    <div class="uk-section uk-padding uk-section-muted uk-margin uk-margin-remove-top">
    <div class="uk-container uk-margin-large uk-padding-large">
    <div class="alert alert-danger col-12" v-if="error">{{ error }}</div>
   
    <div v-if="loading"  class="uk-position-center">
      <div class="loader"></div>
    </div>
    <div class="" v-if="loading == false" >
      <div class="uk-form-stacked uk-card uk-card-default">
        <div class="uk-form-stacked uk-margin uk-padding ">

        <div class="uk-margin">
            <label class="uk-form-label uk-margin" for="form-stacked-text  ">Nom : </label>
            <div class="uk-form-controls">
                <input class="uk-input uk-form-width-large uk-width-1-1" id="form-stacked-text" type="text"  v-model="Name"  placeholder="Nom de l'article ..." required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label uk-margin" for="form-stacked-text">Desciption : </label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea  uk-form-width-large uk-width-1-1 "  rows="7"  id="form-stacked-text" type="text"  v-model="Desc" placeholder="Desciption ..." required></textarea>
            </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label uk-margin uk-padding-small uk-padding-remove-left" for="form-stacked-text">Quantité : </label>
          <div class="uk-form-controls">
              <input class="uk-input uk-form-width-large uk-width-1-1" id="form-stacked-text" type="text"  v-model="Qte"  placeholder="Quantité ..." required>
          </div>
        </div>
        <div><br>
          <button v-on:click="createArticle" class="uk-button uk-button-primary">Sauvgarder <i class="fa fa-send-o uk-margin-left"></i></button>

        </div>
      </div>
      </div>
      <div class="uk-alert uk-alert-primary text-center" v-if="alert">{{ alert }}</div>
    </div>
  </div>
    </div>
</template>

<script>

import ArticleService from '../ArticleService';
export default {
  name: 'create',
  data(){
    return {
      articles : [],
      error:'',
      Name :'',
      Desc :'',
      Qte :'',
      loading : false,
      alert:''     
    }
  },
  methods :{
    async createArticle() {
      if(this.Name != '' && this.Desc != '' && this.Qte != ''){
        this.loading = true
        await ArticleService.createArticle(this.Name,this.Desc,this.Qte);
        this.Name =''
        this.Desc =''
        this.Qte =''
        this.loading = false
        this.alert = 'L\'article à été crée. '
      }
      else{
        this.alert = 'tous les champs sont obligatoire. '
      }
    }
  }

}
</script>

<style>

</style>
