let express = require('express');
const createError = require('http-errors');
path = require('path');
mongoose = require('mongoose');
mongoose.set('strictQuery', false);
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./db/database');

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true
}).then(()=>{
    console.log('Database Connected')
},
error => {
    console.log('Database could not be connected : ' + error)
}
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// we will call routes we created here
const userRoute = require('./routes/student.routes');
app.use('/endpoint', userRoute);

const port = process.env.PORT || 8080;
const server = app.listen(port, ()=> {
    console.log('Port Connected to: ' + port)
});

app.use((req,res,next) => {
    next(createError(404));
});

// Default Route
app.get('/', (req,res) =>{
    res.send('Invalid Endpoint')

})

app.use(function (err, req, res, next){
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})






















