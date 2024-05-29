const jwt = require("jsonwebtoken");

function handleLoginPage_get(req, res){
    return res.render("login", { msg : false})
}

function handleLogin_post(req, res){
    const {admin, password} = req.body;
    if(admin === process.env.ADMIN && password === process.env.PASSWORD){
        const token = jwt.sign({admin}, "secretkey1234");
        res.cookie("jwt", token);
        return res.redirect("/api/ar");
    }else{
        // return res.json({error: "Invalid user or password"});
        return res.render("login", { msg : true})
    }
}

function handleLogout_get(req, res){
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/api/ar');
}

module.exports = {
    handleLoginPage_get,
    handleLogin_post,
    handleLogout_get
}