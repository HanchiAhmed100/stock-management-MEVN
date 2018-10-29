<template>
  <div id="app">
    <nav class="uk-navbar-container uk-light" style="background:#222;color :#fff" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
            <li class="uk-active">
              <router-link to="/" class="uk-margin-right"><i class="fa fa-home fa-2x uk-padding-small"></i> Accueil</router-link>
            </li>
            <li class="uk-active">
              <router-link to="/article" class="uk-margin-right"><i class="fa fa-newspaper-o fa-2x uk-padding-small"></i>
              Liste des Articles</router-link>
            </li>
            <li class="uk-active">
              <router-link to="/create" class="uk-margin-right"><i class="fa fa-pencil fa-2x uk-padding-small"></i>Creation d'un article </router-link>
            </li>
            <li class="uk-active">
              <router-link to="/filtre" class="uk-margin-right"><i class="fa fa-sort-amount-asc fa-2x uk-padding-small"></i>Trie des article </router-link>
            </li>
            <li class="uk-active">
              <router-link to="/stat" class="uk-margin-right"><i class="fa fa-pie-chart fa-2x uk-padding-small"></i>Statistique </router-link>
            </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
         <ul class="uk-navbar-nav">
            <li class="uk-active">
              <b>App de Gestion du stock </b><i class="fa fa-database fa-2x uk-padding-small uk-margin-right"></i>
            </li>
          </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
.page{
  position: fixed;
  width: inherit;
}
.uk-link, a {
color: white
}


.loader{
  border : 15px solid #f3f3f3;
  border-radius: 50%;
  border-top: 15px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0%{ transform: rotate(0deg)}
  50%{ transform: rotate(140deg)}
  100%{ transform: rotate(360deg)}
}
::-webkit-scrollbar {
    width: 10px;
}
/* Track */
 ::-webkit-scrollbar-track {
    background: #f1f1f1;
}
/* Handle */
 ::-webkit-scrollbar-thumb {
    background: #31b0d5;
}
/* Handle on hover */
 ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
}
</style>
