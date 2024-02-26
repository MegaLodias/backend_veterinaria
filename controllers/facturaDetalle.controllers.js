const {pool} = require('../conexion');


async function getDetalles(req, res){
    const { id_facturas}= req.body
    const query ='SELECT * FROM obtener_detalles_factura($1)';
    const values =[id_facturas];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se se obtuvieron las facturas'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}
async function insertarDetalles(req, res){ 
    const { idfactura, idproducto, prodcant }= req.body;
    const query ='Select insertar_detalle($1, $2, $3)';
    const values = [ idfactura, idproducto, prodcant ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se insertó un detalle'});
        }else{
            res.status(400).json({message: 'No se insertó un detalle'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function insertarFactura(req, res){ 
    const { id_usuario }= req.body;
    const query ='Select insertar_factura_pr($1)';
    const values = [ id_usuario ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se insertó una factura'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function actualizarFacttura(req, res){ 
    const { idfactura }= req.body;
    const query ='Select actualizar_factura_total($1)';
    const values = [ idfactura ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se actualizó una factura'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getFacturas(req, res){ 
    const query ='SELECT * FROM obtener_facturas_con_detalles()';
    try{
        const client = await pool.connect();
        const result = await client.query(query);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se se obtuvieron las facturas'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getFacturasDetalles(req, res){ 
    const query ='SELECT * FROM vista_detalle_factura_admin';
    try{
        const client = await pool.connect();
        const result = await client.query(query);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se se obtuvieron las facturas con los detalles'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function obtenerFacturaUsuario(req, res){ 
    const { idcliente } = req.body;
    const query ='SELECT * FROM obtener_detalle_usuario_pr($1)';
    const values =[ idcliente ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se obtuvieron las facturas con los detalles'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports ={
    insertarDetalles,
    insertarFactura,
    actualizarFacttura, 
    getFacturas,
    getFacturasDetalles,
    getDetalles,
    obtenerFacturaUsuario
};