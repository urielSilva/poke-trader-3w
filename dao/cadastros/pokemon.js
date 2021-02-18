const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const FUNCOES = require('./../util/funcoes');
const pokemonDB = require('./../../database/cadastros/db_pokemon');
const downloadIMG = require( './../../services/pokemon/download_images' );

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
                OPokemon : '',
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
            
            //Se não selecionou, executa INSERT com imagem genérica
            let id_usuario = req.session.cod_login;
            let id_pokemon = req.body.id_pokemon_BUSCA.trim();
            let nome = req.body.nome_BUSCA.trim();
            let descricao = req.body.descricao_BUSCA.trim();
            let experiencia_base = req.body.experiencia_base_BUSCA.trim();
            let url_foto = req.body.urlFoto_BUSCA ;

            var quantidade = 1;
            var cadNovo = false;

            //Definindo nome da imagem conforme arquivo selecionado

            let image_name = 'img_pokemon_' + nome.replace(/ /g, "_") + '.PNG';

            console.log(  image_name );

            obUsuarioPokemon = { "id_usuario" : id_usuario, "id_pokemon":id_pokemon, "foto" : image_name, "nome":nome,  "descricao" : descricao, "experiencia_base" : experiencia_base };

            //-- Verificar se o pokemon já existe na base local
            const cadPokemonBusca = await pokemonDB.obter( id_pokemon ); 
            if(cadPokemonBusca.length <= 0){

                //-- Download da foto do bicho
                let dowImg = await downloadIMG.download_image(url_foto, 'public/dist/img/pokemons/'+image_name);

                console.log( dowImg ); 

                //-- Cadastrar pokemon 
                const cadPokemonInc = await pokemonDB.incluir( obUsuarioPokemon  ); 
                //-- Já atribui o Pokemon para o usuário 
                const cadUsPokemoInc = await pokemonDB.incluirUsuarioPokemon(  id_usuario, id_pokemon, quantidade );   
                cadNovo = true;

            }else{
                const cadPokemonAlt = await pokemonDB.alterar( id_pokemon, obUsuarioPokemon  );
            }

            //--

            if( cadNovo === false  ){
                //-- Verificar se usuario já possui um pokemos do mesmot tipo
                var _buscaPokemon = await pokemonDB.obterUsuarioPokemon( id_usuario, id_pokemon ); 

                if(_buscaPokemon.length > 0)
                {
                    quantidade += _buscaPokemon[0].quantidade;
                    //-- Atualiza a quantidade
                    const cadUsPokemoAlt = await pokemonDB.alterarUsuarioPokemon( id_usuario, id_pokemon, quantidade ); 
                }else{
                    const cadUsPokemoInc = await pokemonDB.incluirUsuarioPokemon(  id_usuario, id_pokemon, quantidade );   
                }
                //--
            }
    
           //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_pokemon';
            
        })();//async
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};