const User=require("../model/user");



module.exports.rendersignupform=(req,res)=>{
    res.render("includes/users/signup.ejs");
    };

module.exports.signup=async (req,res)=>{
      
    try {
        let {username,email,password}=req.body;
     const newuser=new User({ email,username });
    const registeruser= await User.register(newuser,password);
     req.login(registeruser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","welcome in wonderlust");
        res.redirect("/listings");
    })
     
    } catch(e)
    {
        req.flash("error", "THIS USERNAME ALREADY REGISTERED ");
        res.redirect("/signup");
    }
       
     
};

module.exports.loginform=(req,res)=>{
    res.render("includes/users/login.ejs");
};

module.exports.login=async (req,res)=>{
 
    req.flash("success","welcome to wonderlust");
    let redirecturl=res.locals.redirecturl||"/listings"
 res.redirect(redirecturl)};

 module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!!");
        res.redirect("/listings");
    });
};
