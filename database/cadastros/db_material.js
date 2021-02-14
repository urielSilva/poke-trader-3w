const db = require('../../database/db_connection'); 

async function obter( id_material ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_material where cod = ? ;', [id_material] );
    return rows;
}

async function obterTodos(){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_material ;');
    return rows;
}

async function incluir(material){
    const conn = await db.connect();
    const sql = 'INSERT INTO tb_material(foto,material,descricao,multiplo,valor,familia,grupo,observacao) VALUES (?,?,?,?,?,?,?,?);';
    const values = [material.foto, material.material,material.descricao,material.multiplo,material.valor,material.familia,material.grupo,material.observacao];
    return await conn.query(sql, values);

}

async function alterar(id_usuario, material){
    const conn = await db.connect();
    const sql = 'UPDATE tb_material SET foto=?, material=?, descricao=?, multiplo=?, valor=?, familia=?, grupo=?,observacao=? WHERE cod=?';
    const values = [material.foto, material.material,material.descricao,material.multiplo,material.valor,material.familia,material.grupo,material.observacao];
    return await conn.query(sql, values);
}

async function remover(id_material){
    const conn = await db.connect();
    const sql = 'DELETE FROM tb_material where cod=?;';
    return await conn.query(sql, [id_material]);
}

async function obterGrupo( id_material ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_grupo_material ORDER BY grupo ASC;' );
    return rows;
}

async function obterFamilia( id_material ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_familia_material ORDER BY familia ASC ;' );
    return rows;
}

module.exports = {obter, obterTodos, incluir, alterar, remover, obterGrupo, obterFamilia};