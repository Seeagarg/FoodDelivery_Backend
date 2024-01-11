const express = require('express');
const ConnectToMongoose = require('./db');
const app = express();
const dotenv = require('dotenv');

const Route = require('./Routes/CreateUser')
const cors= require('cors');
const mongoDB = require('./db');
const DisplayData = require('./Routes/Display_data')
const order_Data = require('./Routes/OrderData')
dotenv.config();
ConnectToMongoose();


app.get('/',(req,res)=>{
    res.send("Hello World");
    return;
})




// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-requested-With,Content-Type,Accept"
//     );
//     next();
// })

app.use(cors());

app.use(express.json());
app.use('/api',Route);
app.use('/api',DisplayData);
app.use('/api',order_Data);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Our App listening on port ${PORT}`);
})

