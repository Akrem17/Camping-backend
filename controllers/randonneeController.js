const randonneeModel = require('../models/randonneeModel');

const user = require('../models/userModel');
const mongoose = require('mongoose');



// add randonnee
  
exports.add_randonnee=(req,res,next)=>{
    console.log(req.body);

    const randonnee = new randonneeModel(req.body)

        .save()
        .then(result =>{
            console.log(result);
            res.json(result);
        })
        .catch(err =>{
            console.log(err);
        });


        
};
// get rand by name
exports.randoByName=async (req,res,next)=>{


 
   
             obj = await randonneeModel.find({'startLocation.description':req.body.place}).lean()
    
     
       
     res.json(obj)
    
    }

// fetch all randonnees
exports.get_randonnee=async (req,res,next)=>{
    
    let reg = ""
    let reg2 = ""
    let obj = null
    let append = null
    console.log(req.query.startLocation)

    if (req.query.startLocation)  { 
         reg = new RegExp( "^"+req.query.startLocation,"i" )
         reg2= new RegExp( "^(?!"+req.query.startLocation+")","i" )
             obj = await randonneeModel.find({'startLocation.description':reg}).lean()
             append = await randonneeModel.find({'startLocation.description':reg2}).lean()
     
        append.forEach(elt=>{
        obj.push(elt)
     })
     }else{
        
         obj = await randonneeModel.find()
     }
    
     res.json(obj)
    
    }
    // fetch-by-ID randonnees
exports.getbyId_randonnee=(req,res,next)=>{
     
    randonneeModel
        .findById(req.params.randonneeId).
        populate({
            path: 'comments',

            populate: 'user'
          })
        .then(result =>{
            console.log(result);
            res.send(result);
        })
        .catch(err =>{
            console.log(err);
        });
}

//Update randonnee
exports.update_randonnee=(req,res,next)=>{
     var condition = {_id:req.params.id};
    randonneeModel
        .updateOne(condition,req.body)
        .then(result =>{
            console.log("mise a jour avec succes");
            res.send(result);
        })
        .catch(err =>{
            console.log(err);
        });
}

//Delete randonnee
exports.delete_randonnee=(req,res,next)=>{
   
   randonneeModel
       .findOneAndDelete({_id :req.params.id})
       .exec()
       .then(result =>{
           res.send("suppression avec succes");
       })
       .catch(err =>{
           console.log(err);
       });
}
