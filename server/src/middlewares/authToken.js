// Middleware - Authorization: Bearer <token> //

function authToken(req, res, next){
    
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
         req.token = bearerToken;
         next();
    }else{
        res.status(403).send('Acceso restringido, necesitas un token para ingresar a esta ruta.')
    }
}

export default authToken;