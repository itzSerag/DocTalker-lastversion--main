const mongoose = require('mongoose');

const chatcollectionSchema = new mongoose.Schema({
    ChatIds:{
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'chats'}],
        required:true,
        default: []   
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chatcollection', chatcollectionSchema);