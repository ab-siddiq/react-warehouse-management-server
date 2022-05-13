const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogcfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db('productStock').collection('stocks');
        app.post('/stock',async(req,res)=>{
            const newStock = req.body;
           const result = await userCollection.insertOne(newStock);
            res.send(result)
        })
    }finally{

    }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log('listening to port=>',port);
})
//scyJADhzw5Lkw2Db
//express
app.get('/',(req,res)=>{
    res.send('server');
})

app.get('/user',(req,res)=>{
    res.send('user')
})


