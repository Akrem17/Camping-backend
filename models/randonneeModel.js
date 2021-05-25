const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

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
          type: Number
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
        }
      })

module.exports = mongoose.model('randonnee', randonneeSchema);