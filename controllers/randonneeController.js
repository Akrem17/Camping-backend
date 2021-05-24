const randonneeModel = require('../models/randonneeModel');

const user = require('../models/userModel');
const mongoose = require('mongoose');



// add randonnee
exports.add_randonnee=(req,res,next)=>{
    console.log(req.body);
    const randonnee = new randonneeModel({
        name : req.body.name,
        description : req.body.description,
        datesortie : req.body.datesortie,
        datefin : req.body.datefin,
        destiniation : req.body.destiniation,
        prix : req.body.prix,
        nombre_places : req.body.nombre_places,

        id_organisateur :mongoose.Types.ObjectId(req.body.user),

    });
    randonnee
        .save()
        .then(result =>{
            console.log('created randonnee');
            res.send('created randonnee');
        })
        .catch(err =>{
            console.log(err);
        });


        
};

// fetch all randonnees
exports.get_randonnee=async (req,res,next)=>{
    
    let reg = ""
    let reg2 = ""
    let obj = null
    let append = null
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
        .findById(req.params.randonneeId).populate('comments')
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
