const express = require('express');
const router = express.Router();
const {getAllChats,getChat, deleteChat, updateChat} = require('../controllers/chatController');
const { auth } = require('../middlewares/auth');

router.get("/:id", getChat);
router.get("/",getAllChats);
router.delete("/:id",deleteChat);
router.put("/:id",updateChat);



module.exports = router;    