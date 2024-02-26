const { Pool } = require('pg');

/*const pool = new Pool({ //obj pool tiene cadena de conexiones entre postgres y vs
    host: 'localhost', 
    user: 'postgres',
    password: '1234',
    database: 'a',       
    port: '5432'
});*/

const pool = new Pool({ //obj pool tiene cadena de conexiones entre postgres y vs
    host: 'dpg-cne4m4qcn0vc73f9boig-a.oregon-postgres.render.com', 
    user: 'derikaranda',
    password: 'ym5ACa8r8HNm8FvdVqj3ocPR3H2jCFca',
    database: 'veterinaria_vfhg',       
    port: '5432'
});
module.exports = { pool };