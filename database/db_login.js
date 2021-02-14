const db = require('../database/db_connection'); 

async function obter( username, password ){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM tb_usuario where usuario = ? and senha = ? ;', [username, password ] );
    return rows;
};

module.exports = {obter};