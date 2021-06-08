let express = require('express');
let mongodb = require('mongodb');

let router = express.Router();

router.post('/', async (req,res) => {
    let Contrat = await loadContratCollection();

	await Contrat.insertOne({
		Client : req.body.Client,
        Cin : parseInt(req.body.Cin),
        Article : req.body.Article,
        Qte : parseInt(req.body.Qte),
        Paiement : req.body.Paiement,
        Type : req.body.Type,
        Taux : req.body.Taux,
        Prix : parseInt(req.body.Prix),
        CreatedAt: new Date()
    });
    let Article = await loadArticlesCollection();
    await Article.updateOne({ Name: req.body.Article },
        { $inc: { "Qte" : -parseInt(req.body.Qte) } }
    )
	res.status(201).send();
})

router.get('/',async(req,res)=>{
	let Contrat = await loadContratCollection()
	res.send( await Contrat.find().sort({CreatedAt: -1}).toArray());
	
})


router.get('/:id',async(req,res) => {
	let Client = await loadContratCollection();
	res.send( await Client.find({_id: new mongodb.ObjectID(req.params.id) }).toArray());
})

router.get('/client/:Client',async(req,res) => {
	let Contrat = await loadContratCollection();
	res.send( await Contrat.find({ Client : req.params.Client }).sort({ CreatedAt : -1}).toArray());
})


router.delete('/:id',async (req,res) => {
	let Client = await loadClientCollection();
	await Client.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();
})


async function loadContratCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Contrats');
}

async function loadArticlesCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Articles');
}
module.exports = router;