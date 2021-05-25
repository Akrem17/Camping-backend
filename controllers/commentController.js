const commentModel = require('../models/commentModel');
const randonneeModel = require('../models/randonneeModel');
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("https://bacem.cognitiveservices.azure.com/", new AzureKeyCredential("b7cc5a9ee1634299806b1b14d03f60a0"));
var randonneeC= require('../controllers/randonneeController');
const http = require("http");


// Add comment 
exports.add_comment=(req,res)=>{
    console.log(req.body);

    //getting the comment typed by the user
    const documents = [
        req.body.comment,
      ];
    var rating=0;
      
      //Calling the anlyzeSentiment method of our TextAnalyticsClient
      const results = client.analyzeSentiment(documents).then(
          results=>{

      for (const result of results) {
        if (result.error === undefined) {
          
            //console logging the comment and all its analysis results
            console.log(" le traitement sentiment analysis de Commentaire :" , documents )
            console.log("Overall sentiment:", result.sentiment);
            console.log("Scores:", result.confidenceScores);
                
            // Comment creation
            const comment = new commentModel({
                text : req.body.comment,
                date : req.body.date,
                randonnee : req.params.idrandonnee,
                attitude : result.sentiment.toString(),
                
            });
            comment
                .save()
                .then(res =>{
                    console.log('created comment');
                    //res.send(result.sentiment);
                    var condition_comment = {randonnee:req.params.idrandonnee,attitude:"positive"};
                    commentModel
                        .find(condition_comment)
                        .countDocuments(condition_comment)
                        .then(comm =>{
                         console.log(comm);
                           rating=commentModel.countDocuments({randonnee:req.params.idrandonnee}, function(err, total_comments) {
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log("nb total:",total_comments);
                                  var ratingAVG=(comm * 100)/total_comments;
                                        switch (true) {
                                            case (ratingAVG===100) :
                                            rating = 5;
                                            break;
                                            case (ratingAVG<100 && ratingAVG>75) :
                                            rating = 4;
                                            break;
                                            case (ratingAVG<=75 && ratingAVG>50) :
                                            rating = 3;
                                            break;
                                            case (ratingAVG<=50 && ratingAVG>25) :
                                            rating = 2;
                                            break;
                                            case (ratingAVG<=25 && ratingAVG>0) :
                                            rating = 1;
                                            break;
                                            case (ratingAVG===0) :
                                            rating = 0;
                                            break;
                                            
                                        }
                                        var condition_rand = {_id:req.params.idrandonnee};
                                        randonneeModel
                                            .updateOne(condition_rand,{ratingsAverage:rating})
                                            .then(result =>{
                                                console.log("mise a jour de rating avec succes");
                                                
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                            });
                                }
                              });

                        })
                        .catch(err =>{
                            console.log(err);
                        });
                })
                .catch(err =>{
                    console.log(err);
                });

           

        res.json({ 
            overall : result.sentiment,
            Score: result.confidenceScores,
        });

        } else {
            console.error("Encountered an error:", result.error);
        }
      }});
    
 


        
};

// fetch comments by-ID-randonnee
exports.get_Allcomments=(req,res,next)=>{
    var condition = {randonnee:req.params.idrandonnee};

    commentModel
        .find(condition)
        .then(result =>{
            console.log(result);
            res.json(result);
        })
        .catch(err =>{
            console.log(err);
        });
}

//Delete comment
exports.delete_comment=(req,res,next)=>{
   
    commentModel
        .findOneAndDelete({_id :req.params.idrandonnee})
        .exec()
        .then(result =>{
            res.send("commentaire supprimé avec succes");
        })
        .catch(err =>{
            console.log(err);
        });
 }
 //Update comment
exports.update_comment=(req,res,next)=>{
    var condition = {_id:req.params.idrandonnee};
   commentModel
       .updateOne(condition,req.body)
       .then(result =>{
           console.log("commentaire mise a jour avec succes");
           res.send(result);
       })
       .catch(err =>{
           console.log(err);
       });
}