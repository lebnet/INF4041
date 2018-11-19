/* globals Vue */
;(function () {
	'use strict'

	Vue.component('index', {
		props: ['mon_user'],
		template: `
    <div>
	    <h1 >Bienvenue sur Mytube News !</h1>
		<p></p>
		
	</div>
    `
	})

	Vue.component('navigation-bar', {
		props: ['mon_user'],
		template: `
    <nav class="navbar">
        <div class="page-header">
            <ul class="nav nav-pills pull-right ">
                <li v-if ="mon_user!=''" > <a @click="$emit('change-page', 'index')">Accueil </a></li>
                <li v-if ="mon_user!=''" > <a @click="$emit('change-page', 'categories')">Categories </a></li>
                <li> <a @click="$emit('change-page', 'listeDesArticles')">Liste des articles </a></li>
                <li> <a @click="$emit('change-page', 'inscription')">Inscription </a></li>

                <li>
                    <i v-if= "mon_user ===''"@click="$emit('change-page', 'connexion')" class="btn btn-info button_deco" > Connexion </i>
                </li>

                <li v-if ="mon_user!=''" class="user-icon">
                       <span class="glyphicon glyphicon-user"> {{ mon_user.username }}</span >
                </li>
                <li v-if ="mon_user!=''">
                	<i  @click="$emit('logout')" class="btn btn-info button_deco">Se déconnecter</i>
				</li>
            </ul>
            <h3 class="modal-title titre_site"> <a class="titre_site" @click="$emit('change-page', 'index')"><i class="glyphicon glyphicon-article"></i> Mytube News</a>
            </h3>
        </div>
    </nav>
    `
	})

	Vue.component('inscription-form', {

		template: `

    <div class="panel panel-default">
        
        <div class="panel-heading">
            <h1 class="modal-title">Inscription </h1>
        </div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label>Login</label>
                        <input type="text" class="form-control mesinputs"  v-model="user.username" placeholder="Login">
                    </div>
                </div>
    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mot de passe</label>
                        <input type="password" class="form-control"  v-model="user.password" placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                        <label>Repéter le mot de passe</label>
                        <input type="password" class="form-control" v-model="user.repeatpassword"  placeholder="Mot de passe">
                    </div>
                </div>
            </form>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <a @click="$emit('inscriptionuser', user)" class="btn btn-primary" role="button">S'inscrire </a>
                </div>
            </div>
        </div>
    </div>
 
    `,
		data: function () {
			return {
				user: {
					'username': '',
					'password': '',
					'repeatpassword': ''
				}
			}
		},
	})

	Vue.component('connexion-form', {
			template: `
    <div class="panel panel-default">
	    <div class="panel-heading">
			<h1 class="modal-title">Connexion </h1>
		</div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="inputAddress">Login</label>
                        <input v-model ="user.username" type="text" class="form-control mesinputs" id="inputAddress" placeholder="Login">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputmdp">Mot de passe</label>
                        <input v-model ="user.password" type="password" class="form-control mesinputs" id="inputmdp" placeholder="Mot de passe">
                    </div>
                </div>

            </form>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <button @click="$emit('connexion', user)" class="btn btn-primary">Connexion</button>
                </div>
            </div>
        </div>
	</div>
    
    `,
			data: function () {
				return {
					user: {
						'username': '',
						'password': ''
					}
					//username : this.username,
					//password: ''
				}
			},

		}
	)

	Vue.component('article-item', {

		props: ['articleitem', 'mon_user'],
		template: `

    <div class="col-lg-4">
        <div class="">
            <img :src= "articleitem.Poster" alt="...">
            <div class="caption">
                <h3>{{ articleitem.Title }}</h3>
                <p>{{ articleitem.Description }}</p>
                <i>{{ articleitem.Date }} </i>
                <p>
                    <a @click="$emit('event-article', 'viewArticle','articleitem.Index')" class="btn btn-primary" role="button">Voir </a> 
                    <a v-if ="mon_user!=''" @click="$emit('edit-article', 'editArticle','articleitem.Index')" class="btn btn-default" role="button">Modifier </a>
                    <a v-if ="mon_user!=''" @click="$emit('delete-article', 'deleteArticle','articleitem.Index')" class="btn btn-danger" role="button">Supprimer </a>
                </p>
            </div>
        </div>
    </div>
    `

	})

	Vue.component('article-view', {

		props: ['articleitem', 'mon_user'],
		template: `
  
      <div class="col-lg-12">
          <div class="thumbnail">
          <h1 align="center">{{ articleitem.Title }}</h1>
          <h4 align="center" >{{ articleitem.Date }} </h4>
              <img :src= "articleitem.Poster" alt="...">
              <div class="caption">
                  <p><b>Description : </b>{{ articleitem.Description }}</p>
                  <p><b>Le : </b>{{ articleitem.Date }}</p>
                  <p class="normal-description"><b>Contenu : </b>{{ articleitem.Contenu }}</p>
                  <p><b>Note : </b>{{ articleitem.imdbNote }}/10</p>
                  <p>
                      <a v-if ="mon_user!=''" @click="$emit('change-page', 'editArticle')" class="btn btn-primary" role="button">Editer </a>   
                      <a v-if ="mon_user!=''" @click="$emit('delete-article', 'deleteArticle','articleitem.Index')" class="btn btn-danger" role="button">Supprimer </a>                         
                  </p>
              </div>
          </div>
          <a @click="$emit('change-page', 'listeDesArticles')" class="btn btn-default" role="button">Retour à la liste</a>
      </div>
      `

	})
	Vue.component('article-edit', {

		props: ['articleitem'],
		template: `
  
      <div><div class="col-lg-6">
          <div class="thumbnail">
           <h1>Titre : <input v-model="articlevisu.Title"> </h1>
           <h2>Image (web) : <input v-model="articlevisu.Poster"> </h2>
           <h4 align="center" > Date : <input type="text" v-model="articlevisu.Date"></h4>
           <h4>Description :</h4>
           <textarea v-model="articlevisu.Description" cols="30" rows="5" > </textarea>
            <p><b>Le : </b> <input type="text" v-model="articlevisu.Date"></p>
            <h4>Contenu :</h4>
           <textarea v-model="articlevisu.Contenu" cols="30" rows="5" > </textarea>
            <p><b>Note : </b><input type="number" v-model="articlevisu.imdbNote"></p>
         </div>
     </div>
          
          <div class="col-lg-6">
          <div class="thumbnail">
          <h1 align="center">{{ articlevisu.Title }}</h1>
          <h4 align="center" >{{ articlevisu.Date }} </h4>
              <img :src= "articlevisu.Poster" alt="...">
              <div class="caption">
                  <p><b>Description : </b>{{ articlevisu.Description }}</p>
                  <p><b>Le : </b>{{ articlevisu.Date }}</p>
                  <p class="normal-description"><b>Contenu : </b>{{ articlevisu.Contenu }}</p>
                  <p><b>Note : </b>{{ articlevisu.imdbNote }}/10</p>
              </div>
          </div>
          <a @click="$emit('modify-article', articlevisu)" class="btn btn-primary" role="button">Edit</a>
          <a @click="$emit('change-page', 'listeDesArticles')" class="btn btn-default" role="button">Annuler</a>
      </div>
      </div>
      `,
		data: function () {
			return {
				articlevisu: Vue.util.extend({}, this.articleitem)
			}
		}
	})
	Vue.component('article-add', {
		template: `
      <div>
      <div class="col-lg-6">
          <div class="thumbnail">
           <h1>Titre : <input v-model="articleitem.Title"> </h1>
           <h2>Image (web) : <input v-model="articleitem.Poster"> </h2>
           <h4 align="center" > Date : <input type="number" v-model="articleitem.Date"></h4>
           <h4>Description :</h4>
           <textarea v-model="articleitem.Description" cols="30" rows="5" > </textarea>
            <p><b>Le : </b> <input type="text" v-model="articleitem.Date"></p>
           <h4>Contenu :</h4>
           <textarea v-model="articlevisu.Contenu" cols="30" rows="5" > </textarea>
            <p><b>Note : </b><input type="number" v-model="articleitem.imdbNote"></p>
         </div>
     </div>
          
          <div class="col-lg-6">
          <div class="thumbnail">
          <h1 align="center">{{ articleitem.Title }}</h1>
          <h4 align="center" >{{ articleitem.Date }} </h4>
              <img :src= "articleitem.Poster" alt="...">
              <div class="caption">
                  <p><b>Description : </b>{{ articleitem.Description }}</p>
                  <p><b>Le : </b>{{ articleitem.Date }}</p>
                  <p class="normal-description"><b>Contenu : </b>{{ articleitem.Contenu }}</p>
                  <p><b>Note : </b>{{ articleitem.imdbNote }}/10</p>
              </div>
          </div>
          <a @click="$emit('change-page', 'listeDesArticles')" class="btn btn-default" role="button">Annuler</a>
          <a @click="$emit('create-article', articleitem)" class="btn btn-primary" role="button">Ajouter</a>
      </div>
      </div>
      `,
		data: function () {
			return {
				articleitem: {
					'Title': '',
					'Poster': 'http://nulldefinition.com/wp-content/uploads/2016/09/null_logo-300x300.png',
					'Description': '',
					'Date': '',
          'Contenu' : '',
					'Note': 0,
				}
			}
		}

	})

	Vue.component('footer-item', {
		template: `
     <div class="text-center">
        <a @click="$emit('change-page', 'index')"  class="btn btn-default" >Page d'accueil</a>
     </div>
    `
	})

	Vue.component('ajouter-article-form', {
		props: ['mon_user'],
		template: `
    <div class="col-lg-12" align="right">
		  <p v-if ="mon_user!=''"><a @click="$emit('change-page', 'addArticle')"  class="btn btn-info" >Ajouter un article</a></p>
    </div>
    `

	})

})()