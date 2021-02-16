const db = require('../../database/db_connection'); 

async function obter( id_usuario ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario where cod = ? ;', [id_usuario] );
    return rows;
}

async function obterTodos(){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario ;');
    return rows;
}

async function obterPorNomeLogin( nomeLogin  ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario where usuario = ? ;', [nomeLogin]);
    return rows;
}

async function incluir(usuario){
    const conn = await db.connect();
    const sql = 'INSERT INTO tb_usuario(foto,nome,email,usuario,senha,perfil) VALUES (?,?,?,?,?,?);';
    const values = [usuario.foto,usuario.nome,usuario.email,usuario.usuario,usuario.senha,usuario.perfil];
    return await conn.query(sql, values);
}

async function alterar(id_usuario, usuario){
    const conn = await db.connect();
    const sql = 'UPDATE tb_usuario SET foto=?, nome=?, email=?, usuario=?, senha=?, status=?, perfil=? WHERE cod=?';
    const values = [usuario.foto,usuario.nome, usuario.email,usuario.usuario,usuario.senha, usuario.status, usuario.perfil, id_usuario];
    return await conn.query(sql, values);
}

async function remover(id_usuario){
    const conn = await db.connect();
    const sql = 'DELETE FROM tb_usuario where cod=?;';
    return await conn.query(sql, [id_usuario]);
}

async function obterPerfil( id_usuario ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_perfil_usuario ORDER BY perfil ASC;' );
    return rows;
}

module.exports = {obter, obterTodos, obterPorNomeLogin, incluir, alterar, remover, obterPerfil};