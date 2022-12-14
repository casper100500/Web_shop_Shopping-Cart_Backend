const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    
    const authHeader=req.get('authorization')
    //console.log(authHeader)
    //console.log(req.headers)
    if(!authHeader){
        req.isAuth = false
       return next()
    }
    // Authorizaton : Bearer eyJhbG...
    //authHeader = Bearer eyJhbG...
    const token=authHeader.split(' ')[1]; 

    if (!token || token ===''){
       req.isAuth = false
       return next()
    }
let decodedToken;
try {    
    decodedToken= jwt.verify(token,`${process.env.jwtPassword}`)
}
catch(err)
{   req.isAuth = false
    return next()
    //throw err
}

if (!decodedToken){
    req.isAuth = false
    return next()
}

req.isAuth = true
req.userId = decodedToken.userId
next()
}