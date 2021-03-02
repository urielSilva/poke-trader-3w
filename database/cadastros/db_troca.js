const db = require('../../database/db_connection'); 

async function obter( id_troca ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario_troca where id_troca = ? ;', [id_troca] );
    return rows;
}

async function obterTodos( ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario_troca ;');
    return rows;
}

async function obterPorUsuario( id_usuario ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT id_troca, DATE_FORMAT( data_troca, "%D %M %Y") as data_troca, id_usuario, u.nome AS nome_usuario, id_usuario_troca, u1.nome AS nome_usuario_troca , total_experiencia_oferta, total_experiencia_proposta, total_pontos_diferenca_experiencia FROM `tb_usuario_troca` ut JOIN  `tb_usuario` u ON u.cod = ut.id_usuario JOIN  `tb_usuario` u1 ON u1.cod = ut.id_usuario_troca where id_usuario = ? ;', [id_usuario]);
    return rows;
}

async function incluir(troca){
    const conn = await db.connect();
    const sql = 'INSERT INTO tb_usuario_troca(id_usuario, id_usuario_troca, total_experiencia_oferta, total_experiencia_proposta, total_pontos_diferenca_experiencia ) values ( ?,?,?,?,? );';
    const values = [troca.id_usuario, troca.id_usuario_troca, troca.total_experiencia_oferta, troca.total_experiencia_proposta, troca.total_pontos_diferenca_experiencia];
    return await conn.query(sql, values);
}

async function alterar(id_troca, troca){
    const conn = await db.connect();
    
    dt_atualizacao = new Date();

    const sql = 'UPDATE tb_usuario_troca SET total_experiencia_oferta=?, total_experiencia_proposta=?, total_pontos_diferenca_experiencia=? WHERE id_troca=?';
    const values = [troca.total_experiencia_oferta, troca.total_experiencia_proposta, troca.total_pontos_diferenca_experiencia , id_troca];

    return await conn.query(sql, values);
}

async function remover(id_troca){
    const conn = await db.connect();
    const sql = 'DELETE FROM tb_usuario_troca where id_troca=?;';
    return await conn.query(sql, [id_troca]);
}

//---- TROCA ITEM
// --------------


module.exports = {obter, obterTodos, obterPorUsuario, incluir, alterar, remover};