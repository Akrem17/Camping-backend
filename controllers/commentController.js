const commentModel = require('../models/commentModel');
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("https://bacem.cognitiveservices.azure.com/", new AzureKeyCredential("b7cc5a9ee1634299806b1b14d03f60a0"));



// Add comment 
exports.add_comment=(req,res)=>{
    console.log(req.body);

    //getting the comment typed by the user
    const documents = [
        req.body.comment,
      ];
      
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
                tour : req.body.tourId,
                user : req.user._id,
                attitude : result.sentiment.toString(),
                
            });
            comment
                .save()
                .then(res =>{
                    console.log('created comment');
                    //res.send(result.sentiment);
                    
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