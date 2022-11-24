require('./models/User');
require('./models/Track');

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes');
const trackRoutes=require('./routes/trackRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:admin@tracker001.cwd2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) =>{
    console.error('Error connecting to mongo',err)
})

//any time a get request made we run this function
app.get('/', requireAuth,(req,res) => {
    

    res.send('Your email:'+ req.user.email);
    
});

app.listen(3000, () =>{
    console.log('Listening on port 3000')
});
