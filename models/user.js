const mongoose = require('mongoose');
const { isEmail } = require('validator');



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'Minimum name length is 3 characters']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Minimum name length is 3 characters']
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
    },
    // googleId: {
    //     type: String,
    //     unique: true,  // idk if this is needed -- google already gives unique IDs
    //     default: null
    // },
    subscription: {
        type: String,
        enum: ['free', 'gold', 'premium'],
        default: 'free',
    },
    // stripeCustomerId: {
    //     type: String,
    //     unique: true,
    // },
    isVerified: {
        type : Boolean,
        default : false 
    },
    
    collectionChatIds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatcollection'
    }
    },
 {
    timestamps: true
 }
);



module.exports = mongoose.model('User', userSchema);



