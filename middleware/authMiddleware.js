const userModel = require('../models/userModel');
const jwt = require ('jsonwebtoken');
const util = require('util');



exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            }else {  
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;           
                next();
            }
        })
    }else {
        res.locals.user = null ;
        next();
    }
}
// pour authentification automatique
exports.requireAuth = (req,res , next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken)=> {
            if(err){
                console.log(err);

            }else{
                console.log("*******", decodedToken.id);
                next();
            }
        
        });
    }else{
        console.log('no token ');
    }
};

//protect route
exports.protect = async (req, res, next) => {
    console.log('here')
    try {
      //check if token exisit
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
  
      if (!token) {
        throw 'You are not loged In';
      }
      
      //verification token
      const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.TOKEN_SECRET
      );
      //check if the user still exist
      const currentUser = await userModel.findById(decoded.id);
      if (!currentUser) {
        throw 'User does not exist  !';
      }
     
      //GRANT ACCESS TO ROUTE
      
      req.user = currentUser;
      next();
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };