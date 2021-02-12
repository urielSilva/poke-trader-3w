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
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redisClient = require("redis").createClient(rtg.port, rtg.hostname);

    redisClient.auth(rtg.auth.split(":")[1]);
    let RedisStore = require('connect-redis')(session);

    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            host: rtg.hostname,
            port: rtg.port,
            secret: 'efs',
            resave: true,
            saveUninitialized: true
        })
    );

} else {
    let RedisStore = require('connect-redis')(session);
    let redisClient = redis.createClient();

    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            host: 'ec2-34-236-26-16.compute-1.amazonaws.com',
            port: 14109,
            secret: 'p8359f4458637802e804905bee88a4ceb3237dd393e7255487e7b9b512baf3f3c',
            resave: true,
            saveUninitialized: true
        })
    );
}

//Globais
app.locals.moment = require('moment');

//Diretório que possui os arquivos públicos como imagens, etc...
app.use(express.static(path.join(__dirname, "public")));

//Utilizado para upload de arquivos
app.use(fileUpload());

//================================================================== Conexão ao Banco de dados

var config = require('./database/config');
//const connection = mysql.createConnection(config);


var pool  = mysql.createPool({
  connectionLimit : 10,
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});


const connection = pool.getConnection(function(error, connection) {
    if (error)
        console.log('Connection error: ', error);
    else
        console.log('Desenvolvido por : efrancabr@gmail.com');
        console.log('Servidor host    :', connection.config.host);
        console.log('Banco de dados   :', connection.config.database);
        console.log('----------------------------------------------');

//    connection.release();
});

//Validamos se conectou no BD
//connection.connect(function (error) {
//    if (!!error)
//        console.log('Erro ao conectar no BD:', error);
//    else
//        console.log('Desenvolvido por : efrancabr@gmail.com');
//        console.log('Servidor host    :', connection.config.host);
//        console.log('Banco de dados   :', connection.config.database);
//        console.log('----------------------------------------------');
//});

// A variável "db" global recebe a conexão
global.db = connection;

//================================================================== Servidor http
var port = process.env.PORT || 8000;
var serverName = process.env.HOST;

/**
 * Ao acessar o sistema vai entrar no routes/rotas e 
 * passar como "get" o "/login" (ver no "route/rotas.js")
 * Onde tem os GET e POST e direcionamento das páginas passando também o io (socket) */

const rotas = require('./route/rotas')(io);
app.use('/', rotas);

/* Inicia a o servidor Node.JS */
server.listen( port, () => {
    console.log('----------------------------------------------');
    console.log('Endereço do site : '+serverName , port);
});

//================================================================== Fim