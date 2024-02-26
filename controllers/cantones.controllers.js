const {pool} = require('../conexion');

async function getCantones(req, res){ 
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT id_canton, canton_nombre FROM cantones');
        client.release();
        res.json(result.rows);
    } catch(err) {
        res.status(500).json({error: 'Error en el servidor'});
    }
}
module.exports = {
    getCantones
}

