const UserModel = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;

// get all users
module.exports.getAllUsers = async( req, res) =>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// get one user
module.exports.userInfo = ( req, res) =>{
   
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : '+req.params.id)
    UserModel.findById(req.params.id, (err, data) => {
        if(!err) res.send(data)
        else console.log('id unknow : '+ err);
    }).select('-password');
}

// update info of user
module.exports.updateUser = async ( req, res) =>{
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id)
  
    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set:
                {
                    name:req.body.name,
                    
                }
            },
            { new: true , upsert: true, setDefaultsOnInsert: true},
            (err, data) => {
                if(!err) return res.send(data);
                if(err) return res.status(500).send({message: err})
                
            }
        )
    } catch(err){
        return res.status(500).json({message: err});
     
    }
}


// delete user
module.exports.deleteUser = async ( req, res) =>{
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id)
        
    try {
        await UserModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({message:"Successfuly deleted."});
    } catch(err){
        return res.status(500).json({message: err}); 
    }
  

}

 module.exports.addSearchedPlaceToUser = async( req, res,next) =>{
    try{

        //


       
    const users = await UserModel.findById(req.params.id)
    if(users.searchList.length==0){
        console.log(req.body.place)
        req.body.list=[req.body.place.toLowerCase()]

  

    }else{
        totalPlaces=users.searchList;
        place=req.body.place.toLowerCase();
        if(totalPlaces.indexOf(place)<0){
            totalPlaces.unshift(place)
        }else{
          
            totalPlaces = totalPlaces.filter(i => i !== place);
            totalPlaces.unshift(place)

            console.log(totalPlaces)
        }
        if(totalPlaces.length>5){
            totalPlaces.pop();
        }
        req.body.list=totalPlaces
    }
    next();
    console.log(totalPlaces,place)

}catch(err){
    res.status(403).json(err)
}
}
 

module.exports.update = async( req, res) =>{
    try{

        //
        console.log(req.body.list)


       
    const users = await UserModel.findByIdAndUpdate(req.params.id,{searchList:req.body.list})
 
    res.status(200).json(users);
}catch(err){
    res.status(403).json(err)
}
}
 