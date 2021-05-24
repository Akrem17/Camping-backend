const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 text: {
      type: String,
      trim: true,
      required: true
   },
date: {
      type: Date,
      default: Date.now
   },
// each comment can only relates to one randonnee, so it's not in array
tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tour'
   },
   attitude : {
    type: String,
    
}
})
 

module.exports = mongoose.model('comment', commentSchema);