let express = require('express');
let mongodb = require('mongodb');
let bcrypt = require('bcrypt');
let jwtUtils = require('../../utils/jwt.utils.js');
let router = express.Router();

router.post('/register', async (req,res)=>{
   
    console.log(req)
    let Email = req.body.Mail;
    let Name = req.body.FullName;
    let Password = req.body.Password;
    let IsAdmin = req.body.IsAdmin
    let Users = await  loadUsersCollection();

    if( Email == null || Name == null || Password == null){
        return res.send({
            'error':'missing parameters'
        })
    }

    if( await Users.findOne({ Email : Email }) ){
        return res.send({
            'error':'user already exist'
        })
    }

    bcrypt.hash(Password , 5 , (err, bcryptPassword)=>{
        Users.insertOne({
            Name : Name,
            Email : Email,
            Password: bcryptPassword,
            IsAdmin : IsAdmin
        })
    })
    res.status(201).send("User Created");
})

router.post('/login', async (req,res)=>{
    
    let Email = req.body.Mail;
    let Password = req.body.Password;
    let Users = await  loadUsersCollection();

    if( Email == null  || Password == null){
        return res.status(400).send('Les champs sont obligatoire');
    }
    if(await Users.findOne({ Email : Email })){
        user = await Users.findOne({ Email : Email })
        bcrypt.compare(Password ,user.Password,function(errBycript,resBycrpt){
            if(resBycrpt){
                res.status(201).send({
                    'UserId': user._id,
                    'IsAdmin': user.IsAdmin,
                    'token': jwtUtils.generateTokenForUser(user)
                })
            } else {
                res.status(400).send('Mot de passe inccorecte' )
            }
        })
    }else{
        res.status(400).send(
            'l\'adresse mail n\'existe pas '
        )
    }

})

router.get('/', async (req,res)=>{
    let Articles = await loadUsersCollection();
    res.send(await Articles.find({}).toArray());
})

async function loadUsersCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Users');
}


module.exports = router;