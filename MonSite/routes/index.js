var express = require('express')
var router = express.Router()

const list = [{
  name: 'elem1'
}, {
  name: 'elem2'
}]

router.get('/list', (req, res) => {
  res.json(list)
})

router.post('/list', (req, res) => {
  list.push({
    name: req.body.name
  })
  res.send('OK')
})

router.post('/connect', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username === 'louis' && password === 'secret') {
    // l'utilisateur est connecté
  } else {
    res.status(400).send('Bouuuh mauvais mdp')
  }
})

module.exports = router
