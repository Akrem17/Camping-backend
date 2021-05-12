module.exports.signUpErrors= (err) => {

    let errors = { name:'', email:'', password:''  }
    if(err.message.includes('name'))
        errors.name = "name incorrect ou deja pris"
    
    if(err.message.includes('email'))
        errors.email = 'email incorrect'

    if(err.message.includes('password'))
    errors.password = 'le mot de passe doit faire 6 caractére min' 
    
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'cet email est deja enregistré'

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('name'))
    errors.name = 'ce name est deja pris'

    return errors
};


// module.exports.signInErrors= (err) => {

//     let errors = { email:'', password:''  }
        
//     if(err.message.includes('email'))
//         errors.email = 'email incorrect'

//     if(err.message.includes('password'))
//     errors.password = 'le mot de passe ne correspond pas' 
    
//     return errors
// };


module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }