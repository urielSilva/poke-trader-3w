const db = require( '../database/db_connection' ); 

async function obter( username, password ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario where usuario = ? and senha = ? ;', [username, password ] );
    return rows;
}

async function obterTodos(){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM clientes;');
    return rows;
}

async function incluir(customer){
//    const conn = await db.connect();
//    const sql = 'INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);';
//    const values = [customer.nome, customer.idade, customer.uf];
//    return await conn.query(sql, values);
}

async function alterar(id, customer){
//    const conn = await db.connect();
//    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?';
//    const values = [customer.nome, customer.idade, customer.uf, id];
//    return await conn.query(sql, values);
}

async function remover (id){
//    const conn = await db.connect();
//    const sql = 'DELETE FROM clientes where id=?;';
//    return await conn.query(sql, [id]);
}

module.exports = {obter, obterTodos, incluir, alterar, remover}