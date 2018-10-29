<template>
    <div class="uk-section uk-padding uk-margin uk-section-muted uk-margin-remove-top">
        <div class="uk-container">
            <div class="uk-padding uk-margin uk-margin-left uk-position-center uk-width-1-2">
                <div class="uk-alert-danger" uk-alert v-if="error">{{ error }}</div>
                
                <div v-if="loading"  class="uk-position-center">
                    <div class="loader"></div>
                </div>
            </div>
            <div class="uk-width-1-1 "  v-if="loading == false">
                <div> 
                    <ul class="uk-subnav uk-subnav-pill">
                        <li> <a>Trie par date :</a>  </li>
                        <li ><a v-on:click="getArticleSortedAsc" class="uk-button uk-button-link">Ascendant  </a></li>
                        <li><a> - </a></li>
                        <li><a v-on:click="getArticleSortedDesc" class="uk-button uk-button-link">Descendant</a></li>
                        <li> | </li>
                        <li> <a>Trie par Qunatite :</a>  </li>
                        <li><a v-on:click="sortTabByQteAsc" class="uk-button uk-button-link">Ascendant  </a></li>
                        <li><a v-on:click="sortTabByQteDesc" class="uk-button uk-button-link">Descendant</a></li>
                        <li> | </li>
                        <li><a v-on:click="sortItem">Autre</a></li>
                    </ul>
                <div class="uk-alert-primary uk-margin uk-padding uk-text-center" uk-alert>{{ message }}</div>

                    <ul class=" uk-child-width-1-2 uk-child-width-1-3@m uk-text-center" uk-grid v-if="show == false">
                        
                        <div v-for="article in articles " v-bind:key="article.id">
                            <li>
                                <div class="uk-card uk-card-default uk-card-body uk-margin-small">
                                    <b class="uk-text-capitalize">{{ article.Name}}</b><br>
                                        <span v-if="article.Qte < 10">
                                            <p style="color : red">Qunatité : {{ article.Qte }}</p>
                                        </span>
                                        <span v-if="article.Qte > 10">
                                            <p>Qunatité : {{ article.Qte }}</p>
                                        </span>
                                    <br>
                                    {{ `${article.CreatedAt.getFullYear()}-${article.CreatedAt.getMonth()}-${article.CreatedAt.getDate()}`}}
                                    <br>
                                    <router-link :to="'article/'+article.id" class="uk-button uk-button-text" >
                                        Consulter
                                    </router-link>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="uk-child-width-1-2 uk-child-width-1-3@m uk-text-centre" uk-grid uk-sortable="handle: .uk-card"  v-if="show" >
                        <div v-for="article in articles " v-bind:key="article.id">
                            <div >
                                 <div class="uk-card uk-card-default uk-card-body uk-margin-small">
                                    <b class="uk-text-capitalize">{{ article.Name}}</b><br>
                                    Qunatité : {{ article.Qte }}
                                    <br>{{ `${article.CreatedAt.getFullYear()}-${article.CreatedAt.getMonth()}-${article.CreatedAt.getDate()}`}}
                                    <br>
                                    
                                    <router-link :to="'article/'+article.id" class="uk-button uk-button-text" >
                                        Consulter  
                                    </router-link>
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
    name: 'filtre',
    data(){
        return {
            articles : [],
            articlesort :[],
            show : false,
            error:'',
            Name :'',
            Desc :'',
            Qte :'',
            loading: false,
            message:'',
            show: false

        }
    },
    async created() {
        try{
            this.loading = true
            this.articles = await ArticleService.getArticleSortedAsc();
            this.articlesort = this.articles
            this.message = 'Tire par Date : ordre Ascendant'
            this.loading = false
        }catch(err){
            this.error = err.message;
            this.loading = false
        }
    },methods: {
        async getArticleSortedDesc  () {
            this.loading = true
            this.show = false
            this.articles = await ArticleService.getArticleSortedDesc();
            this.message = 'Tire par Date : ordre Descendant'
            this.loading = false
        },
        async getArticleSortedAsc  () {
            this.loading = true
            this.show = false            
            this.articles = this.articlesort;
            this.message = 'Tire par Date : ordre Ascendant'
            this.loading = false
        },
        sortTabByQteAsc : function (){
            this.message = 'Tire par Quantité : ordre Ascendant'
            this.show = false            
            return this.articles.sort((a, b) => a.Qte - b.Qte );
        },
        sortTabByQteDesc : function (){
            this.message = 'Tire par Quantité : ordre Descendant'
            this.show = false            
            return this.articles.sort((a, b) => b.Qte - a.Qte );
        },
        sortItem : function (){
            this.message = 'Defini votre propre trie'
            this.show = true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
