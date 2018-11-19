const express =  require('express');
const cookeParser =  require('cookie-parser');
const bodyParser =  require('body-parser') ;
const hbs = require('express-hbs');
const expressValidator =  require('express-validator') ;
const session =  require('express-session') ;

const app = express();
const PORT = 3000;

var express = require('express');
var session = require('express-session');
var app = express();

app.get('/', function(req, res){
   res.send('hello');
});

app.listen(PORT, function(){
  console.log('Server is running on',PORT);
});

app.use(express.static('public'));
app.engine('hbs', hbs.express4({
   partialsDir: __dirname + '/views/partials'
 }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookeParser());

app.use(session({ secret: 'krunal', resave: false, saveUninitialized: true, }));

app.use(expressValidator());

const user = require('./routes/user.route');

app.use('/user',user);
