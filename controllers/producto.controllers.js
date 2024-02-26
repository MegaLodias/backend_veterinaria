const {pool} = require('../conexion');

async function getProdcuctos(req, res){ 
    try{
        const client = await pool.connect();
        const result = await client.query('select * from producto');
        client.release(); 
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function insertarProdcuctos(req, res){ 
    const { prod_stock, prod_nombre, prod_descrip, prod_precio, prod_foto }= req.body;
    const query ='Select insertar_producto($1, $2, $3, $4, $5)';
    const values = [ prod_stock, prod_nombre, prod_descrip, prod_precio, prod_foto ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardó el producto'});
        }else{
            res.status(400).json({message: 'No se guardó el producto'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}
    
async function editarProdcuctos(req, res){ 
    const { id_prod, prod_stock, prod_nombre, prod_descrip, prod_precio} =req.body; 
    const query = 'Select editar_producto($1, $2, $3, $4, $5)';
    const values = [id_prod, prod_stock, prod_nombre, prod_descrip, prod_precio];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se actualizó el producto'});
        }else{
            res.status(400).json({message: 'No se actualizó el producto'});
        }          
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function buscarProdcuctosNombre(req, res){ 
    const { p_nombre_producto } =req.body; 
    const query = 'Select * from  buscar_por_nombre($1)';
    const values = [ p_nombre_producto ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.json(result.rows);
        }else{
            res.status(400).json({message: 'No se encontró el producto'});
        }          
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function buscarProdcuctosCategoria(req, res){ 
    const { p_nombre_categoria } =req.body; 
    const query = 'Select * from  listar_productosCategoria($1)';
    const values = [ p_nombre_categoria ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.json(result.rows);
        }else{
            res.status(400).json({message: 'Algun error con la categoria'});
        }          
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports = {
    getProdcuctos,
    insertarProdcuctos,
    editarProdcuctos,
    buscarProdcuctosNombre,
    buscarProdcuctosCategoria
};