


const jwt = require("jsonwebtoken")

function accessWhenLoggedIn(req, res, next){
    const token = req.cookies.jwt

    if(!token){
        return res.redirect("/login");   
    }
    const decoded = jwt.verify(token, "secretkey1234");
    
    if(decoded.admin === process.env.ADMIN){
        next();
    }else{
        return res.redirect("/login");
    }
}

module.exports = {
    accessWhenLoggedIn
}