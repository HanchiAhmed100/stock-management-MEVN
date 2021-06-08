let express = require('express');
let mongodb = require('mongodb');
let jwtUtils = require('../../utils/jwt.utils.js');
let router = express.Router();


router.get('/', async (req,res)=>{
    let Articles = await loadUsersCollection();
    res.send(await Articles.find({}).toArray());
})

async function loadUsersCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Users');
}


module.exports = router;
