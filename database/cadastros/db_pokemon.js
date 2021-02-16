const db = require('../../database/db_connection'); 

async function obter( id_pokemon ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_pokemon where id_pokemon = ? ;', [id_pokemon] );
    return rows;
}

async function obterTodos(){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_pokemon ;');
    return rows;
}

async function obterPorNome( nome  ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_pokemon where nome = ? ;', [nome]);
    return rows;
}

async function incluir(pokemon){
    const conn = await db.connect();
    const sql = 'INSERT INTO tb_pokemon(foto,nome,descricao,experiencia_base) VALUES (?,?,?,?);';
    const values = [pokemon.foto,pokemon.nome,pokemon.descricao,pokemon.experiencia_base];
    return await conn.query(sql, values);
}

async function alterar(id_pokemon, pokemon){
    const conn = await db.connect();
    const sql = 'UPDATE tb_pokemon SET foto=?, nome=?, descricao=?, experiencia_base=?, data_atualizacao=? WHERE id_pokemon=?';
    const values = [pokemon.foto,pokemon.nome,pokemon.descricao,pokemon.experiencia_base, pokemon.data_atualizacao, id_pokemon];
    return await conn.query(sql, values);
}

async function remover(id_pokemon){
    const conn = await db.connect();
    const sql = 'DELETE FROM tb_pokemon where id_pokemon=?;';
    return await conn.query(sql, [id_usuario]);
}

//---- USUARIO POKEMON
// ---------------------

async function obterUsuarioPokemon( id_usuario, id_pokemon ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario_pokemon where  id_usuario = ? and id_pokemon = ? ;', [id_usuario,id_pokemon] );
    return rows;
}

async function obterUsuarioPokemonTodos(id_usuario ){
    const conn = await db.connect();
    //const [rows] = await conn.query('SELECT * FROM tb_usuario_pokemon where id_usuario = ?  ;', [id_usuario]);

    const [rows] = await conn.query('SELECT  up.id_pokemon  , up.id_usuario, p.foto, p.nome , p.descricao , up.quantidade , up.quantidade * p.experiencia_base AS total_experiencia , up.data_inclusao , up.data_atualizacao FROM `tb_usuario_pokemon` up JOIN  tb_pokemon p ON p.id_pokemon = up.id_pokemon  where id_usuario = ?  ORDER BY id_pokemon DESC;',  [id_usuario]);

    return rows;
}

async function incluirUsuarioPokemon(id_usuario,pokemon,quantidade ){
    const conn = await db.connect();
    const sql = 'INSERT INTO tb_usuario_pokemon(id_pokemon,id_usuario,quantidade) VALUES (?,?,?);';
    const values = [pokemon.id_pokemon, id_usuario, quantidade];
    return await conn.query(sql, values);
}

async function alterarUsuarioPokemon(id_usuario, id_pokemon, quantidade ){
    const conn = await db.connect();
    const sql = 'UPDATE tb_usuario_pokemon SET quantidade=?, data_atualizacao=? WHERE id_usuario=?,id_pokemon=?';
    
    dt_atualizacao = new Date();

    const values = [  quantidade, dt_atualizacao, id_usuario, id_pokemon];
    return await conn.query(sql, values);
}

async function removerUsuarioPokemon(id_usuario, id_pokemon){
    const conn = await db.connect();
    const sql = 'DELETE FROM tb_usuario_pokemon where id_usuario=? , id_pokemon=?;';
    return await conn.query(sql, [id_usuario,id_pokemon ]);
}

module.exports = {obter, obterTodos, obterPorNome, incluir, alterar, remover, obterUsuarioPokemon,obterUsuarioPokemonTodos,incluirUsuarioPokemon,alterarUsuarioPokemon,removerUsuarioPokemon};