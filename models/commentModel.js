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
randonnee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'randonnee'
   },
   attitude : {
    type: String,
    
}
})
 

module.exports = mongoose.model('Comment', commentSchema);