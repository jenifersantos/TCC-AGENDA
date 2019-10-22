/* importar o modulo do framework express*/
var express = require('express');
/*importar o modulo do express-session*/
var session = require('express-session');
/* importar o modulo do consign*/
var consign = require('consign');
/* importar o modulo do body-parser*/
var bodyParser = require('body-parser');
/* importar o modulo do express-validator*/
var expressValidator = require('express-validator');
/* iniciar o objeto do express*/
var app = express();
/* setar as variaveis 'view engine' e 'view' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
/* configurar o session*/
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));
/* configurar o middleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));
/* configurar o middleware express-validator*/
app.use(expressValidator());
/* configurar o consign, para fazer o autoload das rotas, models e controllers para o app*/
consign()
	.include('app/routes')
	.then('config/dbConnection.js')//aqui precisa colocar o js pra que o consign entenda que é so esse modulo dentro do config
	.then('app/models')
	.then('app/controllers')
	.into(app);
/* exportar o objeto app*/
module.exports = app;