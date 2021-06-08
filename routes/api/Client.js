let express = require('express');
let mongodb = require('mongodb');

let router = express.Router();

router.post('/', async (req,res) => {
	let Client = await loadClientCollection();
	await Client.insertOne({
		Client : req.body.Client,
		Cin : parseInt(req.body.Cin),
        Tel : parseInt(req.body.Tel),
        Adresse : req.body.Adresse,
        CreatedAt: new Date()
	});
	res.status(201).send();
})

router.get('/', async (req,res)=>{
	let Client = await loadClientCollection()
	res.send( await Client.find({}).toArray())
})

router.put('/:id',async (req,res) =>{
	let Client = await loadClientCollection();
	await Client.updateOne({ _id :  new mongodb.ObjectID(req.params.id) },
		{$set : {
            Client : req.body.Client,
            Cin : parseInt(req.body.Cin),
            Tel : parseInt(req.body.Tel),
            Adresse : parseInt(req.body.Adresse),

		} 
	})
	res.status(200).send();
})
router.post('/:id',async (req,res) =>{
	let Client = await loadClientCollection();
	await Client.updateOne({ _id :  new mongodb.ObjectID(req.params.id) },
		{ $inc: { "Qte" : parseInt(req.body.Qte) } }
	)
	res.status(200).send();
})

router.get('/:id',async(req,res) => {
	let Client = await loadClientCollection();
	res.send( await Client.find({_id: new mongodb.ObjectID(req.params.id) }).toArray());
})



router.delete('/:id',async (req,res) => {
	let Client = await loadClientCollection();
	await Client.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();
})


async function loadClientCollection(){
	let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
	return client.db('stockmanager').collection('Clients');
}

module.exports = router;