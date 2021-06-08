//Initialisation
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();


//Middelware

app.use(bodyParser.json());
app.use(cors());

//app.use(express.static("public"))

//Router initalisation
let Articles = require('./routes/api/Articles')
let UserRouter = require('./routes/api/UserRouter')
let Commande = require('./routes/api/Commande')
let Client = require('./routes/api/Client')
let Vente = require('./routes/api/Vente')

//Router
app.use('/api/Articles', Articles );
app.use('/api/Users',UserRouter);
app.use('/api/Commande',Commande);
app.use('/api/Client',Client);
app.use('/api/vente',Vente);


app.get("/",(req,res)=>{
    res.send({"app" : "Gestion de stock"})
})
//Port
let port = process.env.PORT || 5000
app.listen(port, () => console.log('server started'+ port ) );

