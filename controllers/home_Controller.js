const User = require('../models/user');  

module.exports.home = function(req,res){
    return res.render('home',{
        title:'home'
    });
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/csv');
    }
    return res.render('signin', {
        title: "SKIT CU | Sign In"
    })
}

module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "SKIT CU | Sign Up"
    })
}


module.exports.create = async (req,res) =>
{
    try{
    let user = await User.findOne({username:req.body.username});
    if(!user){
        await User.create(req.body);
        return res.redirect('/user/signin');
    }
    else
        return res.redirect('back');
    }
    catch(err){
    console.log('Error:',err);
    }
}

module.exports.login = async (req,res)=>{
    return res.redirect('/user/csv');

}
