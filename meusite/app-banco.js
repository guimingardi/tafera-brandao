var desenvolvimento = false;

var configuracoes = {
    producao: {
        server: "servidor01191072.database.windows.net",
        user: "GF01191072",
        password: "#brucebi1808",
        database: "BancoProjeto",
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000
        }
    },
    desenvolvimento: {
        server: "servidor01191072.database.windows.net",
        user: "GF01191072",
        password: "#brucebi1808",
        database: "BancoProjeto",
        options: {
            encrypt: true
        }
    }
}
 
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conex�o: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
  return sql.connect(configuracoes[perfil])
  // return new sql.ConnectionPool();  
} 

module.exports = {
    conectar: conectar,
    sql: sql
}