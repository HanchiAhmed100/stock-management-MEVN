//Initialisation
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();


//Middelware

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname+"/public"))

//Router initalisation
let Articles = require('./routes/api/Articles')

//Router
app.use('/api/Articles', Articles );



//Port
let port = process.env.PORT || 5000
app.listen(port, () => console.log('server started'+ port ) );

