const mongoose = require('mongoose');
const {isEmail} = require('validator');
var bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim:true,
            unique:true
        },
        password: {
            type: String,
            required: true,
            minlength:6         
        },
        picture: {
            type: String,
            default: "default.jpg"
          },
        role: {
            type: String,
            enum: ['user', 'guide', 'organisateur', 'admin'],
            default: 'user',
          },
          searchList: {
            type:[ String],
                 
        },
       
    }
)
// fucntion crypt password before save into display
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// // decrypt & comparaison
// userSchema.statics.login = async function (email , password){
//     const user = await this.findOne({ email });
//     if (user) {
//         const auth = await bcrypt.compare(user.password,password);
//         console.log("auth", auth);
//         if(auth){
//             return user;
//         }
//         throw Error ('incorrect password');
//     }
//     throw Error('incorrect email');
// }






module.exports = mongoose.model('user', userSchema);