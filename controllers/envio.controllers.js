const {pool} = require('../conexion');

async function generarEnvio(req, res){ 
    const { idfactura }= req.body;
    const query ='Select generar_envio($1)';
    const values = [ idfactura ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se generó un envío'});
        }else{
            res.status(400).json({message: 'No se generó un envío'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function actualizarEnvio(req, res){ 
    const { idfactura }= req.body;
    const query ='Select actualizar_enviar($1)';
    const values = [ idfactura ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se actualizó un envío'});
        }else{
            res.status(400).json({message: 'No se actualizó un envío'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function actualizarObservacion(req, res){ 
    const { idenvio, env_obser }= req.body;
    const query ='Select actualizar_observaciones($1, $2)';
    const values = [ idenvio, env_obser ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se actualizaron las observaciones del envío'});
        }else{
            res.status(400).json({message: 'No se actualizaron las observaciones del envío'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function cambiarEstado(req, res){ 
    const { p_id_envio, p_nuevo_estado }= req.body;
    const query ='Select cambiar_estado_envio($1, $2)';
    const values = [ p_id_envio, p_nuevo_estado ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se cambió el estado del envío'});
        }else{
            res.status(400).json({message: 'No se cambió el estado del envío'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function actualizarEnviosFecha(req, res){ 
    const { idenvio }= req.body;
    const query ='Select actualizar_envio_fecha_md($1)';
    const values = [ idenvio ];
    try{
        const client = await pool.connect();
        const result = await client.query(query,values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se actualizo el envío'});
        }else{
            res.status(400).json({message: 'No se actualizo el envío'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getEnvios(req, res){ 
    const query ='SELECT * FROM obtener_envios()';
    try{
        const client = await pool.connect();
        const result = await client.query(query);
        client.release();  
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(400).json({message: 'No se se obtuvieron los envios'});
        }      
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

module.exports = {
    generarEnvio,
    actualizarEnvio,
    actualizarObservacion,
    cambiarEstado,
    getEnvios,
    actualizarEnvio,
    actualizarEnviosFecha
};