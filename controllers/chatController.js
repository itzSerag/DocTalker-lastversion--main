const { connectDB} = require('../config/database');
const userModel = require('../models/user');
const chatCollectionModel = require('../models/chatcollection');
const chatModel = require('../models/Chat');
const Doc = require('../models/document');
let idname = [];
exports.getAllChats = async (req, res) => {
    try {
        const {id} = req.user.id;//User ID
        const user = await userModel.findById(id);
        if(!user){
            return res.status(400).json
        }
        const collectionIds = user.collectionChatIds;//Id of chat collection
        const chat = await chatCollectionModel.findById(collectionIds);
        if(!chat){
            return res.status(400).json
        }
        const chats = chat.ChatIds;
        for(let i = 0;i<chats.length;i++)
        {
            const x = await chatModel.findById(chats[i]);
            idname.push({chatId: chats[i],chatName: x.chatName})
        }

        res.json(idname);
        
    } catch (error) {
        res.json({ error: error.message });
    }
    
};


exports.getChat = async (req, res) => {
    try {
        const {id} = req.params;//Chat ID
        const chat = await chatModel.findById(id);
        if(!chat){
            return res.status(400).json({message:"chat not found"});
        }
      const name = chat.chatName;
      const document = await Doc.findById(chat.documentId)
      const documentUrl = document.FileUrl;
      const messages = chat.messages.map(chat=>{return {role:chat.role,content:chat.content }});
      res.json({chatName: name,Url: documentUrl ,messages: messages});
    //    res.json({url:document.FileUrl});
    } catch (error) {
        res.json({ error: error.message})
    }

};

exports.deleteChat = async (req, res) => {
    try {
   
        const {id} = req.params;
        // if(id!==req.chatModel.id){
        //     return res.status(400).json({message:"unauthorized"});
        // }
        const chat = await chatModel.findById({_id:id})
        if(!chat){
            return res.status(400).json({message:"chat not found"});
        }
            await chatModel.deleteOne({_id:id})
            res.send({message:"Chat Deleted Successfully"});
          
          
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
};

exports.updateChat = async (req, res) => {
   
   try {
       const {id} = req.params;
       const {chatName} = req.body;
       const updated = await chatModel.findByIdAndUpdate({_id:id}, {$set:{chatName:chatName}},{new:true})
    return res.json({message: "Chat Name Updated Successfully"});
   } catch (error) {
    return res.status(500).json({error:error.message})
   }
};