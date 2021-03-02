const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const FUNCOES = require('./../util/funcoes');
const config = require('./../../database/config');
const pokemonDB = require('./../../database/cadastros/db_pokemon');
const trocaDB = require('./../../database/cadastros/db_troca');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageTroca: (req, res) => {

        ( async function () {

            //Atribuindo o conteúdo central
            page = './includes/trade/inc_troca';

            //Consulta tabela para popular conteúdo da tabela
            var results = await pokemonDB.obterUsuarioPokemonTodosMenosEu( req.session.cod_login );
            var lsMeusPokemons = await pokemonDB.obterUsuarioPokemonTodos( req.session.cod_login );

            //Passa o conteúdo das variáveis para a página principal
            res.render('./pageAdmin', {
                DTPokemon: results,
                DTMeusPOkemons : lsMeusPokemons,
                status_Crud,
                cod_login: req.session.cod_login,
                nome_login: req.session.nome_login,
                foto_login: req.session.foto_login,
                usuario_login: req.session.usuario_login,
                perfil_login: req.session.perfil_login,
                page,
                //Cadastros
                Cadastro: '',
                CadastroOpen: '',
                CadUsuario: '',
                CadMaterial: '',
                CadPokemon: '',
                //Trade
                Trade:'active',
                TradeOpen: 'menu-open',
                CadTroca:'active'
            });

            //Reinicia a variável
            status_Crud = '';
        })();
    },
    efetivarTroca: (req, res) => {
        ( async function () {

            //Atribuindo o conteúdo central
            page = './includes/trade/inc_troca_efetivacao';

            //Consulta tabela para popular conteúdo da tabela
            //var results = await pokemonDB.obterUsuarioPokemonTodosMenosEu( req.session.cod_login );

            var results = await pokemonDB.obterUsuarioPokemonTodos( 1 );
            var lsMeusPokemons = await pokemonDB.obterUsuarioPokemonTodos( req.session.cod_login );

            //Passa o conteúdo das variáveis para a página principal
            res.render('./pageAdmin', {
                DTPokemon: results,
                DTMeusPOkemons : lsMeusPokemons,
                status_Crud,
                cod_login: req.session.cod_login,
                nome_login: req.session.nome_login,
                foto_login: req.session.foto_login,
                usuario_login: req.session.usuario_login,
                perfil_login: req.session.perfil_login,
                page,
                //Cadastros
                Cadastro: '',
                CadastroOpen: '',
                CadUsuario: '',
                CadMaterial: '',
                CadPokemon: '',
                //Trade
                Trade:'active',
                TradeOpen: 'menu-open',
                CadTroca:'active'
            });

            //Reinicia a variável
            status_Crud = '';
        })();
    },
    pageTrocas: (req, res) => {
        ( async function () {

            //Atribuindo o conteúdo central
            page = './includes/trade/inc_troca_historico';

            //Consulta tabela para popular conteúdo da tabela
            var results = await trocaDB.obterPorUsuario( req.session.cod_login );

            //Passa o conteúdo das variáveis para a página principal
            res.render('./pageAdmin', {
                DTTroca: results,
                status_Crud,
                cod_login: req.session.cod_login,
                nome_login: req.session.nome_login,
                foto_login: req.session.foto_login,
                usuario_login: req.session.usuario_login,
                perfil_login: req.session.perfil_login,
                page,
                //Cadastros
                Cadastro: '',
                CadastroOpen: '',
                CadUsuario: '',
                CadMaterial: '',
                CadPokemon: '',
                //Trade
                Trade:'active',
                TradeOpen: 'menu-open',
                CadTroca:'active'
            });

            //Reinicia a variável
            status_Crud = '';
        })();
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};