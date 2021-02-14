const usuarioDB = require('../../database/cadastros/db_usuario' );
const materialDB = require('../../database/cadastros/db_material');

    //-------------------------------------------------------------------------------------- Funções exportadas
    //Funções contendo os selects responsáveis por retornar o resultado caso chamado

    //Perfis de usuário
    async function getPerfilUsuario() {
        const result = await usuarioDB.obterPerfil();
        return result;
    };

    //Materiais
    async function getMateriais() {
        return await materialDB.obterTodos();
    };

    //Familias de material
    async function getFamiliaMaterial() {
        return await materialDB.obterFamilia();
    };

    //Grupos de material
    async function getGrupoMaterial() {
        return await materialDB.obterGrupo();
    };

//Exportando esta classe
module.export = { getPerfilUsuario, getMateriais, getFamiliaMaterial, getGrupoMaterial };