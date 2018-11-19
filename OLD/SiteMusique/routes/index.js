const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const listArticles = require('../db/articles.json')
const users = require('../db/users.json')
const fs = require('fs')

const USERS_PATH = 'db/users.json'

router.get('/list', (req, res) => {
    res.json(listArticles)
})

/*
router.post('/list', (req, res) => {
    list.push({
        name: req.body.name
    });
    res.send('OK')
});*/

/* Article */

router.post('/add', (req, res) => {
    listArticles.push(req.body)
    console.log(listArticles)
    res.status(200).send('OK')
})

router.post('/edit', (req, res) => {
    listArticles[req.body.Index] = req.body
    res.status(200).send('OK')
})

router.post('/delete', (req, res) => {
    console.log('ok')
    listArticles.splice(req.body.Index, 1)
    for (let i = 0; i < listArticles.length; i++) {
        listArticles[i].Index = i
    }
    res.status(200).send('OK')
})

/* inscription */
router.post('/register', (req, res, next) => {
    var message = 'Votre inscription s\'est bien déroulée'
    for (userDb of users) {
        if (userDb.username === req.body.username) { /*  A modifier */
            message = 'Attention, l\'utilisateur existe déjà !'
        }
    }

    if (message === 'Votre inscription s\'est bien déroulée') {

        let hash = bcrypt.hashSync(req.body.password, 10)
        // Store hash in database
        const userObject = {username: req.body.username, password: hash}
        users.push(userObject)

        // Write into Json File
        fs.writeFile(USERS_PATH, JSON.stringify(users), function (err) {
            if (err) return console.log(err)

            console.log('W : User added to jsonfile')
        })

        //console.log(users);
        res.status(200).send(message)
    } else {
        res.status(201).send(message)
    }

})

/* recup le user */
router.get('/user', (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user) {
        res.json(req.session.user)
    }
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        res.status(200).send('Déconnexion')
    })
})

router.post('/login', (req, res, next) => {

    const inputUser = req.body
    let user = null
    let message = 'Identifiants incorrects'

    if (typeof inputUser.username !== 'string' || !inputUser.username) {
        //throw new Error("username n'est pas défini");
        message = 'Login non défini'
    }

    if (typeof inputUser.password !== 'string' || !inputUser.password) {
        //throw new Error("password n'est pas défini");
        message = 'Mot de passe non défini'
    }

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i]
        //console.log(currentUser);
        if (currentUser.username === inputUser.username) {
            if (bcrypt.compareSync(inputUser.password, currentUser.password)) {
                // Passwords match
                user = currentUser
                break
            } else {
                // Passwords don't match
                message = 'Mot de passe incorrect'
            }
        }
    }

    if (user != null) {
        //console.log("User not null");
        message = 'Connexion réussie'
        req.session.user = {username: user.username}
        res.status(200).send(message)
    }
    else {
        //console.log("ELSE");
        res.status(201).send(message)

    }
    //console.log('User : ' + user.username)
    //console.log('message: ' + message)

})

module.exports = router