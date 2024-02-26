const {pool} = require('../conexion');

async function getCategorias(req, res){ // req= requerimientos 
    try{
        const client = await pool.connect();
        const result = await client.query('select * from categoria');
        client.release(); // suelta conexion, no conexion abierta
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}


async function getCategoriasCombobox(req, res){ 
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT id_categoria, animal_categoria FROM categoria');
        client.release();
        res.json(result.rows);
    } catch(err) {
        res.status(500).json({error: 'Error en el servidor'});
    }
}


async function insertarCategoria(req, res){ 
    const { cat_animal, cat_descrip }= req.body;
    const query ='Select * from insertar_categoria($1, $2)';
    const values = [ cat_animal, cat_descrip ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardó la categoría'});
        }else{
            res.status(400).json({message: 'No se guardó la categoría'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function editarCategoria(req, res){ 
    const { idcat, cat_animal, cat_descrip }= req.body;
    const query ='Select editar_categoria($1, $2, $3)';
    const values = [ idcat, cat_animal, cat_descrip ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se editó la categoría'});
        }else{
            res.status(400).json({message: 'No se editó la categpría'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports = {
    getCategorias,
    insertarCategoria,
    editarCategoria,
    getCategoriasCombobox
};