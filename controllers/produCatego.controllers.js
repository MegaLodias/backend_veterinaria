const {pool} = require('../conexion');

async function insertarProdCate(req, res){ 
    const { idprod, idcat }= req.body;
    const query ='Select * from insertar_producto_animal($1, $2)';
    const values = [ idprod, idcat ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se relacionó la categoría y el producto'});
        }else{ 
            res.status(400).json({message: 'No se relacionó la categoría y el producto'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function editarProdCate(req, res){ 
    const { idprodcate, idprod, idcat }= req.body;
    const query ='Select editar_producto_animal($1, $2, $3)';
    const values = [ idprodcate, idprod, idcat ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se editó la relación categoria/producto'});
        }else{
            res.status(400).json({message: 'No se editó la relación categoria/producto'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getProductosCategoria(req, res){ 
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM obtener_productos_con_categoria_prueba()');
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(500).json({message: 'No hay productos con categorias'});
        }        
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function insertarProdcuctosCategoria(req, res){ 
    const { p_nombre, p_stock, p_descripcion, p_precio, p_foto, p_id_categoria }= req.body;
    const query ='Select insertar_producto_categoria($1, $2, $3, $4, $5, $6)';
    const values = [ p_nombre, p_stock, p_descripcion, p_precio, p_foto, p_id_categoria ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardó el producto con la categoria'});
        }else{
            res.status(400).json({message: 'No se guardó el producto con la categoria'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor producto con categoria'});  
    }
}
module.exports = {
    insertarProdCate,
    editarProdCate,
    getProductosCategoria,
    insertarProdcuctosCategoria
};