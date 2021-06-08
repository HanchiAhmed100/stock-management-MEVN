let express = require('express');
let mongodb = require('mongodb');

let router = express.Router();


router.get('/', async (req,res)=>{
    let Articles = await loadArticlesCollection();
    res.send(await Articles.find({}).toArray());
})
router.get('/sortedAsc', async (req,res)=>{
    let Articles = await loadArticlesCollection();
    res.send(await Articles.find().sort({CreatedAt: 1}).toArray());
})
router.get('/sortedDesc', async (req,res)=>{
    let Articles = await loadArticlesCollection();
    res.send(await Articles.find().sort({CreatedAt: -1}).toArray());
})


router.post('/', async (req,res) => {
	let Articles = await loadArticlesCollection();
	await Articles.insertOne({
		Name : req.body.Name,
		Desc : req.body.Desc,
		Qte : parseInt(req.body.Qte),
		CreatedAt: new Date()
	});
	res.status(201).send();
})

router.put('/:id',async (req,res) =>{
	let Articles = await loadArticlesCollection();
	await Articles.updateOne({ _id :  new mongodb.ObjectID(req.params.id) },
		{$set : {
			Name : req.body.Name,
			Desc : req.body.Desc,
			Qte : parseInt(req.body.Qte) 
		} 
	})
	res.status(200).send();
})
router.post('/:id',async (req,res) =>{
	let Articles = await loadArticlesCollection();
	await Articles.updateOne({ _id :  new mongodb.ObjectID(req.params.id) },
		{ $inc: { "Qte" : parseInt(req.body.Qte) } }
	)
	res.status(200).send();
})

router.get('/:id',async(req,res) => {
	let Articles = await loadArticlesCollection();
	res.send( await Articles.find({_id: new mongodb.ObjectID(req.params.id) }).toArray());
})



router.delete('/:id',async (req,res) => {
	let Articles = await loadArticlesCollection();
	await Articles.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();
})


async function loadArticlesCollection(){
	let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
	return client.db('stockmanager').collection('Articles');
}

module.exports = router;