let express = require('express');
let mongodb = require('mongodb');

let router = express.Router();

router.post('/Fournisseurs',async(req,res) => {

    
    let Articles = await loadArticlesCollection();
    let Commande = await loadCommandeCollection();
    await Commande.insertOne({
        Fournisseur : req.body.Fournisseur,
        Article : req.body.Article,
        Prix : parseInt(req.body.prixUnit),
        Desc : req.body.Desc,
        PrixTot : parseInt(req.body.PrixTot),
        Qte : parseInt(req.body.Qte),
        CreatedAt: new Date()
    });
    if( await Articles.findOne({ Name : req.body.Article }) ){
        
        await Articles.updateOne({ Name :  req.body.Article },
        { $inc: { "Qte" : parseInt(req.body.Qte) } })
        await Articles.updateOne({ Name :   req.body.Article },
		{ $set : { Prix : req.body.prixUnit} })
    
    }else{
        await Articles.insertOne({
            Name : req.body.Article,
            Desc : req.body.Desc,
            Qte : parseInt(req.body.Qte),
            Prix : parseInt(req.body.prixUnit),
            CreatedAt: new Date()
        });

    }
	res.status(201).send();
})

router.get("/", async(req,res) =>{
    let Commande = await loadCommandeCollection();
    res.send(await Commande.find().sort({CreatedAt: -1}).toArray());
})
router.get('/:id',async(req,res) => {
	let Articles = await loadArticlesCollection();
	res.send( await Articles.find({_id: new mongodb.ObjectID(req.params.id) }).toArray());
})

router.delete('/:id',async(req,res) => {
    let Commande = await loadCommandeCollection();
    let cmd = await Commande.findOne({_id: new mongodb.ObjectID(req.params.id)});
    let Articles = await loadArticlesCollection();
    await Articles.updateOne({ Name: cmd.Article },
        { $inc: { "Qte" : -parseInt(cmd.Qte) } }
    )
    await Commande.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();    

})


// router.get('/:type/:search',async(req,res) => {
//     let type = req.params.type
//     let search = req.params.search
// 	let Commande = await loadCommandeCollection();
// 	res.send( await Commande.find({ [type] : search }).toArray());
// })


async function loadArticlesCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Articles');
}
async function loadCommandeCollection(){
    let client = await mongodb.MongoClient.connect('mongodb+srv://ahmed:hanchi@cluster0.vpi9m.mongodb.net/stockmanager?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('stockmanager').collection('Commande');
}


module.exports = router;