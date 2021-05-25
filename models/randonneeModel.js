const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const opts = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
const randonneeSchema= new Schema(
    {
       
        startLocation: {
          description: {
            type: String
          },
          address: {
            type: String
          }
        },
        ratingsAverage: {
          type: Number,
          default: 2.5
        },
        ratingsQuantity: {
          type: Number,
          default:0
        },
        images: {
          type: [
            String
          ]
        },
        startDates: {
          type: [
            String
          ]
        },
        name: {
          type: String
        },
        duration: {
          type: Number
        },
        maxGroupSize: {
          type: Number
        },
        difficulty: {
          type: String
        },
        guides: {
          type: [
            String
          ]
        },
        price: {
          type: Number
        },
        summary: {
          type: String
        },
        description: {
          type: String
        },
        imageCover: {
          type: String
        },
        locations: {
          type: Array
        },
        
        
      },opts)

      randonneeSchema.virtual('comments', {
        ref: 'comment',
        foreignField: 'tour',
        localField: '_id',
      });

module.exports = mongoose.model('tour', randonneeSchema);