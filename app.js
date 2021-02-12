const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql2');
const path = require('path');
const redis = require('redis');
const session = require('express-session');

//================================================================== Configurações

var app = express();

//Inicializa o socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Diretório onde estão as views ejs (páginas frontend)
app.set("views", path.join(__dirname, "view"));

//Seta como engine arquivos no formato "ejs"
app.set("view engine", "ejs");

//Criando a sessão redis
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        host: 'localhost',
        port: 6379,
        secret: 'argenton123*',
        resave: true,
        saveUninitialized: true
    })
);

//Globais
app.locals.moment = require('moment');

//Diretório que possui os arquivos públicos como imagens, etc...
app.use(express.static(path.join(__dirname, "public")));

//Utilizado para upload de arquivos
app.use(fileUpload());

//================================================================== Conexão ao Banco de dados

var config = require('./database/config');
const connection = mysql.createConnection(config);

//Validamos se conectou no BD
connection.connect(function (error) {
    if (!!error)
        console.log('Erro ao conectar no BD:', error);
    else
        console.log('Desenvolvido por : efrancabr@gmail.com');
        console.log('Servidor host    :', connection.config.host);
        console.log('Banco de dados   :', connection.config.database);
        console.log('----------------------------------------------');
});

// A variável "db" global recebe a conexão
global.db = connection;

//================================================================== Servidor http
var port = 3001;

/**
 * Ao acessar o sistema vai entrar no routes/rotas e 
 * passar como "get" o "/login" (ver no "route/rotas.js")
 * Onde tem os GET e POST e direcionamento das páginas passando também o io (socket) */

const rotas = require('./route/rotas')(io);
app.use('/', rotas);

/* Inicia a o servidor Node.JS */
server.listen(port, () => {
    console.log('----------------------------------------------');
    console.log('Endereço do site : localhost:', port);
});

//================================================================== Fim