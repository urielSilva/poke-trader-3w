const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const FUNCOES = require('./../util/funcoes');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pagePokemon: (req, res) => {


        ( async function () {

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_pokemon';

            //Consulta tabela para popular conteúdo da tabela
            let query = "SELECT * FROM `tb_usuario_pokemon` ORDER BY id_pokemon, id_usuario DESC";

            db.query(query, (err, results, fields) => {

                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    DTPokemon: results,
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    usuario_login: req.session.usuario_login,
                    perfil_login: req.session.perfil_login,
                    page,
                    //Cadastros
                    Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: '',
                    CadMaterial: '',
                    CadPokemon: 'active',
                    //Trade
                    Trade:'',
                    TradeOpen: '',
                    CadTroca:''
                });

                //Reinicia a variável
                status_Crud = '';
            });
        })();
    },


    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};