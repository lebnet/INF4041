const express = require('express')
const session = require('express-session')

const app = express()

app.get('/event/:id', (req, res) => {
	
})

app.use(session({
	secret: 'whocaresaboutastrongpassword?',
	resave: false,
       saveUninitialized: false
}))

const users = require('./routes/users')

app.use('/user', users)

app.listen(3000, function () {
  console.log('Application démarrée sur le port 3000!')
})

