const {pool} = require('../conexion');

async function crearUsuarios(req, res){ 
    const { user_email, user_password, user_nombre, user_apellido, user_cedula, 
        user_foto, id_canton, address_calles, address_codpostal } = req.body;
    const query= 'SELECT insertar_usuario_direccion($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [ user_email, user_password, user_nombre, user_apellido, user_cedula, 
        user_foto, id_canton, address_calles, address_codpostal ];
    try{
        const client = await pool.connect();        
        const result= await client.query(query, values);              
        client.release();        
        if(result.rowCount > 0){
            res.status(200).json({message: 'Se guardó el usuario'});
        }else{
            res.status(400).json({message: 'No se guardó el usuario'});
        }       
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

//Inicia sesion
async function validarIngreso(req, res) {
    const { user_email, user_password } = req.body;
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM usuario WHERE user_email = $1';
        const result = await client.query(query, [user_email]);
        client.release(); 
        if (result.rows.length === 1) {
            console.log(result);
            const usuario = result.rows[0];
            if (usuario.user_password === user_password) {
                res.json({ message: 'Inicio de sesión exitoso', usuario });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//Devuelve los datos del usuario segun el correo 
async function getUsuario(req, res){ 
    const { user_email } = req.body; 
    const query = 'Select * from usuario where user_email = $1'
    const values = [ user_email ];
    console.log(user_email);
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(500).json({message: 'No existe'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getUsuarios(req, res){ 
    const query = 'Select * from usuario where id_tipouser=2'
    try{
        const client = await pool.connect();
        const result = await client.query(query);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(500).json({message: 'No hay usuarios'});
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function getUsuariosDireccion(req, res){ 
    const query = 'Select * from obtener_informacion_usuarios()'
    try{
        const client = await pool.connect();
        const result = await client.query(query);
        client.release(); 
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(400).json({message: 'No hay usuarios'});
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function updateUsuario(req, res){
    const { correo_electronico, nuevo_nombre, nuevo_apellido, nuevo_cedula, nueva_calle,
        nuevo_codpostal, nuevo_id_canton, nueva_foto } = req.body;
    const query = 'SELECT editar_usuario($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [ correo_electronico, nuevo_nombre, nuevo_apellido, nuevo_cedula, nueva_calle,
        nuevo_codpostal, nuevo_id_canton, nueva_foto ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); //no conexion abierta       
        if(result.rowCount > 0){            
            res.status(200).json({message: 'Se actualizó usuario'})
        }   else{
            res.status(400).json({message: 'No existe usuario'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}

async function obtenerDireccion(req, res){
    const { p_user_email } = req.body;
    const query = 'SELECT * FROM obtener_direccion($1)';
    const values = [ p_user_email ];
    try{
        const client = await pool.connect();
        const result = await client.query(query, values);   
        client.release(); //no conexion abierta       
        if(result.rowCount > 0){
            res.status(200).json(result.rows);
        }   else{
            res.status(500).json({message: 'No existe'})
        }
    }catch(err){
        res.status(500).json({error: 'Error en el servidor'});  
    }
}


module.exports= {
    crearUsuarios,
    validarIngreso,
    getUsuario,
    getUsuarios,
    getUsuariosDireccion,
    updateUsuario,
    obtenerDireccion
};