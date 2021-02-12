# Antes de criar o BD execute estes comando no seu servidor
SET @@global.collation_connection = 'latin1_swedish_ci';
SET @@global.collation_database = 'latin1_swedish_ci';
SET @@global.collation_server = 'latin1_swedish_ci';
SET @@session.collation_connection = 'latin1_swedish_ci';
SET @@session.collation_database = 'latin1_swedish_ci';
SET @@session.collation_server = 'latin1_swedish_ci';

# Alterer usuario e senha no código abaixo
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '!Eliane01';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '!Eliane01';
ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '!Eliane01';