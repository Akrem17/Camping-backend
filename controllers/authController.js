const userModel = require('../models/userModel');
const jwt = require ('jsonwebtoken');
var bcrypt = require('bcrypt')
const maxAge =  3 * 24 * 60 * 60 * 1000; 
const { signUpErrors}= require ('../utils/errorsUtilis')

const createToken = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
    
};

// add user
const signUp = async (req, res) => {
   const {name,email,password,picture,role}= req.body
    try{
             //create a new user instance
             const user = await userModel.create({name, email, password, picture, role});
             res.status(201).json({user: user._id});
    }
    catch(err){
        const errors= signUpErrors(err)
        res.status(200).send({ errors })
    }
               
}
// authentification

const signIn = async (req, res) => {
    const email=  req.body.email
    const password = req.body.password 
    const user = await userModel.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            const token = createToken(user._id); 
            res.cookie('jwt', token, { httpOnly:true, maxAge})
            res.status(200).json({user: user._id})
        }else{
            
            res.status(201).json({message:'password incorrect'});
            }
    }else {
        
        res.status(404).json({message: 'user not found'})
        }
    
}


const logout =  (req, res) => {
    res.cookie('jwt', ' ' , { maxAge:1 });
     res.redirect('/');
  

}



module.exports = {
    signUp,
    signIn,
    logout
}