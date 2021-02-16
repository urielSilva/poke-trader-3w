const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const usuarioDB = require('./../../database/cadastros/db_usuario');

//Importando o móduto routes/login.js 
const jsLogin = require('./../login');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageUsuario: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        (async () => {

            //Consultas diversas para popular elementos
            var perfis = await usuarioDB.obterPerfil();

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_usuario';

            var results = await usuarioDB.obterTodos();

            //Passa o conteúdo das variáveis para a página principal
            res.render('./pageAdmin', {
                DTUsuario: results,
                DTPerfis: perfis,
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
                CadUsuario: 'active',
                CadMaterial: '',
                CadPokemon: '',
                //Trade
                Trade:'',
                TradeOpen: '',
                CadTroca:''
            });

            //Reinicia a variável
            status_Crud = '';

        })();//async
    },

    addUsuario: (req, res) => {
        (async () => {
            //Verifica se selecionou uma imagem
            if (!req.files) {
                //Se não selecionou, executa INSERT com imagem genérica
                let nome = req.body.nome_ADD.trim();
                let email = req.body.email_ADD.trim();
                let usuario = req.body.usuario_ADD.trim();
                let senha = req.body.senha_ADD.trim();
                let perfil = req.body.perfil_ADD;

                //Lista
                let status = '';
                if (req.body.status_ADD == 'on') {
                    status = '1';
                } else {
                    status = '0';
                };

                //Definindo nome da imagem conforme arquivo selecionado
                //let uploadedFile = req.files.image_ADD;
                //let fileExtension = uploadedFile.mimetype.split('/')[1];
                //let image_name = uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;
                let image_name = usuario + '.png';

                //Consultas diversas para popular elementos
                var perfis = await usuarioDB.obterPerfil();
    
                //Atribuindo o conteúdo central
                page = './includes/cadastros/inc_usuario';

                //Verifica se o registro adicionado já existe
                var results = await usuarioDB.obterPorNomeLogin( usuario );

                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/usuario');
                } else {
                    obUsuario = {  "nome" : nome, "email" : email, "usuario":usuario, "senha":senha, "perfil":perfil, "status":status, "foto" : image_name  };
                    var result = await usuarioDB.incluir( obUsuario );

                    //Executa o INSERT
                    if ( result.err ) {
                        console.log('Erro 003: ', err);
                        status_Crud = 'nao';
                        res.redirect('/usuario');
                    } else {
                        try {
                            //INSERT realizado com sucesso, agora faça uma cópia da imagem genérica para a pasta
                            fse.copyFile('public/dist/img/generic/usuario-no-image.png', 'public/dist/img/usuarios/' + image_name);
                        } catch (err) {
                            console.log('Erro 004: ', err);
                            status_Crud = 'imgErroCopia';
                            res.redirect('/usuario');
                        }
                        //INSERT finalizado
                        status_Crud = 'sim';
                        res.redirect('/usuario');
                    }
                }
            } else { //Selecionou uma imagem
                    //Executa INSERT com a imagem selecionada
                    let nome = req.body.nome_ADD.trim();
                    let email = req.body.email_ADD.trim();
                    let usuario = req.body.usuario_ADD.trim();
                    let senha = req.body.senha_ADD.trim();
                    let perfil = req.body.perfil_ADD;

                    let status = '';
                    if (req.body.status_ADD == 'on') {
                        status = '1';
                    } else {
                        status = '0';
                    };

                    //Definindo nome da imagem conforme arquivo selecionado
                    let uploadedFile = req.files.image_ADD;
                    let fileExtension = uploadedFile.mimetype.split('/')[1];
                    let image_name = usuario + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;

                    //Verifica se o registro adicionado já existe
                    var results = await usuarioDB.obterPorNomeLogin( usuario );

                    if (results.length > 0) {
                        //Já existe!
                        console.log('Erro 005: ', err);
                        status_Crud = 'registroExiste';
                        res.redirect('/usuario');
                    } else {
                        //Valida se a extenção da imagem selecionada é válida
                        if (uploadedFile.mimetype === 'image/png' ||
                            uploadedFile.mimetype === 'image/jpeg' ||
                            uploadedFile.mimetype === 'image/jpg' ||
                            uploadedFile.mimetype === 'image/gif') {

                            //Se válido, faz o upload da imagem para a pasta
                            uploadedFile.mv(`public/dist/img/usuarios/${image_name}`, (err) => {
                            if (err) {
                                //Erro ao fazer upload
                                console.log('Erro 006: ', err);
                                status_Crud = 'imgErroCopia';
                                res.redirect('/usuario');
                            } else {
                                (async () => {
                                    //Faz o INSERT com foto selecionada
                                    obUsuario = {  "nome" : nome, "email" : email, "usuario":usuario, "senha":senha, "perfil":perfil, "status":status, "foto" : image_name  };
                                    //Executa o INSERT
                                    var result = await usuarioDB.incluir( obUsuario );

                                    if ( results.err) {
                                        console.log('Erro 007: ', err);
                                        status_Crud = 'nao';
                                        res.redirect('/usuario');
                                    }

                                    //INSERT realizado com sucesso
                                    status_Crud = 'sim';
                                    res.redirect('/usuario');
                                })();//async
                            }
                        });
                    } else { //Imagem inválida (extenção)                        
                        console.log('Erro 008: ', err);
                        status_Crud = 'imgErroExtensao';
                        res.redirect('/usuario');
                    }
                }
            }
        })();//async
    },

    editUsuario: (req, res) => {
        (async () => {
            //Verifica se selecionou uma imagem
            if (!req.files) {
                //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
                let cod = req.body.cod_EDIT;
                let nome = req.body.nome_EDIT.trim();
                let email = req.body.email_EDIT.trim();
                let usuario = req.body.usuario_EDIT.trim();
                let senha = req.body.senha_EDIT.trim();
                let perfil = req.body.perfil_EDIT;

                //Combobox
                let status = '';
                if (req.body.status_EDIT == 'on') {
                    status = '1';
                } else {
                    status = '0';
                };

                // Localiza registro para obter dados permanentes
                var result = await usuarioDB.obter(cod);

                if (result.err) {
                    console.log('Erro 009: ', err);
                    status_Crud = 'nao';
                    res.redirect('/usuario');
                }else{

                    obUsuario = { "foto": result[0].foto, "nome" : nome, "email" : email, "usuario":usuario, "senha":senha, "status" : status, "perfil":perfil };
                    var result = await usuarioDB.alterar( cod, obUsuario );

                    if (result.err) {
                        console.log('Erro 009: ', err);
                        status_Crud = 'nao';
                        res.redirect('/usuario');
                    } else {
                        //Atualiza dados da seção
                        if (cod == req.session.cod_login) {
                            req.session.cod_login = cod;
                            req.session.nome_login = nome;
                            //req.session.foto_login = image_name;
                            req.session.usuario_login = usuario;
                            req.session.perfil_login = perfil;
                        } else {
                            //Não faça nada
                        }

                        //UPDATE realizado com sucesso              
                        status_Crud = 'sim';
                        res.redirect('/usuario');
                    }
                }
            } else { //Selecionou uma imagem
                //Executa UPDATE com a imagem selecionada
                let cod = req.body.cod_EDIT;
                let nome = req.body.nome_EDIT.trim();
                let email = req.body.email_EDIT.trim();
                let usuario = req.body.usuario_EDIT.trim();
                let senha = req.body.senha_EDIT.trim();
                let perfil = req.body.perfil_EDIT;

                let status = '';
                if (req.body.status_EDIT == 'on') {
                    status = '1';
                } else {
                    status = '0';
                };

                //Definindo nome da imagem conforme arquivo selecionado
                let uploadedFile = req.files.image_EDIT;
                let fileExtension = uploadedFile.mimetype.split('/')[1];
                let image_name = usuario + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;

                //Deleta a imagem antiga
                var result = await usuarioDB.obter(cod);

                let image = result[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/usuarios/${image}`, (err) => {

                    //Valida se a extenção da imagem selecionada é válida
                    if (uploadedFile.mimetype === 'image/png' ||
                        uploadedFile.mimetype === 'image/jpeg' ||
                        uploadedFile.mimetype === 'image/jpg' ||
                        uploadedFile.mimetype === 'image/gif') {

                        //Se válido, faz o upload da imagem para a pasta
                        uploadedFile.mv(`public/dist/img/usuarios/${image_name}`, (err) => {
                            (async () => {
                                if (err) {
                                    console.log('Erro 010: ', err);
                                    status_Crud = 'imgErroCopia';
                                    res.redirect('/usuario');
                                } else {
                                        //Faz o UPDATE com a imagem selecionada
                                        obUsuario = { "foto": image_name, "nome" : nome, "email" : email, "usuario":usuario, "senha":senha, "status" : status, "perfil":perfil };
                                        var result = await usuarioDB.alterar( cod, obUsuario );
                    
                                        if (result.err) {
                                            console.log('Erro 011: ', err);
                                            status_Crud = 'nao';
                                            res.redirect('/usuario');
                                        }

                                        //Atualiza dados da seção
                                        if (cod == req.session.cod_login) {
                                            req.session.cod_login = cod;
                                            req.session.nome_login = nome;
                                            req.session.foto_login = image_name;
                                            req.session.usuario_login = usuario;
                                            req.session.perfil_login = perfil;
                                        } else {
                                            //Não faça nada
                                        }

                                        //UPDATE realizado com sucesso              
                                        status_Crud = 'sim';
                                        res.redirect('/usuario');
                                }
                            })();//async
                        });

                    } else { //Imagem inválida (extenção)                
                        console.log('Erro 012: ', err);
                        status_Crud = 'imgErroExtensao';
                        res.redirect('/usuario');
                    }
                });
                //});
            }
        })();//async
    },

    delUsuario: (req, res) => {

        (async () => {
            let cod = req.params.id;
            var result = await usuarioDB.obter(cod);

            //Verifica se a imagem existe
            if (result.err) {
                console.log('Erro 013: ', err);

                //Executa do DELETE
                var result = await usuarioDB.remover(cod);
                if (err) {
                    console.log('Erro 014: ', err);
                    status_Crud = 'nao';
                    res.redirect('/usuario');
                }

                //DELETE realizado com sucesso
                status_Crud = 'sim';
                res.redirect('/usuario');

            } else { //Existe imagem a deletar
                let image = result[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/usuarios/${image}`, (err) => {
                    (async () => {
                        //Executa do DELETE
                        var result = await usuarioDB.remover(cod);
                        if (err) {
                            console.log('Erro 014: ', err);
                            status_Crud = 'nao';
                            res.redirect('/usuario');
                        }

                        //DELETE realizado com sucesso
                        status_Crud = 'sim';
                        res.redirect('/usuario');
                    })();//async
                });
            }
        })();//async
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },
};