const config = require('./config');
const mysql = require("mysql2/promise");

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    //--
    
    const connection = await mysql.createConnection( config );
    console.log("Conectou no MySQL!");
    global.connection = connection;

    return connection;
}

module.exports = {connect}