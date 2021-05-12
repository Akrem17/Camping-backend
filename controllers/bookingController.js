const User = require('../models/userModel');
const BookingModel = require('../models/bookingModel');
const mongoose = require('mongoose');
const ObjectID = require('mongoose').Types.ObjectId;
const bookingModel = require('../models/bookingModel');
const tour = require('../models/randonneeModel');
// get all booking
module.exports.getBooking = ( req, res) =>{
    BookingModel.find((err, data)=> {
        if (!err) res.send(data);
        else console.log('erreur to get data : ' + err);
    })
    
}

// add booking
module.exports.createBooking = async ( req, res) =>{
    const newBooking = new bookingModel({       
        tour: mongoose.Types.ObjectId(req.body.tour),
        user: mongoose.Types.ObjectId(req.body.user),
        price:req.body.price,
        paid:true,
        nbrPlace: req.body.nbrPlace,
    });
    console.log("boook",newBooking.user.name);
    try{
       
        const booking = await newBooking.save();   
        // User.findById(newBooking.user,(err,user)=>{
                
        //     user.reserverTour.push(mongoose.Types.ObjectId(req.body.user))
            
        //     user.save();
        //     console.log('#####')
        // })
        return res.status(201).send(booking);
        
    }catch (err) {
        return res.status(400).send(err)
    }   
}

// update info of booking
module.exports.updateBooking =  ( req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inknow :" + req.params.id);
    
    const bookingUpdate = {
        nbrPlace: req.body.nbrPlace,
    }
    bookingModel.findByIdAndUpdate (
        req.params.id ,
        {$set : bookingUpdate},
        {new : true },
        (err, data ) => {
            if (!err) res.send(data);
            else console.log("reservation error " + err);
        }
    )
   
}


// delete booking
module.exports.deleteBooking =  ( req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inknow :" + req.params.id);
    
    bookingModel.findByIdAndRemove( 
        req.params.id,
        (err,data) => {
            if(!err) res.send(data);
            else console.log("delete error : " + err);
        }
    )

}

module.exports.reserverTour= async(req,res) =>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inknow :" + req.params.id);  
    try{
        await bookingModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet : {user: req.params.id }
            },
            {new: true } ,
            (err, data) => {
                if(!err) res.send(data);
                else return res.status(400).send(err);
            }
        )
    }catch(err)
     {
        return res.status(400).send(err)
     }
    
}