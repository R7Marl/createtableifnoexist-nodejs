 var mysql = require('mysql');
 var { promisify } = require('util');
 var tables = require('./check');
 var fs = require('fs');
  async function checkCredentials(options, callback) {
      "use strict";
    if(!options.route || options.port || options.user || options.password || options.database || options.route) return console.error('[Table No Exist]: No dates.');
    const db = [options.host, options.port, options.user, opttions.password, options.database];
    const route = options.route;
    const pool = mysql.createPool(db);
    pool.getConnection((err, connection) => {
        if(err) {
            if(err.code === "PROTOCOL_CONNECTION_LOST") {
                console.error(errors.error_conection);
            }
            if(err.code === "ER_CON_COUNT_ERROR") {
                console.error(errors.error_conection);
            }
            if(err.code === "ECONNREFUSED") {
                console.error(errors.error_conection);
            }
        }
        if(connection)  { 
        connection.release();
        console.log(errors.ok);
        }
        return;
    });
    pool.query = promisify(pool.query);
    /* */
    let sql = "SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema = '"+database+"'";
    const result = await pool.query(sql);
      switch(result[0].tables) {
        case 0: {
  setTimeout( async () => {
          const tables = require('./database/database-tables');
          console.log('[Table No Exist]: Creating tables...')
          var sql = fs.readFileSync(route).toString();
          const insert = await pool.query(sql);
          return insert[0];
  }, 100);
        }
        break;
        default: {
          console.log('[Table No Exist]: It is not necessary to create the tables, they are created')
        }
    }
}


module.exports = checkCredentials;