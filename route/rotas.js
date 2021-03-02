module.exports = (io) => { //Aqui recebo o socket.io lá do app.js

    //Instanciando o Router do express
    var express = require('express');
    var rotas = express.Router();

    //Trecho que verifica se a seção está ativa
    rotas.use(function(req, res, next){
        //Se a rota for diferente da página inicial e nome_login da seção redis estiver vazio
        if (['/'].indexOf(req.url) === -1 && req.session.nome_login == undefined) {
            //Redireciona para a página de login
            res.redirect('/')
        } else {//senão
            //Passa para as próximas rotas abaixo 
            next();
        }        
    });

    //================================================================== Setando as rotas da aplicação
    //Rotas para a página de "Login"
    const { pageLogin, verificaLogin, pageAdmin } = require('../dao/login.js');
    rotas.get('/', pageLogin); 
    rotas.post('/', verificaLogin); 
    rotas.get('/admin', pageAdmin); 

    //================================================================== CADASTROS
    //Rotas para a página de "Cadastro de Usuário"
    const { pageUsuario, addUsuario, editUsuario, delUsuario } = require('../dao/cadastros/usuario.js');
    rotas.get('/usuario', pageUsuario); 
    rotas.post('/addUsuario', addUsuario); 
    rotas.post('/editUsuario/:id', editUsuario); 
    rotas.get('/delUsuario/:id', delUsuario); 

    //Rotas para a página de "Cadastro de Material"
    const { pageMaterial, addMaterial, editMaterial, delMaterial } = require('../dao/cadastros/material.js');
    rotas.get('/material', pageMaterial); 
    rotas.post('/addMaterial', addMaterial); 
    rotas.post('/editMaterial/:id', editMaterial);
    rotas.get('/delMaterial/:id', delMaterial); 

    //Rotas para a página de "Cadastro de Pokemons"
    const { pagePokemon,addPokemon } = require('../dao/cadastros/pokemon.js');
    rotas.get('/pokemon', pagePokemon); 
    rotas.post('/addPokemon', addPokemon); 

    //================================================================== TRADE
    //Rotas para a página de "Funcionalidade Troca"
    const { pageTroca, efetivarTroca, pageTrocas } = require('../dao/trade/troca.js');
    rotas.get('/troca', pageTroca); 
    rotas.post('/efetivarTroca', efetivarTroca); 
    rotas.get('/trocas', pageTrocas); 

    //Exportando este módulo
    return rotas;
};