const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const FUNCOES = require('./../util/funcoes');
const pokemonDB = require('./../../database/cadastros/db_pokemon');
const api_pokemnon = require( './../../services/pokemon/api_pokemon' );


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
            var results = await pokemonDB.obterUsuarioPokemonTodos( req.session.cod_login );

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
        })();
    },
    addPokemon: (req, res) => {
        (async () => {
            //Verifica se selecionou uma imagem
            if (!req.files) {
                //Se não selecionou, executa INSERT com imagem genérica
//                let nome = req.body.nome_ADD.trim();
//                let desecricao = req.body.descricao_ADD.trim();
//                let quantidade = req.body.quantidade_ADD.trim();


              //  const lista = await api_pokemnon.retornarLista();   
    
               // console.log( lista );


            //    const apenasum = await api_pokemnon.retornarUm( 'bulbasaur' );   
    
             //   console.log( apenasum );

                //Atribuindo o conteúdo central
                page = './includes/cadastros/inc_pokemon';

                //Verifica se o registro adicionado já existe


                
            }
        })();//async
    },
    searchPokemon: (req, res) => {
        (async () => {
            //Verifica se selecionou uma imagem
                //Se não selecionou, executa INSERT com imagem genérica
                let id_pokemon = req.params.id;

                //Atribuindo o conteúdo central
                page = './includes/cadastros/inc_pokemon';

    
                try {
                    const result = await api_pokemnon.retornarUm( id_pokemon );   
                  
                    console.log( result.id);
                    console.log( result.name );
                    console.log( result.base_experience );
                    console.log( result.sprites.front_default  ) ;

                    req.session.nome_BUSCA = result.id;
 //                   req.session.nome_login = nome;
  //                  req.session.foto_login = image_name;
  //                  req.session.usuario_login = usuario;
  //                  req.session.perfil_login = perfil;


                    
                } catch (error) {
                    console.log('Erro 003: ', error);
                    status_Crud = 'nao';
                    res.redirect('/pokemon');
                }



                //Verifica se o registro adicionado já existe
        
        })();//async
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};