Vue.prototype.$http = axios

const app = new Vue({
    el: '#app',
    data: {
        currentPage: 'index',
        currentArticleId: '',
        filter: '',
        menu: '',
        name: 'MyTubeNews',
        articlesList: '',
        mon_user: '',
        search: '',
        error: {message: ''},
        success: {message: ''}

    },
    created () {
        // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
        // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
        this.$http.get('/list')
            .then(list => {
                console.log('affichage de ma liste', list)
                this.articlesList = list.data
            })
            .catch(err => {
                console.log('error', err)
            })

        this.$http.get('/user')
            .then(user => {
                console.log('affichage de mon  user ', user)
                this.mon_user = user.data
            })
            .catch(err => {
                console.log('error', err)
            })
        this.success.message = ''
        this.error.message = ''

    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },

        // Articles
        viewArticle (indexArticle) {
            this.currentArticleId = indexArticle
            this.changePage('viewArticle')
        },
        editArticle (indexArticle) {
            this.currentArticleId = indexArticle
            this.changePage('editArticle')
        },
        createArticle (article) {
            if (article.Title == '') {
                alert('Veuillez indiquer le titre')
            }
            else {
                article['Index'] = this.articlesList.length
                this.$http.post('/add', article)
                    .then(() => {
                        this.articlesList.push(article)
                        this.changePage('listeDesArticles')
                        alert('Votre article a bien été créé')
                        document.location.reload(true)
                    })
            }
        },
        deleteArticle (article) {
            if (confirm('Êtes vous sûr de vouloir supprimer ce  article ?')) {
                this.$http.post('/delete', article)
                    .then(() => {
                        this.articlesList.splice(article.Index, 1)
                        for (let i = 0; i < this.articlesList.length; i++) {
                            this.articlesList[i].Index = i
                        }
                        alert('Votre article a bien été supprimé')
                        this.changePage('listeDesArticles')
                        document.location.reload(true)
                    })
            }

        },

        modifyArticle (article) {

            console.log(article)

            if (article.Title == '') {
                alert('Veuillez indiquer le titre')
            }
            else {
                //article['Index'] = this.articlesList.length
                this.$http.post('/edit', article)
                    .then(() => {
                        //this.articlesList.push(article)
                        //console.log(this.articlesList[article.Index])
                        this.articlesList[article.Index] = article
                        this.changePage('listeDesArticles')
                        alert('Votre article a bien été modifié')
                        document.location.reload(true)
                    })
            }
        },

        // User

        inscriptionuser (user) {
            if (user.password != '' && user.password === user.repeatpassword && user.username != '') {
                this.$http.post('/register', user)
                    .then((req) => {

                        //alert(req.data);
                        if (req.status === 200) {
                            alert(req.data)
                            this.success.message = req.data
                            this.changePage('listeDesArticles')
                        }
                        else {
                            this.error.message = req.data
                            this.changePage('inscription')
                        }
                    }).catch(error => {
                    console.log(error)

                })
            }
            else {
                this.error.message = 'Le mot de passe n\'est pas identique ou les champs sont vides !'
                //alert("Le mot de passe n'est pas identique ou les champs sont vides !")
            }
        },
        logout () {
            this.$http.get('/logout').then(() => {
                this.mon_user = ''
                this.changePage('index')
                alert('Vous êtes déconnecté')
            })
        },
        connexion (user) {
            if (user.password != '' && user.username != '') {
                this.$http.post('/login', user)
                    .then((response) => {
                        //alert(response.data);
                        this.success.message = ''
                        this.error.message = ''

                        if (response.status === 200) {
                            alert(response.data)
                            this.success.message = response.data
                            document.location.reload(true)

                            this.changePage('listeDesArticles')
                        } else {
                            this.error.message = response.data
                            this.changePage('connexion')
                        }
                    }).catch(err => {

                    console.log('Error' + error)
                })
            }
            else {
                this.error.message = 'Le ou les champs sont vides !'
                //alert("Le ou les champs sont vides !")
            }
        }
    },
    computed: {
        filteredList () {
            if (this.articlesList) {
                return this.articlesList.filter(article => {
                    return article.Title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            return this.articlesList
        }
    }
})

